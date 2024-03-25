import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import dongNameData from '../datas/dongName.json'

type styleProps= {
  color : string
}

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
  ${({ color }:styleProps) => `background-color : ${color};`}
`

const SearchBar:React.FC = () => {
  const [keyword, setKeywrod] = useState('')
  const [autoComplete, setAutoComplete] = useState([''])
  const [isActive, setIsActive] = useState(false)
  const [selectedKeyword, setSelectedKeyword] = useState(-1);
  const dongName: string[] = dongNameData.map(e => e.dongName)

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (!isActive) return;

    if (e.key === 'ArrowDown') {
      setSelectedKeyword(prevIndex => (prevIndex < autoComplete.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === 'ArrowUp') {
      setSelectedKeyword(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === 'Enter') {
      const nowValue = selectedKeyword === -1 ? keyword : autoComplete[selectedKeyword]
      searchDong(nowValue)
      // SetSearchDong(nowValue)
    }
  };

  const searchDong = (e:string) => { 
    console.log('엔터 : ', e)
  }

  useEffect(()=>{
    const regex = new RegExp(`^${keyword}`, 'i');
    const auto = dongName.filter(e => regex.test(e));
    setAutoComplete(auto)
    setSelectedKeyword(-1)
  }, [keyword])

// unmount시 keyword값 초기화

  return (
    <>
      <Search>
        <Wrapper>
            🔍
            <InputText 
              placeholder="동네 검색" value={keyword}
              onChange={(e:any) => setKeywrod(e.target.value)}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              onKeyDown={handleKeyDown}
              />
            {isActive && keyword && autoComplete.map((e, index) =>
              <AutocompleteKeyWord key={index} color={index == selectedKeyword? 'lightGray' : 'white'}>
                🔍 {e}
              </AutocompleteKeyWord>)}
        </Wrapper>
        <AddButton>검색</AddButton>
        
      </Search>
    </>
  );
}

export default SearchBar;
