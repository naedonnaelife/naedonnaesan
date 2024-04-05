import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import useSearchStore from '../../stores/SearchStore';
import newDong from '../../datas/dong.json';
import newGu from '../../datas/newGu.json';
import UseAxios from '../../utils/UseAxios';
import dong from '../../assets/dong2.gif'
import company from '../../assets/company.gif'

// https://www.flaticon.com/kr/animated-icons, https://ezgif.com/ 

const Map = styled.div`
  ${tw`h-[100%] w-[75%] p-2
  max-sm:h-[50%] max-sm:w-[95%]`}
`;

const BackSpace = styled.button`
  ${tw`absolute right-4 bottom-4 rounded-lg z-10 h-[100px] w-[100px] bg-choco text-white opacity-80 hover:bg-black 
  max-sm:left-[2.5vw] max-sm:top-[47vh] max-sm:h-[50px] max-sm:w-[50px] max-sm:text-xs`}
`

const dongStyle = `
position: absolute;
top: -9vh;
left: -34px;
color: black;
background-color: white;
opacity: 0.9;
padding: 2px 8px;
border: 2px solid #3E84E8;
border-radius: 8px;
box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
font-family: 'TheJamsil3Regular', sans-serif;
text-center;
`

const companyStyle =`
position: absolute;
top: -9vh;
left: -36px;
color: black;
background-color: white;
opacity: 0.9;
padding: 2px 8px;
border: 2px solid #3E84E8;
border-radius: 8px;
box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
font-family: 'TheJamsil3Regular', sans-serif;
text-center;
`


const { kakao } = window;

