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
  yield { array: [...sortedElements], active: [] };

  for (let i = 0; i < sortedElements.length; i++) {
    let minIndex = i;
    yield { array: [...sortedElements], active: [i] };
    for (let j = i + 1; j < sortedElements.length; j++) {
      yield { array: [...sortedElements], active: [minIndex, j] };

      if (sortedElements[j] < sortedElements[minIndex]) {
        minIndex = j;
        yield { array: [...sortedElements], active: [minIndex] };
      }
    }

    if (minIndex !== i) {
      [sortedElements[i], sortedElements[minIndex]] = [
        sortedElements[minIndex],
        sortedElements[i],
      ];
      yield { array: [...sortedElements], active: [i, minIndex] };
    }
  }
}
