import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";

import { AllExceptionsFilter } from "./filter/exception.filter";
import { GeneretroModule } from "./generetro/generetro.module";
import { validate } from "./lib/env.validation";
import { LibModule } from "./lib/lib.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local"],
      validate,
    }),
    GeneretroModule,
    LibModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
