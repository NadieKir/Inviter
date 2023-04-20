export const getOverlapPercent = (origin: string[], comparing: string[]) => {
    let processedOrigin = [...new Set(origin.map(s => s.toLowerCase()))];
    let processedComparing = [...new Set(comparing.map(s => s.toLowerCase()))];
    let processedOriginAmount = processedOrigin.length;
    let overlapsAmount = processedComparing.filter(v => processedOrigin.includes(v)).length;

    return Math.round((overlapsAmount / processedOriginAmount * 100)) + '%';
}
