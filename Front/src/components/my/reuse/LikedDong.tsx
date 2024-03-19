import React from 'react';
import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';

const DongWrapper = styled.li`
  ${tw`flex w-full bg-white text-xl rounded-lg  my-1
  max-sm:h-12`}
`;

const NameWrapper = styled.span`
  ${tw`flex-c w-[60%] text-center font-jamsilLight text-2xl py-2
  max-sm:font-jamsilLight max-sm:text-lg`}
`;

const ButtonWrapper = styled.span`
  ${tw`w-[40%] flex-c`}
`;

const Button = styled.button`
  ${tw`w-16 h-10 rounded-lg bg-mango
  max-sm:text-xs max-sm:h-7`}
`;

const LikeButton = styled.button`
  ${tw`w-[30px] h-[30px] border-2 border-red rounded-full`}
`;

interface Props {
  likedDong: string;
}

const Like: React.FC<Props> = ({ likedDong }) => {
  const navigate = useNavigate();

  return (
    <DongWrapper>
      <NameWrapper>{likedDong}</NameWrapper>
      <ButtonWrapper>
        <Button onClick={() => navigate('/building')}>매물</Button>
        <Button onClick={() => navigate('/information')}>정보</Button>
        <LikeButton>💗</LikeButton>
      </ButtonWrapper>
    </DongWrapper>
  );
};

export default Like;
