import { useState, useMemo, useRef } from "react";
import * as Styled from "./Simulator.styled";
import {
  bubbleSort,
  bubbleSortGenerator,
  insertionSort,
  insertionSortGenerator,
  selectionSort,
  selectionSortGenerator,
} from "./algorithms";
import { initElements } from "./utils";
import BurgerMenu from "./UI/BurgerMenu/BurgerMenu";

export default function Simulator() {
  const [totalElements, setTotalElements] = useState(10);
  const [elements, setElements] = useState<number[]>(() => initElements(10));
  const [pendingElements, setPendingElements] = useState(totalElements);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
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
    if (isSimulationActive) return;
    setIsSimulationActive(true);
    stepsRef.current = steps;

    const runStep = () => {
      const nextStep = stepsRef.current?.next();
      if (!nextStep || nextStep.done) {
        setIsSimulationActive(false);
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
      <h3>Visualization of different sorts</h3>
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
        <BurgerMenu>
          <Styled.SlidersContainer>
            <div>
              <h3>Number of elements: {totalElements}</h3>
              <input
                type="range"
                min={5}
                max={75}
                value={pendingElements}
                disabled={isSimulationActive}
                onChange={(e) => setPendingElements(Number(e.target.value))}
                onPointerUp={() => {
                  setTotalElements(pendingElements);
                  setElements(initElements(pendingElements));
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
              <h3>One-shot sorts</h3>
              <Styled.ButtonGroup>
                <Styled.Button
                  disabled={isSimulationActive}
                  onClick={() => setElements(bubbleSort(elements))}
                >
                  Bubble Sort
                </Styled.Button>
                <Styled.Button
                  disabled={isSimulationActive}
                  onClick={() => setElements(insertionSort(elements))}
                >
                  Insertion Sort
                </Styled.Button>
                <Styled.Button
                  disabled={isSimulationActive}
                  onClick={() => setElements(selectionSort(elements))}
                >
                  Selection Sort
                </Styled.Button>
              </Styled.ButtonGroup>
            </Styled.GroupParameters>
            <Styled.GroupParameters>
              <h3>Step-by-step sorts</h3>
              <Styled.ButtonGroup>
                <Styled.Button
                  disabled={isSimulationActive}
                  onClick={() => runSort(bubbleSortGenerator(elements))}
                >
                  Bubble Sort
                </Styled.Button>
                <Styled.Button
                  disabled={isSimulationActive}
                  onClick={() => runSort(insertionSortGenerator(elements))}
                >
                  Insertion Sort
                </Styled.Button>
                <Styled.Button
                  disabled={isSimulationActive}
                  onClick={() => runSort(selectionSortGenerator(elements))}
                >
                  Selection Sort
                </Styled.Button>
              </Styled.ButtonGroup>
            </Styled.GroupParameters>
          </Styled.GroupsParametersContainer>
        </BurgerMenu>
      </Styled.SimulatorContainer>
    </>
  );
}
