import { z } from "zod";

import { DomainError } from "~/error/domain.error";
import { DomainPrimitive } from "~/shared/domain-primitive";

export class TitleEndDate extends DomainPrimitive<Date, "TitleEndDate"> {
  protected validate(value: Date): Date {
    try {
      return z.date().parse(value);
    } catch (e) {
      if (e instanceof z.ZodError) {
        throw new DomainError(e.issues[0].message);
      }

      throw e;
    }
  }
}
