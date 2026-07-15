export function takeRandom<T>(items: T[]) {
  const index = Math.floor(Math.random() * items.length);
  return {
    item: items[index],
    rest: items.filter((_, itemIndex) => itemIndex !== index),
  };
}
