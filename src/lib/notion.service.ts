import { Injectable } from "@nestjs/common";
import { Client as NotionClient } from "@notionhq/client";

import { EnvService } from "./env.service";
import { EnvironmentVariables } from "./env.validation";

@Injectable()
export class NotionService {
  constructor(private envService: EnvService) {}

  getClient() {
    return new NotionClient({ auth: this.envService.get("NOTION_KEY") });
  }

  get(key: keyof Omit<EnvironmentVariables, "NOTION_KEY">) {
    return this.envService.get(key);
  }
}
