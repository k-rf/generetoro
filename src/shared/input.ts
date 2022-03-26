type Primitive = number | string | Date;
type Props = Array<Primitive> | Record<string, Primitive>;

type Key<T> = T extends Record<string, Primitive> ? keyof T : never;
type Value<T> = T extends Record<string, Primitive> ? never : T;

export abstract class Input<T extends Props, U extends string = string> {
  private inputBrand!: U;

  constructor(private readonly value: T) {
    this.value = this.validate(value);
  }

  protected abstract validate(value: T): T;

  valueOf(): Value<T>;
  valueOf<K extends Key<T>>(key: K): T[K];
  valueOf<K extends Key<T>>(key?: K) {
    if (key) {
      return this.value[key];
    } else {
      return this.value;
    }
  }
}
