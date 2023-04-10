export const getOverlapPercent = (origin: string[], comparing: string[]) => {
    var processedOrigin = [...new Set(origin.map(s => s.toLowerCase()))];
    var processedComparing = [...new Set(comparing.map(s => s.toLowerCase()))];

    var processedOriginAmount = processedOrigin.length;
    var overlapsAmount = processedComparing.filter(v => processedOrigin.includes(v)).length;

    return (overlapsAmount / processedOriginAmount).toFixed(2);
}
