import { Global, Module } from "@nestjs/common";

import { EnvService } from "./env.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [EnvService],
  exports: [EnvService],
})
export class LibModule {}
