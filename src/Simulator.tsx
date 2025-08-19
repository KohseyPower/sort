import { useState, useEffect, useMemo } from "react";
import * as Styled from "./Simulator.styled.tsx";

const MIN = 5;
const MAX = 60;
const WINDOWSIZE = 400;

function initElements(numElements: number) {
  const elements = [];
  for (let i = 0; i < numElements; i++) {
    const randomNumber = Math.floor(Math.random() * numElements) + 1;
    elements.push(randomNumber);
  }
  return elements;
}

export default function Simulator() {
  const [numElements, setNumElements] = useState(10);
  const [cellSize, setSize] = useState(0);
  const [elements, setElements] = useState<number[]>([]);
  useEffect(() => {
    // Algorithms
    setElements(initElements(numElements));
    console.log("elements : ", elements);

    //UI
    setSize(WINDOWSIZE / numElements);
  }, [numElements]);

  const maxValue = useMemo(() => Math.max(1, ...elements), [elements]);

  return (
    <>
      <h1>Visualization of different sorts</h1>
      <div>
        <h2>Bubble sort</h2>
        <p>number of elements: {numElements}</p>
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={numElements}
          onChange={(e) => {
            setNumElements(Number(e.target.value));
          }}
        />
        <Styled.Canvas $size={WINDOWSIZE} $cols={numElements}>
          {elements.map((value) => (
            <Styled.Bar $value={value} $max={maxValue} />
          ))}
        </Styled.Canvas>
      </div>
    </>
  );
}
