import React, { useEffect } from "react";
import tw, { styled } from "twin.macro";
import ReportContent from "./ReportContent";
import UseAxios from "../../utils/UseAxios";

interface ReportProps {
  name: string | null;
  address: string | null;
  setAddress: (name: string) => void;
}

const ReportWrapper = styled.section`
  ${tw`w-[90%] border-b-2 border-grayHover pb-5
  max-sm:w-full`}
`;

const ReportTitle = styled.h1`
  ${tw`text-3xl font-bold mx-5 my-3
  max-sm:text-xl max-sm:mx-2`}
  span {
    ${tw`max-sm:block`}
  }
  `;
  
  const DongChangeButton = styled.button`
  ${tw`underline underline-offset-8`}
  `;
  
const Report: React.FC<ReportProps> = ({name, address, setAddress}) => {
    
    const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const daum = window.daum;
    const axios = UseAxios();

    const searchAddress = () => {
      daum.postcode.load(() => {
        const postcode = new daum.Postcode({
          oncomplete: function (data: any) {
            setAddress(data.address);
            const geocoder = new daum.maps.services.Geocoder();
            
            geocoder.addressSearch(data.address, function(result:any, status:any){
              if(status === daum.maps.services.Status.OK){
                const roadData = result[0].road_address
                axios.put("/api/mypage/edit/address", {
                  address: data.address,
                  x: roadData.x,
                  y: roadData.y,
                })
                .then((response) => {
                console.log(response);
                })
                .catch((error) => {
                console.log(error)
                })
              }
            })
            console.log(data.address)
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
        <span>{name}님의 </span>
        <span>
          <DongChangeButton onClick={searchAddress}>
            {address}
          </DongChangeButton>{" "}
          기준
        </span>
        <p>추천 결과 보고서입니다</p>
      </ReportTitle>
      <ReportContent />
    </ReportWrapper>
  );
};

export default Report;
