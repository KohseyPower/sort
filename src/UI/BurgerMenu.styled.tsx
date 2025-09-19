import styled from "styled-components";

export const BurgerButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  right: 2vh;
  top: 2vh;
  z-index: 10;
  margin: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  border: none;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

export const BurgerButtonLine = styled.span`
  background-color: var(--main-color);
  width: 25px;
  height: 4px;
  border-radius: 4px;
`;

export const BurgerContainer = styled.div<{ $isOpen: boolean }>`
  @media (max-width: 600px) {
    position: fixed;
    top: 0;
    right: 0;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(100vw)"};
    transition: 0.1s ease-in-out;

    height: 100vh;
    width: 90vw;

    background-color: var(--light-background);
  }
`;

export const BurgerChildrenContainer = styled.div`
  margin-top: 5vh;
  padding: 10px;
`;
