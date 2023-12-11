export const filters = ["all", "checked", "unchecked", "removed"] as const;
export type Filter = (typeof filters)[number];
