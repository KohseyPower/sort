import styled from "styled-components";

export const BurgerContainer = styled.div<{ $isOpen: boolean }>`
  @media (max-width: 600px) {
    position: fixed;
    top: 0;
    right: 0;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(100vw)"};
    transition: 0.1s ease-in-out;
    height: 100vh;
    width: 100vw;
    background-color: rgba(245, 245, 245, 0.8);
  }
`;

export const BurgerChildrenContainer = styled.div`
  margin-top: 5vh;
  padding: 10px;
`;
