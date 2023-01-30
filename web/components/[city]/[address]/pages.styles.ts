import { devices } from "@/utils/constants";
import styled from "styled-components";


export const Arrows = styled.div`
  position: fixed;
  right: 1rem;
  align-items: center;
  top: 37.5%;
  transform: translateY(-50%);
  justify-content: center;
  gap: 0.5rem;
  flex-direction: column;
  z-index: 2;
  display: flex;
  @media ${devices.tablet} {
    top: 50%;
    transform: translateY(-50%);
    right: calc((100% - 2rem) * 0.3 + 2rem);
  }
`

export const Navigate = styled.button`
  border-radius: 7px;
  background: transparent;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 0;
  cursor: pointer;
  /* backdrop-filter: blur(10px); */
  padding: 0;
  margin: 0;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`
