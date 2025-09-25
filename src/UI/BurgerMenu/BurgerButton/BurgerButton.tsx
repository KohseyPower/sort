import * as Styled from "./BUgerButton.styles";
import type { BurgerButtonProps } from "./BurgerButton.types";

export default function BurgerButton({ isOpen, setIsOpen }: BurgerButtonProps) {
  return (
    <Styled.BurgerButton onClick={() => setIsOpen((prev) => !prev)}>
      <Styled.TopLine $isOpen={isOpen} />
      <Styled.MiddleLine $isOpen={isOpen} />
      <Styled.BottomLine $isOpen={isOpen} />
    </Styled.BurgerButton>
  );
}
