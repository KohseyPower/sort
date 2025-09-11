export function bubbleSort(elements: number[]): number[] {
  const sortedElements = [...elements];
  for (let i = sortedElements.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (sortedElements[j] > sortedElements[j + 1]) {
        const temp = sortedElements[j];
        sortedElements[j] = sortedElements[j + 1];
        sortedElements[j + 1] = temp;
      }
    }
  }
  return sortedElements;
}
