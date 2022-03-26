import { DomainPrimitive } from "~/shared/domain-primitive";

import { TitleEndDate } from "./title-end-date";
import { TitleStartDate } from "./title-start-date";

type Props = {
  start: TitleStartDate;
  end?: TitleEndDate;
};

export class PageTitle extends DomainPrimitive<Props, "PageTitle"> {
  protected validate(value: Props): Props {
    return value;
  }
}
