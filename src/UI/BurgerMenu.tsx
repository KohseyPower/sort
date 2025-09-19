import { useState } from "react";
import type { BugerMenuProps } from "./BugerMenu.types";
import * as Styled from "./BurgerMenu.styled";

export default function BurgerMenu(props: BugerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Styled.BurgerButton $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <Styled.BurgerButtonLine />
        <Styled.BurgerButtonLine />
        <Styled.BurgerButtonLine />
      </Styled.BurgerButton>
      <Styled.BurgerContainer $isOpen={isOpen}>
        <Styled.BurgerChildrenContainer>
          {props.children}
        </Styled.BurgerChildrenContainer>
      </Styled.BurgerContainer>
    </>
  );
}
