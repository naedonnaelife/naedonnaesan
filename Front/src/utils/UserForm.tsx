import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import UseAxios from "./UseAxios";
import Alert from './Alert';
import { useNavigate } from "react-router-dom";

type EventType = React.ChangeEvent<HTMLInputElement>;

const FormWrapper = styled.section`
  ${tw`flex-cc w-[50%] h-[90%] border-basic
  max-sm:w-[90%]`}
`;

const Form = styled.form`
  ${tw`flex-cc w-[70%]
  max-sm:w-[90%]`}
`;

const Label = styled.label`
  ${tw`flex justify-between w-[100%] my-4`}
`;

const SubmitButton = styled.button`
  ${tw`rounded-3xl bg-dongButton py-2 px-4 hover:bg-dongButtonHover`}
`;

const Input = styled.input`
  ${tw`w-[80%] border-2 rounded-md`}
`;

const Select = styled.select`
  ${tw`w-[80%] border-2 rounded-md`}
`;

function UserForm() {
  const [age, setAge] = useState<string>("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("F");
  const [name, setName] = useState("");
  const [coordinate, SetCoordinate] = useState({})
  const axios = UseAxios();
  const navigate = useNavigate()
  const inputData = {
    age,
    address,
    gender,
    name,
    coordinate
  };

  const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const {daum} = window;
  
  const serachAddress = () => {
    daum.postcode.load(() => {
      const postcode = new daum.Postcode({
        oncomplete: function (data: any) {
          console.log('데이터 : ', data)
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

  useEffect(()=>{
    if(address){
      const geocoder = new daum.maps.services.Geocoder();
      geocoder.addressSearch(address, function(result:any, status:any){
        if(status === daum.maps.services.Status.OK){
          const roadData = result[0].road_address
          SetCoordinate({x : roadData.x, y : roadData.y})
        }
      })
    }
  }, [address])



  
  const inputUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    const checked = Object.values(inputData).filter(e =>{
      if(typeof e === 'string'){
        return e === ""
      } else {
        return Object.keys(e).length === 0;
      }
    })

    if(!checked.length){
      await axios.post("/api/userinfo", inputData).then(
        () => {navigate('/recommend')}
      );
    } else{
      Alert({title:'', content:'정보를 모두 입력해 주세요.', icon: 'info'});
    }
  };
  // 테스트
  // const testAlert = () => {
  //   Alert({ title: "title", content: "필요하면 넣고 아니면 빈문자열", icon: "info" });
  //   console.log("경고");
  // };
  
  return (
    <FormWrapper>
      {/* <div onClick={testAlert}>Alert 테스트</div> */}
      <Form onSubmit={inputUserInfo}>
        <Label htmlFor="">
          <span>성별</span>
          <Select
            value={gender}
            onChange={(e: EventType) => setGender(e.target.value)}
          >
            <option value="F">여자</option>
            <option value="M">남자</option>
          </Select>
        </Label>
        <Label htmlFor="">
          <span>나이</span>
          <Input
            type="number"
            value={age}
            onChange={(e: EventType) => setAge(e.target.value)}
          />
        </Label>
        <Label htmlFor="">
          <span>이름</span>
          <Input
            type="text"
            value={name}
            onChange={(e: EventType) => setName(e.target.value)}
          />
        </Label>
        <Label htmlFor="">
          <span>직장 위치</span>
          <Input type="text" value={address} onClick={serachAddress} readOnly />
        </Label>
        <SubmitButton type="submit">저장</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default UserForm;
