const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/, ' ');

const makeFirstLetterUpCase = (word: string) => word[0].toUpperCase() + word.slice(1);

export { formatPrice, makeFirstLetterUpCase };
