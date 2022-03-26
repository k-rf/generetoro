import { DomainPrimitive } from "~/shared/domain-primitive";

export const RETRO_TYPE = {
  Daily: "Daily",
  Weekly: "Weekly",
} as const;

type TRetroType = typeof RETRO_TYPE[keyof typeof RETRO_TYPE];

export class RetroType extends DomainPrimitive<TRetroType, "RetroType"> {
  protected validate(value: TRetroType): TRetroType {
    return value;
  }
}
