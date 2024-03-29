import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';

type StyleProps = {
    nowScroll: boolean;
}

const DotWrapper = styled.div`
${tw`flex-cc fixed top-[40vh] right-[2vw] z-10`}
`

const ScrollDot = styled.button`
${tw` w-[5px] h-[5px] bg-blue-200 rounded-full mb-2 p-2 opacity-70 shadow-lg hover:opacity-100 hover:scale-105 hover:bg-blue-300`}
${({ nowScroll }: StyleProps) => nowScroll? tw`bg-blue-300` : `` }
`

const SideButton:React.FC = () => {
    const [nowScroll, setNowScroll] = useState(0)
    const arr = [0,1,2,3,4,5]

    const handleScroll = (index: number) => {
        let scrollPosition = 0
        if(index){
            scrollPosition = window.innerHeight * (index + 0.15);
        }
        window.scroll({
          top: scrollPosition,
          left: 0,
          behavior: 'smooth',
        });
      };

    const handleNowScroll = () => {
        const nowIndex = (window.scrollY + window.innerHeight * 0.25) / window.innerHeight
        setNowScroll(Math.floor(nowIndex))
    }

      useEffect(() => {
        window.addEventListener('scroll', handleNowScroll);
        return () => {
          window.removeEventListener('scroll', handleNowScroll);
        };
      }, []);

    return(
        <>
            <DotWrapper>
                {arr.map(e=> <ScrollDot onClick={()=> handleScroll(e)} nowScroll={nowScroll === e} key={e}/>)}
            </DotWrapper>
        </>
    )
}

export default SideButton