import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvironmentVariables } from "./env.validation";

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  get(key: keyof EnvironmentVariables) {
    return this.configService.get(key);
  }
}
