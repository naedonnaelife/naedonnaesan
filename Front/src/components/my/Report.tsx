import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import ReportContent from './ReportContent';
import UseAxios from '../../utils/UseAxios';
import dongCode from '../../datas/dongdong.json'
import useDongStore from '../../stores/DongStore';

interface ReportProps {
  name: string | null;
  address: string | null;
  setAddress: (name: string) => void;
}

const ReportWrapper = styled.section`
  ${tw`flex flex-col w-[90%] h-[60%] 
  max-sm:w-[95%] max-sm:pt-2 max-sm:h-[80%]`}
`;

const ReportTitle = styled.h1`
  ${tw` h-[20%] text-2xl px-4 my-2
  max-sm:text-xl max-sm:h-[20%]`}
`;

const DongChangeButton = styled.button`
  ${tw`underline underline-offset-8 hover:text-dongButtonHover duration-200`}
`;

const Span = styled.span`
  ${tw`max-sm:block`}
`;

const Report: React.FC<ReportProps> = ({ name, address, setAddress }) => {
  const src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const daum = window.daum;
  const axios = UseAxios();
  const searchArea = useDongStore(state => state.searchArea)

  const searchAddress = () => {
    daum.postcode.load(() => {
      const postcode = new daum.Postcode({
        oncomplete: function (data: any) {
          setAddress(data.address);
          const geocoder = new daum.maps.services.Geocoder();

          geocoder.addressSearch(data.address, function (result: any, status: any) {
            if (status === daum.maps.services.Status.OK) {
              const roadData = result[0].road_address;
              const code = result[0].address.b_code.slice(0, 8)
              const dongName = dongCode.find(e => e.code === code)
              console.log(dongName)
              axios
                .put('/api/mypage/edit/address', {
                  address: data.address,
                  x: roadData.x,
                  y: roadData.y,
                  dongName : dongName?.dong
                })
                .then(()=> {
                  searchArea(dongName? dongName.dong : '')
                })
            }
          });
        },
      });
      postcode.open();
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    document.body.append(script);
  }, []);

  return (
    <ReportWrapper>
      <ReportTitle>
        <Span>{name}님의 </Span>
        <Span>
          <DongChangeButton onClick={searchAddress}>{address}</DongChangeButton> 기준
        </Span>
        <p>추천 결과 보고서입니다</p>
      </ReportTitle>
      <ReportContent name={name} />
    </ReportWrapper>
  );
};

export default Report;
