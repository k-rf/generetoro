import { Injectable } from "@nestjs/common";

import { Page } from "../../domain/page";
import { PageId } from "../../domain/page-id";

@Injectable()
export abstract class PageRepository {
  abstract create(value: Page): Promise<PageId>;
}
