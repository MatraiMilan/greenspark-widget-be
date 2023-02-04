import { Module } from '@nestjs/common';
import { WidgetService } from "./service/widget.service";
import { InMemoryWidgetRepository } from "./repository/in-memory-widget-repository";
import { WidgetController } from "./controller/widget.controller";
import configuration from "./config/configuration";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
  ],
  controllers: [WidgetController],
  providers: [WidgetService, InMemoryWidgetRepository],
})
export class AppModule {}
