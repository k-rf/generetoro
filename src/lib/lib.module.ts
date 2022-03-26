import { Global, Module } from "@nestjs/common";

import { EnvService } from "./env.service";
import { NotionService } from "./notion.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [EnvService, NotionService],
  exports: [EnvService, NotionService],
})
export class LibModule {}
