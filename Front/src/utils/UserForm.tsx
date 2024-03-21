import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import UseAxios from './UseAxios';
// import alert, {alert2, alert3, alert4} from './Alet';
import alert4 from './Alet';

type EventType = React.ChangeEvent<HTMLInputElement>


const FormWrapper = styled.section`
  ${tw`flex-cc w-[50%] h-[90%] border-basic`}
`;

const Form = styled.form`
  ${tw`flex-cc w-[70%]`}
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
  const [age, setAge] = useState<string>('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [name, setName] = useState('')
  const axios = UseAxios()
  const inputData = {
    age, address, gender, name
  }
  const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const daum = window.daum
  const serachAddress = () => {
    daum.postcode.load(() => {
      const postcode = new daum.Postcode({
        oncomplete: function (data:any) {
          setAddress(data.address)
        }
      });
      postcode.open();
    });
  };

  useEffect(() => {
      const script = document.createElement("script");
      script.src = src;
      document.body.append(script);
  }, []);

  const inputUserInfo = async (e : React.FormEvent) => {
    e.preventDefault()
    await axios.post('/userinfo', inputData)
  }
  // 테스트
  const testAlert = () => {
    // Alert({title : 'ㅎㅎ'})
    alert4({title : 'ㅎㅎ'})
    console.log('경고')
  }
  return (
    <FormWrapper>
      <div onClick={testAlert}>Alert 테스트</div>
      <Form onSubmit={inputUserInfo}>
        <Label htmlFor="">
          <span>성별</span>
          <Select value={gender} onChange={(e:EventType) => setGender(e.target.value)}>
            <option value="여자">여자</option>
            <option value="남자">남자</option>
          </Select>
        </Label>
        <Label htmlFor="">
          <span>나이</span>
          <Input type="number" value={age} onChange={(e:EventType) => setAge(e.target.value)} />
        </Label>
        <Label htmlFor="">
          <span>이름</span>
          <Input type="text" value={name} onChange={(e:EventType) => setName(e.target.value)} />
        </Label>
        <Label htmlFor="">
          <span>직장 위치</span>
          <Input type="text" value={address} onClick={serachAddress} readOnly  />
        </Label>
          <SubmitButton type="submit">저장</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default UserForm;

