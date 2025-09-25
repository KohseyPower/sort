import { useState } from "react";
import type { BugerMenuProps } from "./BugerMenu.types";
import * as Styled from "./BurgerMenu.styled";
import BurgerButton from "./BurgerButton/BurgerButton";

export default function BurgerMenu(props: BugerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <Styled.BurgerContainer $isOpen={isOpen}>
        <Styled.BurgerChildrenContainer>
          {props.children}
        </Styled.BurgerChildrenContainer>
      </Styled.BurgerContainer>
    </>
  );
}
