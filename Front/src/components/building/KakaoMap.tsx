import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import SearchBar from '../../utils/SearchBar.tsx';
import UseAxios from '../../utils/UseAxios.tsx';
import newDong from '../../datas/dong.json';
import redhouse from '../../assets/redhouse.png';
import bluehouse from '../../assets/bluehouse.png';
import './content.css';

interface KakaoMapProps {
  selectedBuildingRef: React.MutableRefObject<any>;
  setBuildingId: React.Dispatch<React.SetStateAction<number>>;
  buildingMap: any;
  setBuildingMap: React.Dispatch<React.SetStateAction<any>>;
  markerList: React.MutableRefObject<any>;
  searchDong: string;
  setSearchDong: React.Dispatch<React.SetStateAction<string>>;
  buildingClusterer: any;
  setBuildingClusterer: React.Dispatch<React.SetStateAction<any>>;
}

type Building = {
  x: number;
  y: number;
  buildingId: number;
};

const MapWrapper = styled.div`
  ${tw`w-[75%] h-[100%]
  max-sm:w-[100%]`}
`;
const Map = styled.div`
  ${tw`w-[100] h-[100%] relative z-1`}
`;

const SearchWarpper = styled.div`
  ${tw`hidden w-[100%] h-12 absolute top-4 px-4 z-10
  max-sm:block`}
`;

const { kakao } = window;

const imageSize = new kakao.maps.Size(25, 25);
const markerImage = new kakao.maps.MarkerImage(redhouse, imageSize);
const selectedImageSize = new kakao.maps.Size(52, 52);
const selectedMarkerImage = new kakao.maps.MarkerImage(bluehouse, selectedImageSize, {
  offset: new kakao.maps.Point(26, 26),
});

