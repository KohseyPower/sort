export function selectionSort(elements: number[]): number[] {
  const sortedElements = [...elements];
  for (let i = 0; i < sortedElements.length; i++) {
    let minIndex = i;
    for (let j = i; j < sortedElements.length; j++) {
      if (sortedElements[j] < sortedElements[minIndex]) {
        minIndex = j;
      }
    }
    [sortedElements[i], sortedElements[minIndex]] = [
      sortedElements[minIndex],
      sortedElements[i],
    ];
  }
  return sortedElements;
}

export function* selectionSortGenerator(elements: number[]) {
  const sortedElements = [...elements];
  yield sortedElements;
  for (let i = 0; i < sortedElements.length; i++) {
    let minIndex = i;
    for (let j = i; j < sortedElements.length; j++) {
      if (sortedElements[j] < sortedElements[minIndex]) {
        minIndex = j;
      }
    }
    [sortedElements[i], sortedElements[minIndex]] = [
      sortedElements[minIndex],
      sortedElements[i],
    ];
    yield sortedElements;
  }
}
