import { Injectable } from "@nestjs/common";

import { UsecaseError } from "~/error/usecase.error";
import { NotionService } from "~/lib/notion.service";
import { isMonday } from "~/util/is-monday";
import { range } from "~/util/range";

import { Page } from "../domain/page";
import { PageContent } from "../domain/page-content/page-content";
import { PageRelations } from "../domain/page-relations";
import { PageTemplateId } from "../domain/page-template/page-template-id";
import { PageTitle } from "../domain/page-title/page-title";
import { TitleEndDate } from "../domain/page-title/title-end-date";
import { TitleStartDate } from "../domain/page-title/title-start-date";
import { RemindDate } from "../domain/remind-date";
import { RetroType, RETRO_TYPE } from "../domain/retro-type";
import { CreatePageInput } from "../port/incoming/create-page.input";
import { CreatePageUsecase } from "../port/incoming/create-page.usecase";
import { PageTemplateRepository } from "../port/repository/page-template.repository";
import { PageRepository } from "../port/repository/page.repository";

@Injectable()
export class CreatePageService implements CreatePageUsecase {
  constructor(
    private notionService: NotionService,
    private pageRepository: PageRepository,
    private pageTemplateRepository: PageTemplateRepository
  ) {}

  async handle(input: CreatePageInput) {
    if (!isMonday(input.valueOf("today"))) {
      throw new UsecaseError("月曜日ではありません");
    }

    const weeklyTemplate = await this.pageTemplateRepository.findById(
      new PageTemplateId(this.notionService.get("NOTION_TEMPLATE_WEEKLY_ID"))
    );

    const monday = new Date(input.valueOf("today"));
    monday.setHours(23, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const dailyPages = [...range(0, 7)].map((diff) => {
      const date = new Date(monday);
      date.setDate(date.getDate() + diff);

      return new Page({
        content: new PageContent([]), // REF: ADR 2.
        remind: new RemindDate(date),
        title: new PageTitle({ start: new TitleStartDate(date) }),
        type: new RetroType(RETRO_TYPE.Daily),
      });
    });

    const pageIds = await Promise.all(
      dailyPages.map(async (page) => {
        return await this.pageRepository.create(page);
      })
    );

    const weeklyPage = new Page({
      content: weeklyTemplate.valueOf("content"),
      remind: new RemindDate(sunday),
      title: new PageTitle({ start: new TitleStartDate(monday), end: new TitleEndDate(sunday) }),
      type: new RetroType(RETRO_TYPE.Weekly),
      relations: new PageRelations(pageIds),
    });

    await this.pageRepository.create(weeklyPage);
  }
}
