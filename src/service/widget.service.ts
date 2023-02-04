import { Injectable } from "@nestjs/common";
import { InMemoryWidgetRepository } from "../repository/in-memory-widget-repository";
import { Widget, WidgetColorType } from "../model/widget";
import { WidgetNotFoundError } from "../error/widget-not-found.error";

@Injectable()
export class WidgetService {
    constructor(private readonly widgetRepository: InMemoryWidgetRepository) {
    }

    public findAllWidget(): Widget[] {
        return this.widgetRepository.findAll();
    }

    public updateWidgetLinked(id: number, linked: boolean): void {
        const widget = this.widgetRepository.findById(id);
        WidgetService.validateWidget(id, widget);
        this.widgetRepository.save({ ...widget, linked });
    }

    public updateWidgetColor(id: number, selectedColor: WidgetColorType): void {
        const widget = this.widgetRepository.findById(id);
        WidgetService.validateWidget(id, widget);
        this.widgetRepository.save({ ...widget, selectedColor });
    }

    public updateWidgetActive(id: number, active: boolean): void {
        const widget = this.widgetRepository.findById(id);
        WidgetService.validateWidget(id, widget);
        this.widgetRepository.save({ ...widget, active });
    }

    private static validateWidget(id: number, widget: Widget | undefined): void {
        if (!widget) {
            throw new WidgetNotFoundError(id);
        }
    }
}
