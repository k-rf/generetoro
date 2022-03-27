import { Entity } from "~/shared/entity";

import { PageContent } from "../page-content/page-content";

import { PageTemplateId } from "./page-template-id";

type Props = {
  id: PageTemplateId;
  content: PageContent;
};

export class PageTemplate extends Entity<Props, "PageTemplate"> {
  protected validate(value: Props): Props {
    return value;
  }
}
