export type EnumMember<TEnum extends { [enumKey: string]: string | number }> =
    TEnum extends { [enumKey in keyof TEnum]: infer TEnumMember }
    ? TEnumMember
    : never;

export const getEnumMembers = <TEnum extends { [enumKey: string]: string | number }>(
    enumeration: TEnum,
): EnumMember<TEnum>[] => Object.values(enumeration) as EnumMember<TEnum>[];
