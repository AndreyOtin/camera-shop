const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/, ' ');

export { formatPrice };
