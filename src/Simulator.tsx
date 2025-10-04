import { useState, useMemo, useRef } from "react";
import * as Styled from "./Simulator.styled";
import {
  bubbleSortGenerator,
  insertionSortGenerator,
  selectionSortGenerator,
} from "./algorithms";
import { shuffleElements } from "./utils";
import BurgerMenu from "./UI/BurgerMenu/BurgerMenu";
import { randomSortGenerator } from "./algorithms/RandomSort";

export default function Simulator() {
  const [totalElements, setTotalElements] = useState(10);
  const [elements, setElements] = useState<number[]>(() => shuffleElements(10));
  const [pendingElements, setPendingElements] = useState(totalElements);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [sortSpeed, setSortSpeed] = useState(200);
  const [isPaused, setIsPaused] = useState(false);

  const pausedRef = useRef(false);
  const sortSpeedRef = useRef(sortSpeed);
  const stepsRef = useRef<Generator<{
    array: number[];
    active: number[];
  }> | null>(null);
  const currentRunStepRef = useRef<() => void>(() => {});
  const timeoutRef = useRef<number | null>(null);

  const maxValue = useMemo(() => Math.max(...elements, 1), [elements]);

  sortSpeedRef.current = sortSpeed;

  const runSort = (steps: Generator<{ array: number[]; active: number[] }>) => {
    if (isSimulationActive) return;

    setIsSimulationActive(true);
    setIsPaused(false);
    pausedRef.current = false;
    stepsRef.current = steps;

    const runStep = () => {
      if (pausedRef.current) return;
      const nextStep = stepsRef.current?.next();
      if (!nextStep || nextStep.done) {
        setIsSimulationActive(false);
        setIsPaused(false);
        setActiveIndices([]);
        stepsRef.current = null;
        return;
      }
      setElements(nextStep.value.array);
      setActiveIndices(nextStep.value.active);
      timeoutRef.current = window.setTimeout(runStep, sortSpeedRef.current);
    };

    currentRunStepRef.current = runStep;
    runStep();
  };

  const handleStop = () => {
    if (!isSimulationActive && !isPaused) {
      alert("There is no simulation running.");
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    stepsRef.current = null;
    pausedRef.current = false;
    setIsSimulationActive(false);
    setIsPaused(false);
    setActiveIndices([]);
  };

  const handlePause = () => {
    if (!isSimulationActive && !isPaused) {
      alert("There is no simulation running.");
      return;
    }
    pausedRef.current = !pausedRef.current;
    setIsPaused(pausedRef.current);
    if (!pausedRef.current) {
      currentRunStepRef.current();
    }
  };

  const handleReset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    stepsRef.current = null;
    pausedRef.current = false;
    setIsSimulationActive(false);
    setIsPaused(false);
    setActiveIndices([]);
    setElements(shuffleElements(pendingElements));
  };

  const handleStep = () => {
    if (!stepsRef.current) {
      alert("There is no simulation loaded.");
      return;
    }
    const nextStep = stepsRef.current.next();
    if (!nextStep.done) {
      setElements(nextStep.value.array);
      setActiveIndices(nextStep.value.active);
      setIsSimulationActive(true);
    } else {
      setIsSimulationActive(false);
      setIsPaused(false);
      setActiveIndices([]);
      stepsRef.current = null;
    }
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
                max={100}
                value={pendingElements}
                disabled={isSimulationActive}
                onChange={(e) => setPendingElements(Number(e.target.value))}
                onPointerUp={() => {
                  setTotalElements(pendingElements);
                  setElements(shuffleElements(pendingElements));
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
              <h3>Parameters</h3>
              <Styled.ButtonGroup>
                <Styled.Button onClick={handleReset}>Reset</Styled.Button>
                <Styled.Button onClick={handleStop}>Stop</Styled.Button>
                <Styled.Button onClick={handlePause}>
                  {isPaused ? "Resume" : "Pause"}
                </Styled.Button>
                {isPaused && (
                  <Styled.Button onClick={handleStep}>Step</Styled.Button>
                )}
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
                </Styled.Button>{" "}
                <Styled.Button
                  disabled={isSimulationActive}
                  onClick={() => runSort(randomSortGenerator(elements))}
                >
                  Bogo Sort
                </Styled.Button>
              </Styled.ButtonGroup>
            </Styled.GroupParameters>
          </Styled.GroupsParametersContainer>
        </BurgerMenu>
      </Styled.SimulatorContainer>
    </>
  );
}
