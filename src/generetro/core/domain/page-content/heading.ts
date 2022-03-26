import { z } from "zod";

import { DomainError } from "~/error/domain.error";
import { DomainPrimitive } from "~/shared/domain-primitive";

export class Heading extends DomainPrimitive<string, "Heading"> {
  protected validate(value: string): string {
    try {
      return z.string().nonempty().max(100).parse(value);
    } catch (e) {
      if (e instanceof z.ZodError) {
        throw new DomainError(e.issues[0].message);
      }

      throw e;
    }
  }
}
