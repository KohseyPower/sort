import { useState, useMemo } from "react";
import * as Styled from "./Simulator.styled";
import {
  bubbleSort,
  bubbleSortGenerator,
  insertionSort,
  insertionSortGenerator,
  selectionSort,
  selectionSortGenerator,
} from "./algorithms";

const MIN = 5;
const MAX = 60;

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

  const runSort = (steps: Generator<number[]>) => {
    const intervalId = setInterval(() => {
      const nextStep = steps.next();
      if (nextStep.done) {
        clearInterval(intervalId);
      } else {
        setElements(nextStep.value);
      }
    }, 200);
  };

  return (
    <>
      <h1>Visualization of different sorts</h1>
      <Styled.SimulatorContainer>
        <Styled.Canvas $cols={totalElements}>
          {elements.map((value, index) => (
            <Styled.Bar key={index} $value={value} $max={maxValue} />
          ))}
        </Styled.Canvas>
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
        <Styled.ButtonGroup>
          <Styled.Button onClick={() => setElements(bubbleSort(elements))}>
            Bubble Sort
          </Styled.Button>
          <Styled.Button onClick={() => runSort(bubbleSortGenerator(elements))}>
            Bubble Sort Steps
          </Styled.Button>
          <Styled.Button onClick={() => setElements(insertionSort(elements))}>
            Insertion Sort
          </Styled.Button>
          <Styled.Button
            onClick={() => runSort(insertionSortGenerator(elements))}
          >
            Insertion Sort Steps
          </Styled.Button>
          <Styled.Button onClick={() => setElements(selectionSort(elements))}>
            Selection Sort
          </Styled.Button>
          <Styled.Button
            onClick={() => runSort(selectionSortGenerator(elements))}
          >
            Selection Sort Steps
          </Styled.Button>
        </Styled.ButtonGroup>
      </Styled.SimulatorContainer>
    </>
  );
}
