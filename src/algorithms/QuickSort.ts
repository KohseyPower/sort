type Step = {
  array: number[];
  active: number[]; // indices being compared / swapped or the pivot
  done?: boolean;
};

export function* quickSortGenerator(
  elements: number[]
): Generator<Step, void, unknown> {
  const items = [...elements];

  // initial state
  yield { array: [...items], active: [] };

  function* partition(
    left: number,
    right: number
  ): Generator<Step, number, unknown> {
    const pivot = items[right];
    let i = left;

    // mark pivot
    yield { array: [...items], active: [right] };

    for (let j = left; j < right; j++) {
      // show comparison j vs pivot
      yield { array: [...items], active: [j, right, i] };

      if (items[j] < pivot) {
        [items[i], items[j]] = [items[j], items[i]];
        // show swap
        yield { array: [...items], active: [i, j, right] };
        i++;
      }
    }

    // place pivot in its final position
    [items[i], items[right]] = [items[right], items[i]];
    yield { array: [...items], active: [i] };

    return i;
  }
  function* quicksort(
    left: number,
    right: number
  ): Generator<Step, void, unknown> {
    if (left >= right) return;
    const pivotIndex = yield* partition(left, right);
    // pivot fixed
    yield { array: [...items], active: [pivotIndex] };
    yield* quicksort(left, pivotIndex - 1);
    yield* quicksort(pivotIndex + 1, right);
  }

  if (items.length > 0) yield* quicksort(0, items.length - 1);

  // final state
  yield { array: [...items], active: [], done: true };
}
