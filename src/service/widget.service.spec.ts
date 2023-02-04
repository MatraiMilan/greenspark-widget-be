import { WidgetService } from "./widget.service";
import { InMemoryWidgetRepository } from "../repository/in-memory-widget-repository";
import { getTestWidgets } from "../util/test-data";

describe('WidgetService', () => {
    let widgetService: WidgetService;
    let widgetRepository: InMemoryWidgetRepository;
    let widgets

    beforeEach(() => {
        widgetRepository = new InMemoryWidgetRepository();
        widgetService = new WidgetService(widgetRepository);
        widgets = getTestWidgets();

        jest.spyOn(widgetRepository, 'save');
    });

    describe('findAllWidget', () => {
        it('should return all widgets from the repository', () => {
            jest.spyOn(widgetRepository, 'findAll').mockReturnValue(widgets);

            expect(widgetService.findAllWidget()).toEqual(widgets);
            expect(widgetRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('updateWidgetLinked', () => {
        it('should save the updated widget with the new linked value through the repository', () => {
            const widget = widgets[0];
            const newLinkedValue = !widget.linked;
            jest.spyOn(widgetRepository, 'findById').mockReturnValue(widget);

            widgetService.updateWidgetLinked(widget.id, newLinkedValue);

            expect(widgetRepository.findById).toHaveBeenCalledWith(widget.id);
            expect(widgetRepository.save).toHaveBeenCalledWith({ ...widget, linked: newLinkedValue });
        });

        it('should throw WidgetNotFoundError when there is no widget with the given id', () => {
            const nonExistingWidgetId = -1;

            expect(() => widgetService.updateWidgetLinked(nonExistingWidgetId, false))
                .toThrow(`Widget not found with id ${nonExistingWidgetId}`)
        });
    });

    describe('updateWidgetColor', () => {
        it('should save the updated widget with the new selectedColor value through the repository', () => {
            const widget = widgets[1];
            const newColor = 'black';
            jest.spyOn(widgetRepository, 'findById').mockReturnValue(widget);

            widgetService.updateWidgetColor(widget.id, newColor);

            expect(widgetRepository.findById).toHaveBeenCalledWith(widget.id);
            expect(widgetRepository.save).toHaveBeenCalledWith({ ...widget, selectedColor: newColor });
        });

        it('should throw WidgetNotFoundError when there is no widget with the given id', () => {
            const nonExistingWidgetId = -1;

            expect(() => widgetService.updateWidgetColor(nonExistingWidgetId, 'black'))
                .toThrow(`Widget not found with id ${nonExistingWidgetId}`)
        });
    });

    describe('updateWidgetActive', () => {
        it('should save the updated widget with the new active value through the repository', () => {
            const widget = widgets[1];
            const newActiveValue = !widget.active;
            jest.spyOn(widgetRepository, 'findById').mockReturnValue(widget);

            widgetService.updateWidgetActive(widget.id, newActiveValue);

            expect(widgetRepository.findById).toHaveBeenCalledWith(widget.id);
            expect(widgetRepository.save).toHaveBeenCalledWith({ ...widget, active: newActiveValue });
        });

        it('should throw WidgetNotFoundError when there is no widget with the given id', () => {
            const nonExistingWidgetId = -1;

            expect(() => widgetService.updateWidgetActive(nonExistingWidgetId, false))
                .toThrow(`Widget not found with id ${nonExistingWidgetId}`)
        });
    });
});