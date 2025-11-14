export const ALGORITHMS = {
  bubble: "Bubble Sort",
  insertion: "Insertion Sort",
  selection: "Selection Sort",
  bogo: "Bogo Sort",
  merge: "Merge Sort",
};

export type AlgorithmSelection = keyof typeof ALGORITHMS;
