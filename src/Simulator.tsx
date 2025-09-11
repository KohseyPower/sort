import { useState, useMemo } from "react";
import * as Styled from "./Simulator.styled";
import { bubbleSort, insertionSort } from "./algorithms";

const MIN = 5;
const MAX = 60;
const WINDOWSIZE = 400;

function initElements(numElements: number) {
  return Array.from(
    { length: numElements },
    () => Math.floor(Math.random() * numElements) + 1
  );
}

export default function Simulator() {
  const [totalElements, setTotalElements] = useState(10);
  const [elements, setElements] = useState<number[]>(() => initElements(10));

  const maxValue = useMemo(
    () => elements.reduce((max, v) => (v > max ? v : max), 1),
    [elements]
  );

  return (
    <>
      <h1>Visualization of different sorts</h1>
      <div>
        <h2>Bubble sort</h2>
        <div>
          <h3>Number of elements: {totalElements}</h3>
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={totalElements}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setTotalElements(newValue);
              setElements(initElements(newValue));
            }}
          />
        </div>
        <div>
          <button
            onClick={() => {
              setElements(bubbleSort(elements));
            }}
          >
            Bubble Sort
          </button>
          <button onClick={() => setElements(insertionSort(elements))}>
            Insertion Sort
          </button>
        </div>
        <Styled.Canvas $size={WINDOWSIZE} $cols={totalElements}>
          {elements.map((value, index) => (
            <Styled.Bar key={index} $value={value} $max={maxValue} />
          ))}
        </Styled.Canvas>
      </div>
    </>
  );
}
