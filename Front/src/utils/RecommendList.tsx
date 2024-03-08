import { useState } from 'react';
import tw, { styled } from 'twin.macro';


const dummyData = {
    response : ['서울특별시 성동구 성수 1동', '서울특별시 성동구 성수 2동', '서울특별시 성동구 성수 3동']
}

function RecommendList() {
    const [likeList, setLikeList] = useState([1,2])
    const addLike = (index:number) => {
        setLikeList(prev => [...prev, index])
    }
    const removeLike = (index:number) => {
        setLikeList(prev => prev.filter(element => element !== index))
    }
    return (
    <>
        {dummyData.response.map((element:string, index:number)=>{
            <div key={index}>
                <div>{index}</div> {element} {(index in likeList?
                 <div onClick={()=>removeLike(index)}>💗</div>
                 : <div onClick={()=> addLike(index)}>❤ </div>
                 )}
            </div>
        })}
    </>
    );
  }
  
  export default RecommendList;
  