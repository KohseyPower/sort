import { useState, useMemo, useRef } from "react";
import * as Styled from "./Simulator.styled";
import {
  bubbleSortGenerator,
  insertionSortGenerator,
  selectionSortGenerator,
} from "./algorithms";
import { shuffleElements } from "./utils";
import BurgerMenu from "./UI/BurgerMenu/BurgerMenu";

export default function Simulator() {
  const [totalElements, setTotalElements] = useState(10);
  const [elements, setElements] = useState<number[]>(() => shuffleElements(10));
  const [pendingElements, setPendingElements] = useState(totalElements);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [sortSpeed, setSortSpeed] = useState(200);
  const [isPaused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  const sortSpeedRef = useRef(sortSpeed);
  const stepsRef = useRef<Generator<{
    array: number[];
    active: number[];
  }> | null>(null);
  const currentRunStepRef = useRef<() => void>(() => {});
  const timeoutRef = useRef<number | null>(null);

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
      if (pausedRef.current) return;
      const nextStep = stepsRef.current?.next();
      if (!nextStep || nextStep.done) {
        setIsSimulationActive(false);
        setActiveIndices([]);
        return;
      }
      setElements(nextStep.value.array);
      setActiveIndices(nextStep.value.active);
      timeoutRef.current = setTimeout(runStep, sortSpeedRef.current);
    };

    currentRunStepRef.current = runStep;
    runStep();
  };

  const handleStop = () => {
    if (!isSimulationActive) {
      alert("There is no simulation running.");
      return;
    }
    if (!isPaused) {
      alert("The simulation is paused.");
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    stepsRef.current = null;
    setIsSimulationActive(false);
    setActiveIndices([]);
  };

  const handlePause = () => {
    setIsSimulationActive(false);
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    if (!pausedRef.current) {
      currentRunStepRef.current();
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
                max={75}
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
                <Styled.Button
                  onClick={() => {
                    setIsSimulationActive(!isSimulationActive);
                    setElements(shuffleElements(pendingElements));
                  }}
                >
                  Reset
                </Styled.Button>
                <Styled.Button onClick={handleStop}>Stop</Styled.Button>
                <Styled.Button onClick={handlePause}>
                  {isPaused ? "Resume" : "Pause"}
                </Styled.Button>
                <Styled.Button>Step</Styled.Button>
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
