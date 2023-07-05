const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/, ' ');

const makeFirstLetterUpCase = (word: string) => word[0].toUpperCase() + word.slice(1);

const formatLastLetter = (value: number, words: string[]) => {
  const tens = Math.abs(value) % 100;
  const num = value % 10;

  if (tens > 10 && tens < 20) {
    return words[2];
  }
  if (num > 1 && num < 5) {
    return words[1];
  }
  if (num === 1) {
    return words[0];
  }
  return words[2];
};

export { formatPrice, makeFirstLetterUpCase, formatLastLetter };
