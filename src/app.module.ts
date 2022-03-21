import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CreatePageController } from "./generetro/presentation/create-page.controller";
import { validate } from "./lib/env.validation";
import { LibModule } from "./lib/lib.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local"],
      ignoreEnvVars: true,
      validate,
    }),
    LibModule,
  ],
  controllers: [CreatePageController],
  providers: [],
})
export class AppModule {}
