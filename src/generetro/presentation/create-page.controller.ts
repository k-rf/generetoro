import { Controller, Post } from "@nestjs/common";

import { CreatePageInput } from "../core/port/incoming/create-page.input";
import { CreatePageUsecase } from "../core/port/incoming/create-page.usecase";
import { PageRepository } from "../core/port/repository/page.repository";

@Controller()
export class CreatePageController {
  constructor(private service: CreatePageUsecase, private repository: PageRepository) {}

  @Post()
  async handle() {
    const today = new Date();
    today.setDate(today.getDate() + 1);

    const input = new CreatePageInput({ today });

    await this.service.handle(input);
  }
}
