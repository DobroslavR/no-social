/* type ExcludeMethods<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
>; */

/* type ObjectDotNotation<O, R = void> = O extends string
  ? R extends string
    ? R
    : never
  : BreakDownObject<O, R>[keyof BreakDownObject<O, R>];

type BreakDownObject<O, R = void> = {
  [K in keyof O as string]: K extends string
    ? R extends string
      ? // Prefix with dot notation as well
        `${R}.${K}` | ObjectDotNotation<O[K], `${R}.${K}`>
      : K | ObjectDotNotation<O[K], K>
    : never;
}; */

/* type NestedPath<T> = ObjectDotNotation<ExcludeMethods<T>>; */

export type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

export type Path<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Path<T[K], Prev[D]>> : never;
    }[keyof T]
  : '';

export type NestedPath<T> = Path<T, 3>;

type Prev = [never, 0, 1, 2, 3, 4, 5, ...0[]];
