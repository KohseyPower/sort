import { useState, useMemo, useRef, useEffect } from "react";
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
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [sortSpeed, setSortSpeed] = useState(200);

  const sortSpeedRef = useRef(sortSpeed);
  const stepsRef = useRef<Generator<{
    array: number[];
    active: number[];
  }> | null>(null);

  const maxValue = useMemo(
    () => elements.reduce((max, v) => (v > max ? v : max), 1),
    [elements]
  );

  sortSpeedRef.current = sortSpeed;

  const runSort = (steps: Generator<{ array: number[]; active: number[] }>) => {
    if (isRunning) return;
    setIsRunning(true);
    stepsRef.current = steps;

    const runStep = () => {
      const nextStep = stepsRef.current?.next();
      if (!nextStep || nextStep.done) {
        setIsRunning(false);
        setActiveIndices([]);
        return;
      }

      setElements(nextStep.value.array);
      setActiveIndices(nextStep.value.active);

      setTimeout(runStep, sortSpeedRef.current);
    };

    runStep();
  };

  return (
    <>
      <h2>Visualization of different sorts</h2>
      <Styled.SimulatorContainer>
        <Styled.Canvas $cols={totalElements}>
          {elements.map((value, index) => (
            <Styled.Bar
              key={index}
              $value={value}
              $max={maxValue}
              $active={activeIndices.includes(index)}
            />
          ))}
        </Styled.Canvas>
        <Styled.SlidersContainer>
          <div>
            <h3>Number of elements: {totalElements}</h3>
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={totalElements}
              disabled={isRunning}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                setTotalElements(newValue);
                setElements(initElements(newValue));
              }}
            />
          </div>
          <div>
            <h3>Speed : {sortSpeed}</h3>
            <input
              type="range"
              min={0}
              max={1000}
              value={sortSpeed}
              onChange={(e) => {
                setSortSpeed(Number(e.target.value));
              }}
            />
          </div>
        </Styled.SlidersContainer>
        <Styled.GroupsParametersContainer>
          <Styled.GroupParameters>
            <h2>One-shot sorts</h2>
            <Styled.ButtonGroup>
              <Styled.Button
                disabled={isRunning}
                onClick={() => setElements(bubbleSort(elements))}
              >
                Bubble Sort
              </Styled.Button>
              <Styled.Button
                disabled={isRunning}
                onClick={() => setElements(insertionSort(elements))}
              >
                Insertion Sort
              </Styled.Button>
              <Styled.Button
                disabled={isRunning}
                onClick={() => setElements(selectionSort(elements))}
              >
                Selection Sort
              </Styled.Button>
            </Styled.ButtonGroup>
          </Styled.GroupParameters>
          <Styled.GroupParameters>
            <h2>Step-by-step sorts</h2>
            <Styled.ButtonGroup>
              <Styled.Button
                disabled={isRunning}
                onClick={() => runSort(bubbleSortGenerator(elements))}
              >
                Bubble Sort
              </Styled.Button>
              <Styled.Button
                disabled={isRunning}
                onClick={() => runSort(insertionSortGenerator(elements))}
              >
                Insertion Sort
              </Styled.Button>
              <Styled.Button
                disabled={isRunning}
                onClick={() => runSort(selectionSortGenerator(elements))}
              >
                Selection Sort
              </Styled.Button>
            </Styled.ButtonGroup>
          </Styled.GroupParameters>
        </Styled.GroupsParametersContainer>
      </Styled.SimulatorContainer>
    </>
  );
}
