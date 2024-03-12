import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import newDong from '../../datas/newDong.json';
import test from '../../datas/test.json';

const Map = styled.div`
  ${tw`w-[75%] h-[100%] border-2 border-black`}
`;

const { kakao } = window;

const temp = '강남구 역삼2동';
const selectedDong: any = newDong.features.find((dong: any) => dong.properties.temp === temp);
const x = selectedDong.properties.x;
const y = selectedDong.properties.y;
const KakaoMap: React.FC = () => {
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
    const imageSrc =
      'https://e7.pngegg.com/pngimages/557/689/png-clipart-computer-icons-house-icon-design-house-blue-angle.png';
    const imageSize = new kakao.maps.Size(25, 25);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 2, // 클러스터 할 최소 지도 레벨
      calculator: [10, 30, 50], // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
      texts: ['10+', '30+', '50+'],
      styles: [
        {
          // calculator 각 사이 값 마다 적용될 스타일을 지정한다
          width: '40px',
          height: '40px',
          background: `url("${imageSrc}") round`,
          color: '#000', // 글자색
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '41px',
        },
        {
          width: '50px',
          height: '50px',
          background: `url("${imageSrc}") round`,
          color: '#000',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '51px',
        },
        {
          width: '60px',
          height: '60px',
          background: `url("${imageSrc}") round`,
          color: '#000',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '61px',
        },
      ],
    });

    // 데이터에서 좌표 값을 가지고 마커를 표시합니다
    // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
    const markers = test.positions.map((position: { lat: number; lng: number }) => {
      return new kakao.maps.Marker({
        position: new kakao.maps.LatLng(position.lat, position.lng),
        image: markerImage,
      });
    });
    console.log(markers);
    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);
    console.log(clusterer.getStyles());
  }, []);

  return <Map id="map"></Map>;
};

export default KakaoMap;
