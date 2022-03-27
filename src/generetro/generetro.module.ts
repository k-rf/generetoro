import { Module } from "@nestjs/common";

import { CreatePageUsecase } from "./core/port/incoming/create-page.usecase";
import { PageTemplateRepository } from "./core/port/repository/page-template.repository";
import { PageRepository } from "./core/port/repository/page.repository";
import { CreatePageService } from "./core/usecase/create-page.service";
import { PageTemplateInMemoryRepository } from "./infrastructure/page-template.in-memory.repository";
import { PageTemplateNotionRepository } from "./infrastructure/page-template.notion.repository";
import { PageInMemoryRepository } from "./infrastructure/page.in-memory.repository";
import { PageNotionRepository } from "./infrastructure/page.notion.repository";
import { CreatePageController } from "./presentation/create-page.controller";

const commonProviders = [{ provide: CreatePageUsecase, useClass: CreatePageService }];

const prodProviders = [
  { provide: PageRepository, useClass: PageNotionRepository },
  { provide: PageTemplateRepository, useClass: PageTemplateNotionRepository },
];

const testProviders = [
  { provide: PageRepository, useClass: PageInMemoryRepository },
  { provide: PageTemplateRepository, useClass: PageTemplateInMemoryRepository },
];

@Module({
  imports: [],
  controllers: [CreatePageController],
  providers: [
    ...(process.env.NODE_ENV === "test" ? testProviders : prodProviders),
    ...commonProviders,
  ],
  exports: [],
})
export class GeneretroModule {}
