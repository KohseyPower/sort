export function* randomSortGenerator(elements: number[]) {
  const sortedElements = [...elements];

  let isSorted = false;
  const sortedElementsExemple = sortedElements.sort((a, b) => {
    return a - b;
  });

  while (!isSorted) {
    const i = Math.floor(Math.random() * sortedElements.length);

    let j;
    do {
      j = Math.floor(Math.random() * sortedElements.length);
    } while (i === j);

    [sortedElements[i], sortedElements[j]] = [
      sortedElements[j],
      sortedElements[i],
    ];

    yield { array: [...sortedElements], active: [i, j] };

    for (let i = 0; i < sortedElements.length; i++) {
      if (sortedElements[i] !== sortedElementsExemple[i]) break;
      if (i === sortedElements.length - 1) isSorted = true;
    }
  }
}
