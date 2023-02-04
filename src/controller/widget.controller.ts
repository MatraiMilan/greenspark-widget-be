import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { WidgetService } from "../service/widget.service";
import { UpdateWidgetActiveDto, UpdateWidgetColorDto, UpdateWidgetLinkedDto } from "../model/widget";
import { WidgetNotFoundError } from "../error/widget-not-found.error";

@Controller('widgets')
export class WidgetController {
    constructor(private readonly widgetService: WidgetService) {
    }

    @Get()
    public getAllWidget() {
        return this.widgetService.findAllWidget();
    }

    @Put(':id/active')
    public updateWidgetActive(@Param('id', ParseIntPipe) id: number,
                              @Body() { active }: UpdateWidgetActiveDto,
                              @Res() response: Response
    ): void {
        try {
            this.widgetService.updateWidgetActive(id, active);
            response.status(HttpStatus.OK).send();
        } catch (error) {
            WidgetController.handleError(error, response);
        }
    }

    @Put(':id/color')
    public updateWidgetColor(@Param('id', ParseIntPipe) id: number,
                             @Body() { selectedColor }: UpdateWidgetColorDto,
                             @Res() response: Response
    ): void {
        try {
            this.widgetService.updateWidgetColor(id, selectedColor);
            response.status(HttpStatus.OK).send();
        } catch (error) {
            WidgetController.handleError(error, response);
        }
    }

    @Put(':id/linked')
    public updateWidgetLinked(@Param('id', ParseIntPipe) id: number,
                              @Body() { linked }: UpdateWidgetLinkedDto,
                              @Res() response: Response
    ): void {
        try {
            this.widgetService.updateWidgetLinked(id, linked);
            response.status(HttpStatus.OK).send();
        } catch (error) {
            WidgetController.handleError(error, response);
        }
    }

    private static handleError(error: any, response: Response) {
        if (error instanceof WidgetNotFoundError) {
            response.status(HttpStatus.NOT_FOUND).send(error.message);
        } else {
            throw error;
        }
    }
}