const KakaoMap: React.FC = () => {

  const [newMap, setNewMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any>(null);
  const [isView, setisView] = useState(false);
  const [dongList, setDongList] = useState(['']);
  const mapRef = useRef<any>(null);
  const isSmallRef = useRef<boolean | null>(null);
  const mapLevelRef = useRef<number | null>(null);
  const coordinateRef = useRef<number[] | null>(null);
  const [newCustomOverlay] = useState(new kakao.maps.CustomOverlay({}));
  const polygons = useRef([new kakao.maps.Polygon()]);
  const areaName = useSearchStore(state => state.areaName);
  const selectedArea = useSearchStore(state => state.selectedArea);
  const setNowPage = useSearchStore(state => state.setNowPage);
  const recommendList = useSearchStore(state => state.recommendList)
  const navigate = useNavigate();
  const axios = UseAxios();

  // 1. 반응형 감지
  const levelUp = () => {
    if (mapLevelRef.current) {
      mapLevelRef.current += 1;
      mapRef.current.setLevel(mapLevelRef.current, { animate: { duration: 500 } });
    }
  };
  const levelDown = () => {
    if (mapLevelRef.current) {
      mapLevelRef.current -= 1;
      mapRef.current.setLevel(mapLevelRef.current, { animate: { duration: 500 } });
    }
  };

  const handleWidthSize = () => {
    const isSmall = window.innerWidth <= 640;
    if (isSmall && !isSmallRef.current) {
      levelUp();
    } else if (!isSmall && isSmallRef.current) {
      levelDown();
    }
    isSmallRef.current = isSmall;
    mapRef.current.setCenter(new kakao.maps.LatLng(coordinateRef.current![0], coordinateRef.current![1]));
  };



  const getLocation = async () => {
        await axios.get('/api/myLatLon')
        .then(res => {
          const position = new kakao.maps.LatLng(res.data.object.y - 0.00052, res.data.object.x - 0.00275)
          const marker = new kakao.maps.Marker({
            position: position,
            image : new kakao.maps.MarkerImage(company, new kakao.maps.Size(32, 32))
          });
          marker.setMap(newMap)

          const customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content : `<div style="${companyStyle}" id=close>내 직장</div>` 
          })
          customOverlay.setMap(newMap);

          const closeOverlay = () => {
            customOverlay.setMap(null);
          }
          document.getElementById('close')?.addEventListener('click', closeOverlay)
          
          kakao.maps.event.addListener(marker, 'click', function () {
            if (customOverlay.getMap()) {
              customOverlay.setMap(null);
            } else {
              customOverlay.setMap(newMap);
            }
          });
        })
  }
  // 2. 뒤로가기
  const goBack = () => {
    const nowLevel:any = mapLevelRef.current
    if(nowLevel ===  7 || mapLevelRef.current === 6){
      mapLevelRef.current = nowLevel + 3
      jsonProcessing(newGu, '')
      mapRef.current.setCenter(new kakao.maps.LatLng(37.56, 127.0))
      mapRef.current.setLevel(nowLevel + 3, { animate: { duration: 500 } });
    }
    selectedArea('')
    setisView(false)
  }

  // 3. 구&동 지도 생성 함수
  const jsonProcessing = async (json: any, sig_cd: string | boolean) => {
    let geoJson = json.features;
    if (sig_cd) {
      geoJson = json.features.filter((e: any) => {
        const prefix = e.properties.EMD_CD.slice(0, 5);
        return prefix === sig_cd;
      });
    }

    try {
      const newJson = geoJson.map((unit: any) => {
        const name = unit.properties.SIG_KOR_NM ? unit.properties.SIG_KOR_NM : unit.properties.EMD_KOR_NM;
        const coordinates = unit.geometry.coordinates.map((e:[]) => e.map(
            (coordinate: number[]) => new kakao.maps.LatLng(coordinate[1] - 0.00052, coordinate[0] - 0.00275 )
          ));
        const centerCoordinate = [unit.properties.x, unit.properties.y];
        const sig_cd = unit.properties.SIG_CD;
        return { name, coordinates, centerCoordinate, sig_cd };
      });
      createPolygon(newMap, newJson, newCustomOverlay);
    } catch (error) {
      console.error('json 가공 오류 : ', error);
    }
  };

  // 4. 폴리곤 생성 함수
  const createPolygon = (map: any, newJson: any, customOverlay: any) => {
    // 2. 구 & 동 폴리곤

    polygons.current.map((polygon: any) => polygon.setMap(null));

    newJson.forEach((unit: any) => {
      const isSelected = (unit.name === areaName || dongList.includes(unit.name)) 
      const polygon = new kakao.maps.Polygon({
        map: map,
        path: unit.coordinates,
        strokeWeight: 3,
        strokeColor: '#403800',
        strokeOpacity: 0.8,
        fillColor: isSelected? '#aae4c1' : '#F3F4F6',
        fillOpacity: 0.7,
        zIndex: 10,
      });

      polygons.current = [...polygons.current, polygon];

      kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent: any) {
        polygon.setOptions(isSelected ? { fillOpacity: 1.0 } : { fillColor: '#FB8D75' });
        customOverlay.setContent(
          '<div class="area" style="position : absolute; top: 10px; left: -50px;" >' + unit.name + '</div>'
        );
        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
      });

      kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent: any) {
        customOverlay.setPosition(mouseEvent.latLng);
      });

      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions(isSelected ? { fillOpacity: 0.7 } : { fillColor: '#F3F4F6' });
        customOverlay.setMap(null);
      });

      kakao.maps.event.addListener(polygon, 'click', function () {
        const level = map.getLevel() - 3;
        setisView(true)
        if (level < 5) {
          navigate('/building', { state: { areaName: unit.name } });
          setNowPage('building')

        } else {
          map.setCenter(new kakao.maps.LatLng(unit.centerCoordinate[1] - 0.00052, unit.centerCoordinate[0] - 0.00275));
          map.setLevel(level, { animate: { duration: 500 } });
          jsonProcessing(newDong, unit.sig_cd);
          mapLevelRef.current = level;
          coordinateRef.current = [unit.centerCoordinate[1], unit.centerCoordinate[0]];
        }
      });
    });
  };

  useEffect(() => {
    if (newMap) {
      getLocation()
      jsonProcessing(newGu, false);
    } else {
      const initialLevel = window.innerWidth <= 640 ? 10 : 9;
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.56, 127.0),
        level: initialLevel,
        // draggable : false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
      };
      const newMap = new kakao.maps.Map(container, options);
      mapRef.current = newMap;
      mapLevelRef.current = initialLevel;
      coordinateRef.current = [37.56, 127.0];
      setNewMap(newMap);
    }
  }, [newMap]);

  
  useEffect(()=>{
    const dongNameList = recommendList.map(e => e.dongName)
    const coordinateList = dongNameList.map(e => {
      const findDong = (newDong as any).features.find((dong:any) => dong.properties.EMD_KOR_NM === e).properties
      return {dongName : e, x : findDong.x, y : findDong.y}
    })
    setDongList(dongNameList)
    if(newMap){
      if(markers){
        markers.map((e:any) =>{ 
        e.marker.setMap(null)
        e.overlay.setMap(null)})
      }
      const newMarkers = (coordinateList.map(e =>{
        const marker = new kakao.maps.Marker({
          map: newMap,
          position: new kakao.maps.LatLng(e.y - 0.00052, e.x - 0.00275),
          title : e.dongName,
          image : new kakao.maps.MarkerImage(dong, new kakao.maps.Size(32, 32))
        })

        const customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(e.y - 0.00052, e.x - 0.00275),
          content : `<div style="${dongStyle}">${e.dongName}</div>` 
        })
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          customOverlay.setMap(newMap);
        })

        kakao.maps.event.addListener(marker, 'mouseout', function () {
          customOverlay.setMap(null);
        });

        kakao.maps.event.addListener(marker, 'click', function () {
          selectedArea(e.dongName)
        });

        return {marker: marker, overlay: customOverlay }
      })
      )
      setMarkers(newMarkers)
    }

  },[recommendList])
  
  useEffect(() => {
    if (areaName && newMap) {
      const findDong = (newDong as any).features.find((dong: any) => dong.properties.EMD_KOR_NM === areaName);
      const sggCode = findDong.properties.EMD_CD.slice(0, 5);
      const findGu: any = newGu.features.find((gu: any) => gu.properties.SIG_CD === sggCode);
      const newLevel = isSmallRef.current ? 7 : 6;
      newMap.setCenter(new kakao.maps.LatLng(findGu.properties.y, findGu.properties.x));
      newMap.setLevel(newLevel, { animate: { duration: 500 } });
      jsonProcessing(newDong, sggCode);
      mapLevelRef.current = newLevel;
      setisView(true)
    }
  }, [areaName]);

  useEffect(() => {
    window.addEventListener('resize', () => handleWidthSize());
    return () => {
      window.removeEventListener('resize', handleWidthSize);
    };
  }, []);

  return (
    <>
      <Map id="map"></Map>
      {isView && <BackSpace onClick={goBack}>전체보기</BackSpace>}
    </>
  );
};

export default KakaoMap;
