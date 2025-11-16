export const ALGORITHMS = {
  bubble: "Bubble Sort",
  insertion: "Insertion Sort",
  selection: "Selection Sort",
  bogo: "Bogo Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
};

export type AlgorithmSelection = keyof typeof ALGORITHMS;
