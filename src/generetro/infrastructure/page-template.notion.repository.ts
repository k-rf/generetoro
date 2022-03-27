import { Injectable } from "@nestjs/common";

import { NotionService } from "~/lib/notion.service";

import { EmptyLine } from "../core/domain/page-content/empty-line";
import { Heading } from "../core/domain/page-content/heading";
import { PageContent } from "../core/domain/page-content/page-content";
import { PageTemplate } from "../core/domain/page-template/page-template";
import { PageTemplateId } from "../core/domain/page-template/page-template-id";
import { PageTemplateRepository } from "../core/port/repository/page-template.repository";

@Injectable()
export class PageTemplateNotionRepository implements PageTemplateRepository {
  constructor(private notionService: NotionService) {}

  async findById(id: PageTemplateId): Promise<PageTemplate> {
    const result = await this.notionService.getClient().blocks.children.list({
      block_id: id.valueOf(),
    });

    const content = new PageContent(
      result.results.map((e) => {
        const block = Object(e);

        if (block.type === "heading_3") {
          return new Heading(block.heading_3.rich_text[0].plain_text);
        } else {
          return new EmptyLine();
        }
      })
    );

    return new PageTemplate({
      content,
      id,
    });
  }
}
