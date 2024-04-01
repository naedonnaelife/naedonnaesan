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
  ${tw`w-[90%]
  max-sm:flex-col max-sm:w-full max-sm:pt-5`}
`;
const LikeTop = styled.div`
  ${tw`flex justify-between mx-5 my-3
  max-sm:flex-col max-sm:mx-1`}
`;

const LikeTitle = styled.h1`
  ${tw`text-3xl font-bold w-[90%]
  max-sm:text-xl max-sm:mb-2 max-sm:mx-1`}
`;

const LikeContent = styled.ul`
  ${tw`flex-cc`}
`;
const P = styled.p`
  ${tw`text-2xl my-10
  max-sm:text-lg max-sm:my-4`}
`

const Like: React.FC<LikeProps> = ({ name }) => {
  const [likedDongList, setLikedDongList] = useState<any[]>([]);
  const [searchDong, setSearchDong] = useState('');
  const updateLikeList = useSearchStore((state) => state.likeList)
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
      console.log(searchDong)
      axios.post(`/api/zzim`, {dongName:searchDong})
        .then((response) => {
          setLikedDongList((prev) => [...prev, {dongId: response.data.object.zzimId, dongName: searchDong}])
          Alert({title:'', content:`${searchDong} 찜하기 성공!`, icon: 'success'})
        })
        .catch((error) => {
          console.log(error)
        })
        
      }
  }, [searchDong])

  return (
    <LikeWrapper>
      <LikeTop>
        <LikeTitle>{name}님이 찜한 동네</LikeTitle>
        <SearchBar searchDong={searchDong} setSearchDong={setSearchDong} />
      </LikeTop>
      <LikeContent>
        {likedDongList.length > 0 ? likedDongList.map((likedDong: any, index: number) => (
          <LikedDong key={index} likedDongName={likedDong.dongName} likedDongId={likedDong.dongId} setLikedDongList={setLikedDongList}/>
        )) : <P>{name}님이 찜한 동네가 없습니다.</P>}
      </LikeContent>
    </LikeWrapper>
  );
};

export default Like;
