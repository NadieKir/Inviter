export type QueryParams = {
    [name: string]: string | number | string[] | number[] | null
}

export const buildQueryParams = (object?: QueryParams) => {
    const filtersQueryParams = object
        ? "?" + Object.entries(object).map(e => {
            if (!e[1]) {
                return null;
            }

            if (Array.isArray(e[1])) {
                return e[1].map((v, i) => `${e[0]}[${i}]=${v}`).join("&");
            }

            return `${e[0]}=${e[1]}`;
        }).filter(Boolean).join("&")
        : '';

    return filtersQueryParams;
}