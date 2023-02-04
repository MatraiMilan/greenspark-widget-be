import { Test, TestingModule } from "@nestjs/testing";
import { WidgetController } from "./widget.controller";
import { WidgetService } from "../service/widget.service";
import { getTestWidgets } from "../util/test-data";
import { Widget } from "../model/widget";
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { InstanceToken } from "@nestjs/core/injector/module";
import { WidgetNotFoundError } from "../error/widget-not-found.error";
import { HttpStatus } from "@nestjs/common";

const moduleMocker = new ModuleMocker(global);

describe('WidgetController', () => {
    let widgetController: WidgetController;
    let mockWidgetService: any;
    let widgets: Widget[];
    let mockResponse: any;

    beforeEach(async () => {
        widgets = getTestWidgets();
        mockWidgetService = {
            findAllWidget: jest.fn().mockReturnValue(widgets),
            updateWidgetLinked: jest.fn(),
            updateWidgetColor: jest.fn(),
            updateWidgetActive: jest.fn(),
        };

        const app: TestingModule = await Test.createTestingModule({
            controllers: [WidgetController],
        }).useMocker((token: InstanceToken) => {
            if (token === WidgetService) {
                return mockWidgetService;
            }
            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);
                return new Mock();
            }
        }).compile();

        widgetController = app.get<WidgetController>(WidgetController);
        mockResponse = { send: jest.fn(), status: jest.fn().mockReturnValue(mockResponse) }
    });

    describe('getAllWidget', () => {
        it('should return all widget from WidgetService', () => {
            expect(widgetController.getAllWidget()).toEqual(widgets);
            expect(mockWidgetService.findAllWidget).toHaveBeenCalled();
        });
    });

    describe('updateWidgetLinked', () => {
        it('should update widget linked value through WidgetService', () => {
            widgetController.updateWidgetLinked(1, { linked: false }, mockResponse);
            expect(mockWidgetService.updateWidgetLinked).toHaveBeenCalledWith(1, false);
        });

        it('should return with not found response when WidgetNotFoundError is thrown', () => {
            const id = -1;
            mockWidgetService.updateWidgetLinked = jest.fn().mockImplementationOnce(() => {
                throw new WidgetNotFoundError(id);
            });

            widgetController.updateWidgetLinked(id, { linked: false }, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
        });
    });

    describe('updateWidgetColor', () => {
        it('should update widget selectedColor value through WidgetService', () => {
            widgetController.updateWidgetColor(2, { selectedColor: 'black' }, mockResponse);
            expect(mockWidgetService.updateWidgetColor).toHaveBeenCalledWith(2, 'black');
        });

        it('should return with not found response when WidgetNotFoundError is thrown', () => {
            const id = -1;
            mockWidgetService.updateWidgetColor = jest.fn().mockImplementationOnce(() => {
                throw new WidgetNotFoundError(id);
            });

            widgetController.updateWidgetColor(id, { selectedColor: 'black' }, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
        });
    });

    describe('updateWidgetActive', () => {
        it('should update widget active value through WidgetService', () => {
            widgetController.updateWidgetActive(3, { active: true }, mockResponse);
            expect(mockWidgetService.updateWidgetActive).toHaveBeenCalledWith(3, true);
        });

        it('should return with not found response when WidgetNotFoundError is thrown', () => {
            const id = -1;
            mockWidgetService.updateWidgetActive = jest.fn().mockImplementationOnce(() => {
                throw new WidgetNotFoundError(id);
            });

            widgetController.updateWidgetActive(id, { active: true }, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
        });
    });
});