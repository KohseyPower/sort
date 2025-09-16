import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.5rem 0;
`;

export const Button = styled.button`
  background: #4f46e5;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  border: none;
  border-radius: 12px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.4);
  }
`;

export const Canvas = styled.div<{ $size: number; $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 1px solid #333;
`;

export const Bar = styled.div<{ $value: number; $max: number }>`
  align-self: end;
  height: ${({ $value, $max }) => Math.max(0.02, $value / $max) * 100}%;
  background: #4f46e5;
`;
