export const getProductPrice = (initialPrice: number, volume: number) => {
    if (volume === 300) {
        return initialPrice * 1.5;
    }

    if (volume === 400) {
        return initialPrice * 2;
    }

    return initialPrice;
}