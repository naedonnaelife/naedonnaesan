import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';

// Importing json files, make sure these paths are correct
import dong from '../../datas/dong.json';
import gu from '../../datas/gu.json';

const Map = styled.div`
  ${tw`h-[1200px] w-[1200px]`}
`;

const { kakao } = window;

// type polygon = {
//     customOverlay : any,
//     infoWindow : any,
//     map : any
// }

const KakaoMap: React.FC = () => {
  useEffect(() => {
    let customOverlay: any, infoWindow: any;
    let map: any;

    const jsonProcessing = async (json: any) => {
      try {
        console.log('테스트용 : ', json);
        const newJson = json.features.map((unit: any) => {
          const name = unit.properties.SIG_KOR_NM ? unit.properties.SIG_KOR_NM : unit.properties.temp;
          const coordinates = unit.geometry.coordinates[0].map(
            (coordinate: any) => new kakao.maps.LatLng(coordinate[1], coordinate[0])
          );
          return { name, coordinates };
        });
        createPolygon(map, newJson, customOverlay, infoWindow);
      } catch (error) {
        console.error('json 가공 오류 : ', error);
      }
    };

    const createPolygon = (map: any, newJson: any, customOverlay: any, infoWindow: any) => {
      newJson.forEach((unit: any) => {
        const polygon = new kakao.maps.Polygon({
          map: map,
          path: unit.coordinates,
          strokeWeight: 2,
          strokeColor: '#004c80',
          strokeOpacity: 0.8,
          fillColor: '#fff',
          fillOpacity: 0.7,
        });
        kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent: any) {
          polygon.setOptions({ fillColor: '#09f' });
          customOverlay.setContent('<div class="area">' + unit.name + '</div>');
          customOverlay.setPosition(mouseEvent.latLng);
          customOverlay.setMap(map);
        });

        kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent: any) {
          customOverlay.setPosition(mouseEvent.latLng);
        });

        kakao.maps.event.addListener(polygon, 'mouseout', function () {
          polygon.setOptions({ fillColor: '#fff' });
          customOverlay.setMap(null);
        });

        kakao.maps.event.addListener(polygon, 'click', function (mouseEvent: any) {
          const content =
            '<div class="info">' +
            '   <div class="title">' +
            unit.name +
            '</div>' +
            '   <div class="size">총 면적 : 약 ' +
            Math.floor(polygon.getArea()) +
            ' m<sup>2</sup></div>' +
            '</div>';
          console.log('area : ', unit);

          infoWindow.setContent(content);
          infoWindow.setPosition(mouseEvent.latLng);
          infoWindow.setMap(map);
        });
      });
    };

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5, 127.0), //지도의 중심좌표.
      level: 9,
    };

    map = new kakao.maps.Map(container, options);
    customOverlay = new kakao.maps.CustomOverlay({});
    infoWindow = new kakao.maps.InfoWindow({ removable: true });

    jsonProcessing(gu);
  }, []);

  return (
    <>
      <Map id="map"></Map>
    </>
  );
};

export default KakaoMap;
