import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';

const Map = styled.div`
  ${tw`h-[100%] w-[75%] border-4 border-black my-2`}
`;

const { kakao } = window;


const KakaoMap: React.FC = () => {
  useEffect(()=> {


  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(37.56, 127.0),
    level: 3,
    draggable : false,
    scrollwheel : false,
    disableDoubleClickZoom  : false,

  };
  const map = new kakao.maps.Map(container, options);

  }, []);

  return (
    <>
      <Map id="map"></Map>
    </>
  );
};

export default KakaoMap;
