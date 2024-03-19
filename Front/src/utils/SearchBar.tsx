import tw, { styled } from "twin.macro";

const Search = styled.div`
  ${tw`relative w-full h-10`}
`;

const InputText = styled.input`
  ${tw`w-full h-10 border-2 border-gray rounded-full px-5 focus:outline-grayHover`}
  ::placeholder {
    ${tw`text-grayHover`}
  }
`;

const AddButton = styled.button`
  ${tw`flex items-center absolute inset-y-0 right-3 px-2`}
`;

// function SearchBar({onAddButtonClick}) {
//   return (
//     <>
//       <Search>
//         <InputText placeholder="동네 검색" />
//         <AddButton onClick={onAddButtonClick}>추가</AddButton>
//       </Search>
//     </>
//   );
// }

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