function KakaoMap({
  selectedBuildingRef,
  setBuildingId,
  buildingMap,
  setBuildingMap,
  markerList,
  searchDong,
  setSearchDong,
  buildingClusterer,
  setBuildingClusterer,
}: KakaoMapProps) {
  const axios = UseAxios();
  const selectedDong: any = (newDong as any).features.find((dong: any) => dong.properties.EMD_KOR_NM === searchDong);
  const x = selectedDong.properties.x;
  const y = selectedDong.properties.y;

  const customOverlay = new kakao.maps.CustomOverlay({
    clickable: true,
    xAnchor: 0.5,
    yAnchor: 1,
    zIndex: 3,
  });

  const clustererStyle = (size: number) => {
    return {
      width: size + 'px',
      height: size + 'px',
      lineHeight: size + 1 + 'px',
    };
  };

  const clickOverlay = (buildingId: number, overlay: any, position: any, map: any) => {
    overlay.setMap(null);
    if (selectedBuildingRef.current !== null) {
      selectedBuildingRef.current.setMap(null);
    }
    setBuildingId(buildingId);

    const selectedMarker = new kakao.maps.Marker({
      map: map,
      position: position,
      image: selectedMarkerImage,
      zIndex: 2,
    });

    selectedBuildingRef.current = selectedMarker;
    selectedMarker.setMap(map);
    map.setZoomable(true);
  };

  // 폴리곤 생성
  // const makePolygon = (map: any) => {
  //   const polygonPath = selectedDong.geometry.coordinates[0].map((coordinate: any) => {
  //     return new kakao.maps.LatLng(coordinate[1], coordinate[0]);
  //   });

  //   const polygon = new kakao.maps.Polygon({
  //     path: polygonPath,
  //     strokeWeight: 4,
  //     strokeColor: '#000000',
  //     strokeOpacity: 0.7,
  //     fillColor: '#ffffff',
  //     fillOpacity: 0.3,
  //   });
  //   polygon.setMap(map);
  // };

  const makeClusterer = (map: any, clusterer: any) => {
    // 클러스터러 , 마커 생성

    // 데이터에서 좌표 값을 가지고 마커 표시
    // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않음
    axios
      .get('/api/buildings', { params: { dongname: searchDong } })
      .then((response) => {
        const markermarker: any = {};
        const markers = response.data.object.map((building: Building) => {
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(building.y, building.x),
            image: markerImage,
            title: building.buildingId,
          });
          kakao.maps.event.addListener(marker, 'click', function () {
            if (selectedBuildingRef.current !== null) {
              selectedBuildingRef.current.setMap(null);
            }
            setBuildingId(marker.getTitle());

            const selectedMarker = new kakao.maps.Marker({
              map: map,
              position: marker.getPosition(),
              image: selectedMarkerImage,
              zIndex: 2,
            });

            selectedBuildingRef.current = selectedMarker;
            selectedMarker.setMap(map);
          });
          markermarker[building.buildingId] = marker;
          return marker;
        });
        clusterer.addMarkers(markers);
        markerList.current = markermarker;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // 카카오톡 지도 생성
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(y, x),
      level: 5,
      draggable: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
    };
    const map = new kakao.maps.Map(container, options);
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: false, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      disableClickZoom: true,
      minLevel: 1, // 클러스터 할 최소 지도 레벨
      gridSize: 100,
      calculator: [3, 5, 10, 30, 50, 100, 500, 1000], // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
      texts: ['2', '3+', '5+', '10+', '50+', '100+', '500+', '1000+'],
      styles: [
        {
          // calculator 각 사이 값 마다 적용될 스타일을 지정한다
          width: '27px',
          height: '27px',
          background: `url("/redhouse.png") round`,
          color: '#fff', // 글자색
          // opacity: '0.7',
          border: 'black',
          // borderRadius: '100px',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '28px',
          paddingTop: '5px',
        },
        ...[30, 32, 35, 40, 45, 50, 55, 60].map((size) => clustererStyle(size)),
      ],
    });

    // 클러스터러 클릭 이벤트 (줌 / 커스텀 오버레이 생성)
    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster: any) {
      const level = map.getLevel();
      if (level >= 2) {
        const newLevel = level - 2;
        map.setCenter(cluster.getCenter());
        map.setLevel(newLevel ? newLevel : 1, { animate: true });
      } else {
        // 커스텀 오버레이 생성하는 경우
        customOverlay.setMap(null);
        map.setZoomable(false);
        const clusterMarkers = cluster.getMarkers();
        const buildingIdList = clusterMarkers.map((marker: any) => Number(marker.getTitle()));
        // cluster 에 포함된 buliding 리스트 상세 정보
        axios
          .post('/api/buildings/detail', {
            buildingIdList: buildingIdList,
          })
          .then((response) => {
            let content = '<div class="contentStyle"><ul class="container">';
            response.data.object.forEach((building: any) => {
              content += `<li class="item" id=${building.buildingId}> <p>[${building.buildingType}]</p><p>${building.name}</p><p> ${building.payType}${building.deposit} / ${building.monthlyPay} </p></li>`;
            });
            content += '</ul><div class="close" id="close-button">닫기</div></div>';

            customOverlay.setPosition(cluster.getCenter());
            customOverlay.setContent(content);
            customOverlay.setMap(map);
            map.panTo(cluster.getCenter());

            // 오버레이 닫기 이벤트
            // 커스텀 오버레이 닫기
            const closeOverlay = () => {
              map.setZoomable(true);
              customOverlay.setMap(null);
            };

            // document.getElementById('map')?.addEventListener('click', closeOverlay);

            // 오버레이 클릭 / 닫기 이벤트 달기
            document.getElementById('close-button')?.addEventListener('click', closeOverlay);
            response.data.object.forEach((building: any) => {
              document
                .getElementById(`${building.buildingId}`)
                ?.addEventListener('click', () =>
                  clickOverlay(building.buildingId, customOverlay, cluster.getCenter(), map)
                );
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    setBuildingMap(map);
    setBuildingClusterer(clusterer);
    // makePolygon(map);
    makeClusterer(map, clusterer);

    // 커스텀 오버레이 클릭 시 발생 이벤트
  }, []);

  useEffect(() => {
    if (buildingMap) {
      buildingClusterer.clear();
      makeClusterer(buildingMap, buildingClusterer);
      const selectedDong: any = (newDong as any).features.find(
        (dong: any) => dong.properties.EMD_KOR_NM === searchDong
      );
      const x = selectedDong.properties.x;
      const y = selectedDong.properties.y;

      buildingMap.setCenter(new kakao.maps.LatLng(y, x));
      selectedBuildingRef.current?.setMap(null);
      selectedBuildingRef.current = null;
      setBuildingId(0);
    }
  }, [searchDong]);

  return (
    <MapWrapper>
      <Map id="map">
        <SearchWarpper>
          <SearchBar searchDong={searchDong} setSearchDong={setSearchDong} />
        </SearchWarpper>
      </Map>
    </MapWrapper>
  );
}

export default KakaoMap;
