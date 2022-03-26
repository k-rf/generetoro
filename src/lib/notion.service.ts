import { Injectable } from "@nestjs/common";
import { Client as NotionClient } from "@notionhq/client";

import { EnvService } from "./env.service";

@Injectable()
export class NotionService {
  constructor(private envService: EnvService) {}

  getClient() {
    return new NotionClient({ auth: this.envService.get("NOTION_KEY") });
  }

  getDatabaseId() {
    return this.envService.get("NOTION_DATABASE_ID");
  }
}
