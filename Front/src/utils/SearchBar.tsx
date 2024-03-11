import tw, { styled } from "twin.macro";

const Search = styled.div`
  ${tw`relative w-[18rem]`}
`;

const InputText = styled.input`
  ${tw`border-2 border-gray h-10 px-5 pr-16 rounded-full focus:outline-grayHover`}
  ::placeholder {
    ${tw`text-grayHover`}
  }
`;

const AddButton = styled.button`
  ${tw`absolute inset-y-0 right-0 flex items-center h-full px-2`}
`;

function SearchBar() {
  return (
    <>
      <Search>
        <InputText placeholder="동네 검색" />
        <AddButton>추가</AddButton>
      </Search>
    </>
  );
}

export default SearchBar;
