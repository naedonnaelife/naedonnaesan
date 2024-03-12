import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import newDong from '../../datas/newDong.json';

const Map = styled.div`
  ${tw`w-[75%] h-[100%] border-2 border-black`}
`;

const { kakao } = window;

// 연결 후 props로  temp (구/동이름) 넘어옴 !
const temp = '강남구 역삼2동';
const selectedDong: any = newDong.features.find((dong: any) => dong.properties.temp === temp);
console.log(selectedDong);
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

    // 매물 마커 띄우기
    const positions = [
      {
        title: '임시 마커',
        latlng: new kakao.maps.LatLng(y, x),
      },
    ];
    const imageSrc = 'https://cdn-icons-png.flaticon.com/512/3771/3771140.png';
    const imageSize = new kakao.maps.Size(20, 20);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    for (let position of positions) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: position.latlng,
        title: position.title,
        image: markerImage,
      });
    }
  }, []);

  return <Map id="map"></Map>;
};

export default KakaoMap;
