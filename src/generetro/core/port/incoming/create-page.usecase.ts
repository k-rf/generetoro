import { Injectable } from "@nestjs/common";

import { CreatePageInput } from "./create-page.input";

@Injectable()
export abstract class CreatePageUsecase {
  abstract handle(input: CreatePageInput): Promise<void>;
}
