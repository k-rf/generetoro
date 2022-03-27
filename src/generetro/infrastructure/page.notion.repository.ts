import { Injectable } from "@nestjs/common";

import { NotionService } from "~/lib/notion.service";

import { Page } from "../core/domain/page";
import { Heading } from "../core/domain/page-content/heading";
import { PageId } from "../core/domain/page-id";
import { PageRepository } from "../core/port/repository/page.repository";

@Injectable()
export class PageNotionRepository implements PageRepository {
  constructor(private notionService: NotionService) {}

  async create(value: Page): Promise<PageId> {
    const result = await this.notionService.getClient().pages.create({
      parent: { database_id: this.notionService.get("NOTION_DATABASE_ID") },
      properties: {
        title: {
          title: [
            {
              mention: {
                date: {
                  start: value
                    .valueOf("title")
                    .valueOf("start")
                    .valueOf()
                    .toISOString()
                    .split("T")[0],
                  end: value.valueOf("title").valueOf("end")?.valueOf().toISOString().split("T")[0],
                },
              },
            },
          ],
        },
        [this.notionService.get("NOTION_REMIND_COLUMN")]: {
          date: { start: value.valueOf("remind").valueOf().toISOString(), time_zone: "Asia/Tokyo" },
        },
        [this.notionService.get("NOTION_TAG_COLUMN")]: {
          select: {
            name:
              value.valueOf("type").valueOf() === "Daily"
                ? this.notionService.get("NOTION_TAG_DAILY")
                : this.notionService.get("NOTION_TAG_WEEKLY"),
          },
        },
        [this.notionService.get("NOTION_ELEMENT_COLUMN")]: {
          relation:
            value
              .valueOf("relations")
              ?.valueOf()
              .map((e) => ({ id: e.valueOf() })) ?? [],
        },
      },
      children: value
        .valueOf("content")
        .valueOf()
        .map((e) => {
          const content = { rich_text: [{ text: { content: e.valueOf() } }] };

          if (e instanceof Heading) {
            return { heading_3: content };
          } else {
            return { paragraph: content };
          }
        }),
    });

    return new PageId(result.id);
  }
}
