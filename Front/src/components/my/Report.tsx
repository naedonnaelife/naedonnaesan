import React, { useState, useEffect } from "react";
import tw, { styled } from "twin.macro";
import ReportContent from "./ReportContent";
import SB from "../../datas/SB.json";
import UseAxios from "../../utils/UseAxios";


const ReportWrapper = styled.section`
  ${tw`w-[90%] border-b-2 border-grayHover pb-5
  max-sm:w-full`}
`;

const ReportTitle = styled.h1`
  ${tw`text-3xl mx-5 my-3
  max-sm:text-2xl max-sm:mx-2`}
  span {
    ${tw`max-sm:block`}
  }
`;

const DongChangeButton = styled.button`
  ${tw`underline`}
`;

const Report: React.FC = () => {
  const [_, setAddress] = useState("");
  const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const daum = window.daum;
  // const axios = UseAxios();

  const serachAddress = () => {
    daum.postcode.load(() => {
      const postcode = new daum.Postcode({
        oncomplete: function (data: any) {
          // console.log(data.address)
          // axios.put("/api/mypage/edit/address" ,{ params: { address: data.address } })
          setAddress(data.address);
        },
      });
      postcode.open();
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = src;
    document.body.append(script);
  }, []);

  return (
    <ReportWrapper>
      <ReportTitle>
        <span>{SB.reportUserInfo.object.nickname}님의 </span>
        <span>
          <DongChangeButton onClick={serachAddress}>
            {SB.reportUserInfo.object.bAddress}
          </DongChangeButton>{" "}
          기준
        </span>{" "}
        추천 결과 보고서입니다
      </ReportTitle>
      <ReportContent />
    </ReportWrapper>
  );
};

export default Report;
