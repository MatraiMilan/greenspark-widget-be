import { Injectable } from "@nestjs/common";
import { Widget } from "../model/widget";
import { InMemoryWidgets } from "./data/in-memory-widgets";

@Injectable()
export class InMemoryWidgetRepository {
    private readonly widgets: Widget[];

    constructor() {
        this.widgets = [...InMemoryWidgets]
    }

    public findAll(): Widget[] {
        return this.widgets;
    }

    public findById(id: number): Widget | undefined {
        return this.widgets.find(widget => widget.id === id);
    }

    public save(widget: Widget): void {
        const storedIndex = this.widgets.findIndex(w => w.id === widget.id);
        if (storedIndex === -1) {
            throw new Error(`There is no widget to update with id ${widget.id}`)
        } else {
            this.widgets.splice(storedIndex, 1, widget);
        }
    }
}