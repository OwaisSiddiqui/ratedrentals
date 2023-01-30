import styled from 'styled-components'
// import Info from "../icons/Info"

// const InfoMessage = ({ description }: {
//     description: string
// }) => {
//     return (
//         <S.Container>
//             <Info size={{width: 15, height: 15}} />
//             <S.Description>
//                 {description}
//             </S.Description>
//         </S.Container>
//     )
// }

// export default InfoMessage

export const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid lightgrey;
  align-items: flex-start;
`
export const Description = styled.p`
  font-size: 13px;
`
