import styled from 'styled-components'

export const SliderQuestionBoxComponent = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 1rem 1rem;
`

export const SliderQuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`

export const OptionSpan = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 500;
  font-size: 12px;
`

export const Slider = styled.input`
  outline: none;
  transition: background 450ms ease-in;
  -webkit-appearance: none;
  border-radius: 4px;
  background: #c4c4c4;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    margin-top: -5px;
    margin-bottom: -5px;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
  }
`

export const SliderQuestionBoxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  padding: 0 2rem 12px 2rem;
  margin: -12px 0 0 0;
`

export const SliderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const SliderRangeNumber = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 500;
  font-size: 12px;
  color: #8b8b8b;
`
