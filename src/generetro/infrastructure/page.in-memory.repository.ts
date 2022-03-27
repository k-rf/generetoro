import { Injectable } from "@nestjs/common";

import { Page } from "../core/domain/page";
import { PageId } from "../core/domain/page-id";
import { PageRepository } from "../core/port/repository/page.repository";

@Injectable()
export class PageInMemoryRepository implements PageRepository {
  value: Page[];

  constructor() {
    this.value = [];
  }

  async create(value: Page): Promise<PageId> {
    this.value.push(value);

    return new PageId();
  }
}
