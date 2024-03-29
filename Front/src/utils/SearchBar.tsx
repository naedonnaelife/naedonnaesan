import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import dongNameData from '../datas/dongName.json';
import Alert from './Alert.tsx';

interface SearchProps {
  searchDong: string;
  setSearchDong: React.Dispatch<React.SetStateAction<string>>;
}

type styleProps = {
  color: string;
};

const Search = styled.div`
  ${tw`relative w-full h-10`}
`;

const Wrapper = styled.div`
  ${tw`bg-white border-2 rounded-2xl border-orange-200 overflow-hidden p-2`}
`;

const InputText = styled.input`
  ${tw`outline-none`}
`;

const AddButton = styled.button`
  ${tw`flex items-center absolute inset-y-0 right-3 px-2`}
`;

const AutocompleteKeyWord = styled.p`
  ${tw`my-1`}
  ${({ color }: styleProps) => `background-color : ${color};`}
`;

function SearchBar({ searchDong, setSearchDong }: SearchProps) {
  const [keyword, setKeyword] = useState(searchDong);
  const [autoComplete, setAutoComplete] = useState(['']);
  const [isActive, setIsActive] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(-1);
  const dongName: string[] = dongNameData.map((e) => e.dongName);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isActive) return;

    if (e.key === 'ArrowDown') {
      setSelectedKeyword((prevIndex) => (prevIndex < autoComplete.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === 'ArrowUp') {
      setSelectedKeyword((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === 'Enter') {
      const nowValue = selectedKeyword === -1 ? keyword : autoComplete[selectedKeyword];
      handleInput(nowValue);
    }
  };

  const handleInput = (dong: string) => {
    console.log('입력이벤트');
    const isDong = dongNameData.some(function (item) {
      return item.dongName === dong;
    });
    console.log(isDong);
    if (isDong) {
      setSearchDong(dong);
      setKeyword(dong);
    } else {
      console.log('경고!');
      Alert({ title: '', content: '존재하지 않는 동입니다.', icon: 'error' });
      console.log('왜안뜸');
    }
  };

  useEffect(() => {
    if (keyword.length !== 0) {
      const escapeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`^${escapeKeyword}`, 'i');
      const auto = dongName.filter((e) => regex.test(e));
      setAutoComplete(auto);
      setSelectedKeyword(-1);
    }
  }, [keyword]);

  // unmount시 keyword값 초기화

  return (
    <>
      <Search>
        <Wrapper>
          🔍
          <InputText
            placeholder="동네 검색"
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            onClick={() => setIsActive(true)}
            onKeyDown={handleKeyDown}
          />
          {isActive &&
            keyword &&
            autoComplete.map((name, index) => (
              <AutocompleteKeyWord
                onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                onClick={() => handleInput(name)}
                key={index}
                color={index == selectedKeyword ? 'lightGray' : 'white'}
              >
                🔍 {name}
              </AutocompleteKeyWord>
            ))}
        </Wrapper>
        <AddButton onClick={() => handleInput(keyword)}>검색</AddButton>
      </Search>
    </>
  );
}

export default SearchBar;
