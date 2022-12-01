import { DomainPrimitive } from "~/shared/domain-primitive";

import { EmptyLine } from "./empty-line";
import { Heading } from "./heading";

// TODO: テーブルを参照できるようにする
type Props = Array<Heading | EmptyLine>;

export class PageContent extends DomainPrimitive<Props, "PageContent"> {
  protected validate(value: Props): Props {
    return value;
  }
}
