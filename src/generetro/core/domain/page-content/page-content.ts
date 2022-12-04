import { DomainPrimitive } from "~/shared/domain-primitive";

import { EmptyLine } from "./empty-line";
import { Heading } from "./heading";

type Props = Array<Heading | EmptyLine>;

export class PageContent extends DomainPrimitive<Props, "PageContent"> {
  protected validate(value: Props): Props {
    return value;
  }

  isEmpty() {
    return this.valueOf().length === 0;
  }
}
