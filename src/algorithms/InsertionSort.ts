export function insertionSort(elements: number[]): number[] {
  const sortedElements = [...elements];
  for (let i = 1; i < sortedElements.length; i++) {
    const key = sortedElements[i];
    let j = i - 1;

    while (j >= 0 && sortedElements[j] > key) {
      sortedElements[j + 1] = sortedElements[j];
      j--;
    }
    sortedElements[j + 1] = key;
  }
  return sortedElements;
}
