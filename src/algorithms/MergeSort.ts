export function* MergeSortGenerator(
  array: number[],
  startIndex = 0
): Generator<{ array: number[]; active: number[] }> {
  const items = [...array];

  // Base case
  if (items.length < 2) {
    yield { array: [...items], active: [startIndex] };
    return;
  }

  const middleIndex = Math.floor(items.length / 2);
  const leftPart = items.slice(0, middleIndex);
  const rightPart = items.slice(middleIndex);

  // Recursion on left half
  let sortedLeft = leftPart;
  for (const step of MergeSortGenerator(leftPart, startIndex)) {
    yield {
      array: [...step.array, ...items.slice(middleIndex)],
      active: step.active,
    };
    sortedLeft = step.array;
  }

  // Recursion on right half
  let sortedRight = rightPart;
  for (const step of MergeSortGenerator(rightPart, startIndex + middleIndex)) {
    yield {
      array: [...sortedLeft, ...step.array],
      active: step.active,
    };
    sortedRight = step.array;
  }

  // Merge phase
  const merged: number[] = [];
  while (sortedLeft.length && sortedRight.length) {
    if (sortedLeft[0] < sortedRight[0]) {
      merged.push(sortedLeft.shift()!);
    } else {
      merged.push(sortedRight.shift()!);
    }

    yield {
      array: [...merged, ...sortedLeft, ...sortedRight],
      active: [startIndex],
    };
  }

  // Final merged state
  yield {
    array: [...merged, ...sortedLeft, ...sortedRight],
    active: [startIndex],
  };
}
