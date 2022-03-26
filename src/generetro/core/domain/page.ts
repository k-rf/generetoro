import { DomainPrimitive } from "~/shared/domain-primitive";

import { PageContent } from "./page-content/page-content";
import { PageRelations } from "./page-relations";
import { PageTitle } from "./page-title/page-title";
import { RemindDate } from "./remind-date";
import { RetroType } from "./retro-type";

type Props = {
  title: PageTitle;
  remind: RemindDate;
  type: RetroType;
  content: PageContent;
  relations?: PageRelations;
};

export class Page extends DomainPrimitive<Props, "Page"> {
  protected validate(value: Props): Props {
    return value;
  }
}
