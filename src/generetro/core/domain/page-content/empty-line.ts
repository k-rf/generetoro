import { DomainPrimitive } from "~/shared/domain-primitive";

export class EmptyLine extends DomainPrimitive<"", "EmptyLine"> {
  constructor() {
    super("");
  }

  protected validate(value: ""): "" {
    return value;
  }
}
