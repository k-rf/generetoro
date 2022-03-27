import { Injectable } from "@nestjs/common";

import { InfrastructureError } from "~/error/infrastructure.error";

import { PageTemplate } from "../core/domain/page-template/page-template";
import { PageTemplateId } from "../core/domain/page-template/page-template-id";
import { PageTemplateRepository } from "../core/port/repository/page-template.repository";

@Injectable()
export class PageTemplateInMemoryRepository implements PageTemplateRepository {
  value: PageTemplate[];

  constructor() {
    this.value = [];
  }

  async findById(id: PageTemplateId): Promise<PageTemplate> {
    const result = this.value.find((e) => e.valueOf("id").equals(id));

    if (result) {
      return result;
    }

    throw new InfrastructureError("Not Found");
  }
}
