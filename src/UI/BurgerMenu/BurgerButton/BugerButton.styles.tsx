import styled from "styled-components";

const lineHeight = 4;
const lineGap = 5;
const translateValue = lineHeight + lineGap;

export const BurgerButton = styled.button`
  position: fixed;
  z-index: 10;
  right: 2vh;
  top: 2vh;
  margin: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  border: none;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    gap: ${lineGap}px;
  }
`;

export const Line = styled.div<{ $isOpen: boolean }>`
  background-color: var(--main-color);
  width: 25px;
  height: ${lineHeight}px;
  border-radius: 4px;
  transition: 0.2s ease-in-out;
`;

export const TopLine = styled(Line)<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) =>
    $isOpen && `translateY(${translateValue}px) rotate(45deg)`};
`;

export const MiddleLine = styled(Line)<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => $isOpen && "scaleX(0)"};
`;

export const BottomLine = styled(Line)<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) =>
    $isOpen && `translateY(-${translateValue}px)rotate(-45deg)`};
`;
