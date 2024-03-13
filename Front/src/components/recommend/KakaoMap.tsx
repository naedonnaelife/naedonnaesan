import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import useSearchStore from '../../stores/SearchStore';
import newDong from '../../datas/newDong.json';
import newGu from '../../datas/newGu.json'

const Map = styled.div`
  ${tw`h-[100%] w-[75%] border-4 border-black p-2 mx-2 `}
`;

const { kakao } = window;

const KakaoMap: React.FC = () => {
  const [newMap, setNewMap] = useState(null)
  const [newCustomOverlay, setNewCustomOverlay] = useState(null)
  const navigate = useNavigate()
  const areaName = useSearchStore((state:any) => state.areaName)

  // 구&동 지도 생성 함수
  const jsonProcessing = async (json: any, sig_cd:string|boolean) => {
    let geoJson = json.features
    if (sig_cd){
      console.log('구 코드 : ', sig_cd)
        geoJson = json.features.filter((e:any)=> e.properties.sgg === sig_cd)
    }

    try {
      const newJson = geoJson.map((unit: any) => {
        const name = unit.properties.SIG_KOR_NM ? unit.properties.SIG_KOR_NM : unit.properties.temp;
        const coordinates = unit.geometry.coordinates[0].map(
          (coordinate: any) => new kakao.maps.LatLng(coordinate[1], coordinate[0])
        );
        const centerCoordinate = [unit.properties.x, unit.properties.y]
        const sig_cd = unit.properties.SIG_CD
        return { name, coordinates, centerCoordinate, sig_cd };
      });
      createPolygon(newMap, newJson, newCustomOverlay);
    } catch (error) {
      console.error('json 가공 오류 : ', error);
    }
  };

  // 폴리곤 생성 함수
  const createPolygon = (map: any, newJson: any, customOverlay: any) => {

    // 1. 사각형 폴리곤
    const backgroundSW = new kakao.maps.LatLng(36, 126)
    const backgroundNE = new kakao.maps.LatLng(39, 128)
    const rectangleBounds  = new kakao.maps.LatLngBounds(backgroundSW, backgroundNE);

    const background = new kakao.maps.Rectangle({
      bounds: rectangleBounds,
      strokeWeight: 0,
      strokeColor: '#ffffff', 
      strokeOpacity: 1, 
      strokeStyle: 'shortdashdot', 
      fillColor: '#ffffff', 
      fillOpacity: 1,
    });

    background.setMap(map)

    // 2. 구 & 동 폴리곤
    newJson.forEach((unit: any) => {
      const polygon = new kakao.maps.Polygon({
        map: map,
        path: unit.coordinates,
        strokeWeight: 3,
        strokeColor: '#004c80',
        strokeOpacity: 0.8,
        fillColor: '#9A9A9A',
        fillOpacity: 0.7,
      });
      kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent: any) {
        polygon.setOptions({ fillColor: '#ED5565' });
        customOverlay.setContent('<div class="area">' + unit.name + '</div>');
        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
      });

      // kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent: any) {
      //   customOverlay.setPosition(mouseEvent.latLng);
      // });

      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ fillColor: '#9A9A9A' });
        customOverlay.setMap(null);
      });

      kakao.maps.event.addListener(polygon, 'click', function () {

        const level = map.getLevel() - 3
        if(level === 3){
          navigate('/building', {state : {areaName : unit.name}})
        } else {
        map.setCenter(new kakao.maps.LatLng(unit.centerCoordinate[1], unit.centerCoordinate[0]))
        map.setLevel(level, {animate : {duration:500}})
        jsonProcessing(newDong, unit.sig_cd)
        console.log('area : ', unit);
        }
      });
    });
  };

  useEffect(()=>{
    if(newMap){
    jsonProcessing(newGu, false)
    } else{
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.56, 127.0),
          level: 9,
          // draggable : false,
          scrollwheel : false,
          disableDoubleClickZoom  : false,
        };
        setNewMap(new kakao.maps.Map(container, options))
        setNewCustomOverlay(new kakao.maps.CustomOverlay({}))
    }
  }, [newMap])

  useEffect(()=>{
    if(areaName && newMap){
    const findDong: any = newDong.features.find((dong: any) => dong.properties.temp === areaName);
    const sggCode = findDong.properties.sgg
    const findGu: any = newGu.features.find((gu:any) => gu.properties.SIG_CD === sggCode)
    console.log('필터 : ', findDong, findGu.properties.y, findGu.properties.x)

    newMap.setCenter(new kakao.maps.LatLng(findGu.properties.y, findGu.properties.x))
    // newMap.setLevel(6, {animate : {duration:500}})
    jsonProcessing(newGu, sggCode)
    }

  }, [areaName])

  
  return (
    <>
      <Map id="map"></Map>
    </>
  );
};

export default KakaoMap;
