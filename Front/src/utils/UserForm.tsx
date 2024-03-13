import tw, { styled } from 'twin.macro';

const FormWrapper = styled.section`
  ${tw`flex-cc w-[50%] h-[90%] bg-gray`}
`;
const Form = styled.section`
  ${tw`flex-cc w-[80%]`}
`;
function UserForm() {
  return (
    <>
      <FormWrapper>
        <h1>여기가 정보를 입력하는 폼 !</h1>
        <Form>
          <label htmlFor="">
            <span>성별</span>
            <input type="text" />
          </label>
          <label htmlFor="">
            <span>나이</span>
            <input type="text" />
          </label>
          <label htmlFor="">
            <span>이름</span>
            <input type="text" />
          </label>
          <label htmlFor="">
            <span>직장 위치</span>
            <input type="text" />
          </label>
          <button>저장</button>
        </Form>
      </FormWrapper>
    </>
  );
}

export default UserForm;
