import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import newDong from '../../datas/newDong.json';
import UseAxios from '../../utils/UseAxios.tsx';

interface KakaoMapProps {
  areaName: string;
  selectedBuildingRef: React.MutableRefObject<any>;
  setBuildingId: React.Dispatch<React.SetStateAction<number>>;
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
  ${tw`w-[100] h-[100%]`}
`;

const { kakao } = window;

function KakaoMap({ areaName, selectedBuildingRef, setBuildingId }: KakaoMapProps) {
  const axios = UseAxios();
  const selectedDong: any = newDong.features.find((dong: any) => dong.properties.temp === areaName);
  const x = selectedDong.properties.x;
  const y = selectedDong.properties.y;

  // 카카오톡 지도 생성
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(y, x),
      level: 4,
      draggable: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
    };
    const map = new kakao.maps.Map(container, options);

    // 폴리곤 생성
    const polygonPath = selectedDong.geometry.coordinates[0].map((coordinate: any) => {
      return new kakao.maps.LatLng(coordinate[1], coordinate[0]);
    });

    const polygon = new kakao.maps.Polygon({
      path: polygonPath,
      strokeWeight: 4,
      strokeColor: '#000000',
      strokeOpacity: 0.7,
      fillColor: '#ffffff',
      fillOpacity: 0.3,
    });
    polygon.setMap(map);

    // 클러스터러 , 마커
    const imageSrc = 'https://github.com/jjm6604/react-test/blob/main/Group%2021%20(1).png?raw=true';
    const selectedImageSrc = 'https://github.com/jjm6604/react-test/blob/main/bluehouse.png?raw=true';
    const imageSize = new kakao.maps.Size(25, 25);
    const selectedImageSize = new kakao.maps.Size(30, 30);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const selectedMarkerImage = new kakao.maps.MarkerImage(selectedImageSrc, selectedImageSize);

    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 1, // 클러스터 할 최소 지도 레벨
      calculator: [3, 5, 10, 30, 50, 100, 500, 1000], // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
      texts: ['2', '3+', '5+', '10+', '30+', '50+', '100+', '500+', '1000+'],
      styles: [
        {
          // calculator 각 사이 값 마다 적용될 스타일을 지정한다
          width: '30px',
          height: '30px',
          background: `url("${imageSrc}") round`,
          color: '#fff', // 글자색
          // opacity: '0.7',
          border: 'black',
          // borderRadius: '100px',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '31px',
          paddingTop: '8px',
        },
        {
          width: '35px',
          height: '35px',
          lineHeight: '36px',
        },
        {
          width: '40px',
          height: '40px',
          lineHeight: '41px',
        },
        {
          width: '45px',
          height: '45px',
          lineHeight: '46px',
        },
        {
          width: '50px',
          height: '50px',
          lineHeight: '51px',
        },
        {
          width: '55px',
          height: '55px',
          lineHeight: '56px',
        },
        {
          width: '60px',
          height: '60px',
          lineHeight: '61px',
        },
        {
          width: '65px',
          height: '65px',
          lineHeight: '66px',
        },
        {
          width: '70px',
          height: '70px',
          lineHeight: '71px',
        },
        {
          width: '70px',
          height: '70px',
          lineHeight: '71px',
        },
        {
          width: '70px',
          height: '70px',
          lineHeight: '71px',
        },
      ],
    });

    // 데이터에서 좌표 값을 가지고 마커를 표시합니다
    // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
    axios
      .get('/api/buildings', { params: { dongname: '역삼동' } })
      .then((response) => {
        console.log(response.data);
        const markers = response.data.object.map((building: Building) => {
          return new kakao.maps.Marker({
            position: new kakao.maps.LatLng(building.x, building.y),
            image: markerImage,
            title: building.buildingId,
          });
        });
        clusterer.addMarkers(markers);
        // console.log(markers);
        return markers;
      })
      .then((response) => {
        console.log(response);
        response.map((marker: any) => {
          kakao.maps.event.addListener(marker, 'click', function () {
            console.log(selectedBuildingRef.current);
            if (selectedBuildingRef.current !== null) {
              selectedBuildingRef.current.setImage(markerImage);
            }
            setBuildingId(marker.getTitle());
            selectedBuildingRef.current = marker;
            marker.setImage(selectedMarkerImage);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MapWrapper>
      <Map id="map" />
    </MapWrapper>
  );
}

export default KakaoMap;
