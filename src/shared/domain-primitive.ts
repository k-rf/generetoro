/* eslint-disable @typescript-eslint/no-explicit-any */

type Key<T> = T extends Record<string, DomainPrimitive<any>> ? keyof T : never;

export abstract class DomainPrimitive<
  T extends number | string | Date | DomainPrimitive<any> | Record<string, DomainPrimitive<any>>,
  U extends string = string
> {
  private domainPrimitiveBrand!: U;

  constructor(private readonly value: T) {
    this.value = this.validate(value);
  }

  protected abstract validate(value: T): T;

  valueOf(): T;
  valueOf<K extends Key<T>>(key: K): T[K];
  valueOf<K extends Key<T>>(key?: K) {
    if (key) {
      return this.value[key];
    } else {
      return this.value;
    }
  }

  equals(that: DomainPrimitive<T, U>): boolean {
    return JSON.stringify(this) === JSON.stringify(that);
  }
}
