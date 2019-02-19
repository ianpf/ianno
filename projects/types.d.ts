/**
 * Pick only the properties from a given type with a given key
 * @T The source type
 * @Keys The keys to be included (`'key1' | 'key2'`)
 */
type PickByKeys<T, K extends keyof T> =  Pick<T, Extract<keyof T, K>>;

/**
 * Pick only keys whose properties match the given type  (works with union types)
 * @T The source type
 * @Keys The keys to be included (`'key1' | 'key2'`)
 */
type PickKeysByType<T, PickedType extends T[keyof T]> = {
  [Q in keyof T]: T[Q] extends PickedType ? Q : never
}[keyof T];

/**
 * Pick only properties which match the given type  (works with union types)
 * @T The source type
 * @Keys The keys to be included (`'key1' | 'key2'`)
 */
type PickByType<T, PickedType extends T[keyof T]> = {
  [P in PickKeysByType<T, PickedType>]: T[P] extends PickedType ? T[P] : never;
};

/**
 * Omit all properties with a given name from the supplied type
 * @T The source type
 * @Keys The keys to be omitted (`'key1' | 'key2'`)
 */
type OmitByKeys<T, Keys extends keyof T> = Pick<T, Exclude<keyof T, Keys>>;

/**
 * Omit all keys for properties which are assignable to the given type (works with union types)
 * @T The source type
 * @OmittedType The property type to be omitted from the keys (`string`)
 */
type OmitKeysByType<T, OmittedType extends T[keyof T]> = {
  [Q in keyof T]: T[Q] extends OmittedType ? never : Q
}[keyof T];

/**
 * Omit all properties which are assignable to the given type (works with union types)
 * @T The source type
 * @OmittedType The property type to be omitted from the object (`string`)
 */
type OmitByType<T, OmittedType extends T[keyof T]> = {
  [P in OmitKeysByType<T, OmittedType>]: T[P] extends OmittedType ? never : T[P];
};

/**
 * One or more of a type
 * @T The type
 */
type Many<T> = T | Array<T>;
