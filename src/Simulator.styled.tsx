import styled from "styled-components";

export const SimulatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

/*********************************Draw********************* */
export const Canvas = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  width: 80vw;
  height: 40vh;
  border: 2px solid #333;
`;

export const Bar = styled.div<{
  $value: number;
  $max: number;
  $active?: boolean;
}>`
  align-self: end;
  height: ${({ $value, $max }) => Math.max(0.02, $value / $max) * 100}%;
  background: ${({ $active }) => ($active ? "#f43f5e" : "var(--main-color)")};
  transition: height 0.1s;

  &:nth-child(odd) {
    filter: brightness(1.05);
  }
  &:nth-child(even) {
    filter: brightness(0.95);
  }
`;

/** **************************Paramters********************* */

export const SlidersContainer = styled.div`
  display: flex;
  gap: 200px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const GroupsParametersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const GroupParameters = styled.div`
  background-color: #404040af;
  border-radius: 10px;
  padding: 10px;
  width: 350px;
  height: 250px;
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
`;

export const Button = styled.button`
  background: var(--main-color);
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
