import { useState, useMemo, useRef, useEffect } from "react";
import * as Styled from "./Simulator.styled";
import {
  bubbleSortGenerator,
  insertionSortGenerator,
  MergeSortGenerator,
  selectionSortGenerator,
} from "./algorithms";
import { shuffleElements } from "./utils";
import BurgerMenu from "./UI/BurgerMenu/BurgerMenu";
import { randomSortGenerator } from "./algorithms/RandomSort";
import Slider from "./UI/Slider/Slider";
import {
  ALGORITHMS,
  type AlgorithmSelection,
} from "./utils/AlgorithmSelection";

export default function Simulator() {
  const [elementCount, setElementCount] = useState(10);
  const [elements, setElements] = useState<number[]>(() => shuffleElements(10));
  const [nextElementCount, setNextElementCount] = useState(elementCount);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [stepDelay, setStepDelay] = useState(200);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmSelection>("bubble");

  const pausedRef = useRef(false);
  const stepDelayRef = useRef(stepDelay);
  const stepsRef = useRef<Generator<{
    array: number[];
    active: number[];
  }> | null>(null);
  const currentRunStepRef = useRef<() => void>(() => {});
  const timeoutRef = useRef<number | null>(null);

  const maxValue = useMemo(() => Math.max(...elements, 1), [elements]);

  stepDelayRef.current = stepDelay;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setElementCount(nextElementCount);
      setElements(shuffleElements(nextElementCount));
    }, 300);

    return () => clearTimeout(timeout);
  }, [nextElementCount]);

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
      timeoutRef.current = window.setTimeout(runStep, stepDelayRef.current);
    };

    currentRunStepRef.current = runStep;
    runStep();
  };

  const handlePlay = () => {
    if (isSimulationActive) return;

    let generator;
    switch (selectedAlgorithm) {
      case "bubble":
        generator = bubbleSortGenerator(elements);
        break;
      case "insertion":
        generator = insertionSortGenerator(elements);
        break;
      case "selection":
        generator = selectionSortGenerator(elements);
        break;
      case "bogo":
        generator = randomSortGenerator(elements);
        break;
      case "merge":
        generator = MergeSortGenerator(elements);
        break;
      default:
        alert("Please select a valid algorithm.");
        return;
    }

    runSort(generator);
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
    setElements(shuffleElements(nextElementCount));
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
        <Styled.Canvas $cols={elementCount}>
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
            <Slider
              type="countSlider"
              label="Number of elements"
              value={nextElementCount}
              min={5}
              max={100}
              disabled={isSimulationActive}
              onChange={(elementCount) => setNextElementCount(elementCount)}
            />
            <Slider
              type="speedSlider"
              label="Speed"
              value={stepDelay}
              max={1000}
              onChange={(newSpeed) => setStepDelay(newSpeed)}
            />
          </Styled.SlidersContainer>
          <Styled.GroupsParametersContainer>
            <Styled.GroupParameters>
              <h3>Simulation controls</h3>
              <Styled.ButtonGroup>
                <Styled.Button onClick={handleReset}>Shuffle</Styled.Button>
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
              <h3>Sorting algorithms</h3>
              <Styled.ButtonGroup>
                <label htmlFor="algorithmSelect">Choose an algorithm:</label>
                <select
                  id="algorithmSelect"
                  value={selectedAlgorithm}
                  disabled={isSimulationActive}
                  onChange={(e) =>
                    setSelectedAlgorithm(e.target.value as AlgorithmSelection)
                  }
                >
                  {Object.entries(ALGORITHMS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>

                <Styled.Button
                  disabled={isSimulationActive}
                  onClick={handlePlay}
                >
                  Play
                </Styled.Button>
              </Styled.ButtonGroup>
            </Styled.GroupParameters>
          </Styled.GroupsParametersContainer>
        </BurgerMenu>
      </Styled.SimulatorContainer>
    </>
  );
}
