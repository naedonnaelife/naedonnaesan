import React from 'react';
import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import UseAxios from '../../../utils/UseAxios';
import { ConfirmAlert } from '../../../utils/Alert';
import like from '../../../assets/like.png';
import useSearchStore from '../../../stores/SearchStore';

interface Props {
  likedDongName: string;
  likedDongId: number;
  guName: string;
  setLikedDongList: React.Dispatch<React.SetStateAction<any>>;
}

const DongWrapper = styled.li`
  ${tw`flex w-full bg-white text-xl rounded-lg
  max-sm:h-12`}
`;

const NameWrapper = styled.span`
  ${tw`flex-c w-[60%] text-center font-jamsilLight text-2xl py-2
  max-sm:font-jamsilLight max-sm:text-lg`}
`;

const ButtonWrapper = styled.span`
  ${tw`w-[40%] flex-c
  max-sm:mr-3`}
`;

const Button = styled.button`
  ${tw`w-16 h-10 rounded-lg bg-mango hover:bg-mangoHardHover duration-200
  max-sm:text-xs max-sm:h-7`}
`;

const LikeButton = styled.button`
  ${tw`w-[30px] h-[30px] hover:animate-wiggle-more hover:animate-infinite`}
`;

const Like: React.FC<Props> = ({ guName, likedDongName, likedDongId, setLikedDongList }) => {
  const navigate = useNavigate();
  const axios = UseAxios();
  const setNowPage = useSearchStore(state => state.setNowPage)
  const removeLike = async (id: number) => {
    const confirm = await ConfirmAlert({
      title: '',
      content: `<strong>${likedDongName}</strong>을 <strong style="color:red;">삭제</strong>하시겠습니까?`,
      icon: 'question',
    });
    if (confirm) {
      await axios.delete(`/api/zzim/${id}`);
      setLikedDongList((prev: any) => prev.filter((zzim: any) => zzim.dongId !== id));
    }
  };
  const handleNavigate = (e:string) => {
      navigate(`/${e}`, { state: { areaName: likedDongName } })
      setNowPage(e)
    }

  return (
    <DongWrapper>
      <NameWrapper>
        {guName} {likedDongName}
      </NameWrapper>
      <ButtonWrapper style={{ marginLeft: 'auto' }}>
        <Button
          style={{ marginRight: '10px' }}
          onClick={() => handleNavigate('building')}
        >
          매물
        </Button>
        <Button
          style={{ marginRight: '10px' }}
          onClick={() => handleNavigate('information')}
        >
          정보
        </Button>
        <LikeButton style={{ marginRight: '10px' }} onClick={() => removeLike(likedDongId)}>
          <img src={like} alt="like" />
        </LikeButton>
      </ButtonWrapper>
    </DongWrapper>
  );
};

export default Like;
