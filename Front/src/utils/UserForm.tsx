import tw, { styled } from 'twin.macro';

const FormWrapper = styled.section`
  ${tw`flex-cc w-[50%] h-[90%] border-basic`}
`;
const Form = styled.section`
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
  return (
    <FormWrapper>
      <h1>여기가 정보를 입력하는 폼 !</h1>
      <Form>
        <Label htmlFor="">
          <span>성별</span>
          <Select>
            <option value="">여자</option>
            <option value="">남자</option>
          </Select>
        </Label>
        <Label htmlFor="">
          <span>나이</span>
          <Input type="number" />
        </Label>
        <Label htmlFor="">
          <span>이름</span>
          <Input type="text" />
        </Label>
        <Label htmlFor="">
          <span>직장 위치</span>
          <Input type="text" />
        </Label>
        <SubmitButton>저장</SubmitButton>
      </Form>
    </FormWrapper>
  );
}

export default UserForm;
