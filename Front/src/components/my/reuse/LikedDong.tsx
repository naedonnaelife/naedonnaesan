import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import UseAxios from '../../../utils/UseAxios';
import like from '../../../assets/like.png';
import unlike from '../../../assets/unlike.png';

interface Props {
  likedDongName: string;
  likedDongId: number;
}

const DongWrapper = styled.li`
  ${tw`flex w-full bg-white text-xl rounded-lg  my-1
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
  ${tw`w-16 h-10 rounded-lg bg-mango hover:bg-mangoHardHover
  max-sm:text-xs max-sm:h-7`}
`;

const LikeButton = styled.button`
  ${tw`w-[30px] h-[30px]`}
`;

const Like: React.FC<Props> = ({ likedDongName, likedDongId }) => {
  const navigate = useNavigate();
  const axios = UseAxios();
  const [likeImage, setLikeImage] = useState(like);
  const removeLike = async (id: number) => {
    await axios.delete(`/api/zzim/${id}`);
    setLikeImage(unlike);
  };

  return (
    <DongWrapper>
      <NameWrapper>{likedDongName}</NameWrapper>
      <ButtonWrapper style={{ marginLeft: 'auto' }}>
        <Button
          style={{ marginRight: '10px' }}
          onClick={() => navigate('/building', { state: { areaName: likedDongName } })}
        >
          매물
        </Button>
        <Button
          style={{ marginRight: '10px' }}
          onClick={() => navigate('/information', { state: { areaName: likedDongName } })}
        >
          정보
        </Button>
        <LikeButton style={{ marginRight: '10px' }} onClick={() => removeLike(likedDongId)}>
          <img src={likeImage} alt="like" />
        </LikeButton>
      </ButtonWrapper>
    </DongWrapper>
  );
};

export default Like;
