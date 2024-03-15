import tw, { styled } from 'twin.macro';
// import { useEffect, useState } from 'react';
// import { keyframes } from '@emotion/react';

const CarouselWrapper = styled.article`
    ${tw`flex-c w-full`}
`

const CarouselTitle = styled.h2`
    ${tw`h-[400px] rounded-lg bg-gradient-to-r from-green-300 to-blue-100 text-white text-center mx-2 `}
    width : calc(100vw / 6);
`

const Carousel:React.FC = () => {
    const arr = [1,2,3,4,5,6]
    return(
    <>
    <CarouselWrapper>
    {arr.map(e=> 
        <CarouselTitle key={e}>{e} 동네 비교</CarouselTitle>
    )}
    </CarouselWrapper>

    </>
)
}

export default Carousel