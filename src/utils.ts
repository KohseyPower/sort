export function shuffleElements(numElements: number) {
  return Array.from(
    { length: numElements },
    () => Math.floor(Math.random() * numElements) + 1
  );
}
