import tw, { styled } from 'twin.macro';
import { useEffect, useState } from 'react';
import useSearchStore from '../../stores/SearchStore';
import SearchBar from '../../utils/SearchBar';
import UseAxios from '../../utils/UseAxios';
import Alert from '../../utils/Alert';
import LikedDong from './reuse/LikedDong';

interface LikeProps {
  name: string | null;
}

const LikeWrapper = styled.section`
  ${tw`w-[90%] h-[40%] pt-4
  max-sm:flex-col max-sm:w-full max-sm:pt-5 max-sm:h-[50%]`}
`;
const LikeTop = styled.div`
  ${tw`flex-c h-[25%]
  max-sm:flex-col max-sm:mx-1 max-sm:h-[35%]`}
`;

const SearchWrapper = styled.div`
  ${tw`w-full pl-10
  max-sm:pl-0`}
`;

const LikeTitle = styled.h1`
  ${tw`flex items-center text-2xl w-[90%] ml-5 pt-2
  max-sm:text-xl max-sm:mb-2 max-sm:mx-1`}
`;

const LikeContent = styled.ul`
  ${tw`grid grid-cols-2 gap-3 h-[70%] pl-[12px] pr-[2px] overflow-y-scroll
  max-sm:grid-cols-1`}
  ::-webkit-scrollbar-track {
    background: #f3f4f6;
  }
  ::-webkit-scrollbar-thumb {
    background: #f3f4f6;
  }
  :hover::-webkit-scrollbar-thumb {
    background: #d5d5d5;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #c5c5c5;
  }
`;
const P = styled.p`
  ${tw`text-2xl my-10
  max-sm:text-lg max-sm:my-4`}
`;

const Like: React.FC<LikeProps> = ({ name }) => {
  const [likedDongList, setLikedDongList] = useState<any[]>([]);
  const [searchDong, setSearchDong] = useState('');
  const updateLikeList = useSearchStore((state) => state.likeList);
  const axios = UseAxios();

  useEffect(() => {
    axios
      .get('/api/mypage/likelist')
      .then((response) => {
        const newLikedDongList = response.data.object.map((dong: any) => dong);
        setLikedDongList(newLikedDongList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateLikeList]);

  useEffect(() => {
    if (searchDong) {
      console.log(searchDong);
      axios
        .post(`/api/zzim`, { dongName: searchDong })
        .then((response) => {
          setLikedDongList((prev) => [...prev, { dongId: response.data.object.zzimId, dongName: searchDong }]);
          Alert({
            title: '',
            content: `${searchDong} 찜하기 성공!`,
            icon: 'success',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchDong]);

  return (
    <LikeWrapper>
      <LikeTop>
        <LikeTitle>{name}님이 찜한 동네</LikeTitle>
        <SearchWrapper>
          <SearchBar searchDong={searchDong} setSearchDong={setSearchDong} />
        </SearchWrapper>
      </LikeTop>
      <LikeContent>
        {likedDongList.length > 0 ? (
          likedDongList.map((likedDong: any, index: number) => (
            <LikedDong
              key={index}
              guName={likedDong.guName}
              likedDongName={likedDong.dongName}
              likedDongId={likedDong.dongId}
              setLikedDongList={setLikedDongList}
            />
          ))
        ) : (
          <P>{name}님이 찜한 동네가 없습니다.</P>
        )}
      </LikeContent>
    </LikeWrapper>
  );
};

export default Like;
