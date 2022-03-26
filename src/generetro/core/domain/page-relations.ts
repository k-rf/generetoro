import { DomainPrimitive } from "~/shared/domain-primitive";

import { PageId } from "./page-id";

export class PageRelations extends DomainPrimitive<Array<PageId>, "PageRelations"> {
  protected validate(value: Array<PageId>): Array<PageId> {
    return value;
  }
}
