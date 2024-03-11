import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import newDong from '../../datas/newDong.json';

const Map = styled.div`
  ${tw`w-[75%] h-[100%] border-2 border-black`}
`;

const { kakao } = window;

// 연결 후 props로  temp, x, y 좌표 넘어옴 !
const temp = '종로구 사직동';
const x = 126.9701436944;
const y = 37.574108046;

const KakaoMap: React.FC = () => {
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
    const selectedDong: any = newDong.features.find((dong: any) => dong.properties.temp === temp);

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
  }, []);

  return <Map id="map"></Map>;
};

export default KakaoMap;
