export const getNthMaskSymbolPosition = (mask: string, symbol: string, n: number) => {
    let counter = 0;

    for (let i = 0; i < mask.length; i++) {
        if (counter === n) {
            return i;
        }

        if (mask[i] === symbol) {
            counter++;
        }
    }

    return undefined;
};

export const maskString = (string: string, mask: string) => {
    let i = 0;
    const lastMaskSymbolIndexToTake = getNthMaskSymbolPosition(mask, "X", string.length);
    const trimmedMask = mask.substring(0, lastMaskSymbolIndexToTake);

    return trimmedMask.replace(/X/g, () => string[i++] || '');
};