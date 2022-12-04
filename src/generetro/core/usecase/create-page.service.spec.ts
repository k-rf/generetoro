import { Test, TestingModule } from "@nestjs/testing";

import { AppModule } from "~/app.module";
import { UsecaseError } from "~/error/usecase.error";
import { PageTemplateInMemoryRepository } from "~/generetro/infrastructure/page-template.in-memory.repository";
import { PageInMemoryRepository } from "~/generetro/infrastructure/page.in-memory.repository";
import { NotionService } from "~/lib/notion.service";
import { range } from "~/util/range";

import { Heading } from "../domain/page-content/heading";
import { PageContent } from "../domain/page-content/page-content";
import { PageTemplate } from "../domain/page-template/page-template";
import { PageTemplateId } from "../domain/page-template/page-template-id";
import { CreatePageInput } from "../port/incoming/create-page.input";
import { CreatePageUsecase } from "../port/incoming/create-page.usecase";
import { PageTemplateRepository } from "../port/repository/page-template.repository";
import { PageRepository } from "../port/repository/page.repository";

import { CreatePageService } from "./create-page.service";

describe("CreatePageService", () => {
  let app: TestingModule;
  let service: CreatePageService;
  let pageRepository: PageInMemoryRepository;
  let pageTemplateRepository: PageTemplateInMemoryRepository;

  let notionService: NotionService;

  beforeAll(async () => {
    // 初期化
    // -------------------------------------------------------------------------

    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = app.get(CreatePageUsecase);
    pageRepository = app.get(PageRepository);
    pageTemplateRepository = app.get(PageTemplateRepository);

    notionService = app.get(NotionService);

    await app.init();

    // データ準備
    // -------------------------------------------------------------------------

    const dailyId = notionService.get("NOTION_TEMPLATE_DAILY_ID");
    const weeklyId = notionService.get("NOTION_TEMPLATE_WEEKLY_ID");

    pageTemplateRepository.value.push(
      new PageTemplate({
        id: new PageTemplateId(dailyId),
        content: new PageContent([new Heading("Daily Template")]),
      }),
      new PageTemplate({
        id: new PageTemplateId(weeklyId),
        content: new PageContent([new Heading("Weekly Template")]),
      })
    );
  });

  describe("1 週間分のページを追加する（月曜日にだけ動作する）", () => {
    beforeAll(async () => {
      await Promise.all(
        [...range(1, 7)].map(async (e) => {
          const input = new CreatePageInput({
            today: new Date(2022, 4, e),
          });

          try {
            await service.handle(input);
          } catch (e) {
            expect(() => {
              throw e;
            }).toThrow(UsecaseError);
          }
        })
      );
    });

    it("日次 7 件、週次 1 件の合計 8 件のページが作成される", () => {
      expect(pageRepository.value.length).toStrictEqual(8);
    });

    it("日次ページのコンテンツは空である", () => {
      const dailies = pageRepository.value.filter((e) => e.valueOf("type").isDaily());

      dailies.forEach((e) => {
        expect(e.valueOf("content").isEmpty()).toStrictEqual(true);
      });
    });
  });
});
