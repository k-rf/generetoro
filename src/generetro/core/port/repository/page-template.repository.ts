import { Injectable } from "@nestjs/common";

import { PageTemplate } from "../../domain/page-template/page-template";
import { PageTemplateId } from "../../domain/page-template/page-template-id";

@Injectable()
export abstract class PageTemplateRepository {
  abstract findById(id: PageTemplateId): Promise<PageTemplate>;
}
