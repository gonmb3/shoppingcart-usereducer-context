import {AiFillStar, AiOutlineStar} from "react-icons/ai"

const Rating = ({rating, onClick , style}) => {
  return (
    /*Rating stars function -----*/
    <>
        {
            [...Array(5)].map((_, i) => (
                <span key={i} onClick={() => onClick(i)} style={style} >
                   {
                    rating > i ? (
                        <AiFillStar size={20} /> 
                    ): (
                        <AiOutlineStar size={20} />
                    )
                   }
                </span>
            ))
        }
    </>
  )
}

export default Rating