import { InMemoryWidgetRepository } from "./in-memory-widget-repository";
import { InMemoryWidgets } from "./data/in-memory-widgets";

describe('InMemoryWidgetRepository', () => {
    let repository: InMemoryWidgetRepository;

    beforeEach(() => {
        repository = new InMemoryWidgetRepository();
    });

    describe('findAll', () => {
        it('should return all in memory widget', () => {
            expect(repository.findAll()).toEqual(InMemoryWidgets);
        });
    });

    describe('findById', () => {
        it('should return the in memory widget with the given id', () => {
            const id = 1;
            const expectedWidget = InMemoryWidgets.find(widget => widget.id === id);

            expect(repository.findById(id)).toEqual(expectedWidget);
        });
    });

    describe('save', () => {
        it('should update the in memory widget with the given id', () => {
            const id = 2
            const widget = repository.findById(id);

            repository.save({...widget, selectedColor: 'black'});

            expect(repository.findById(id).selectedColor).toBe('black');
        });

        it('should throw an error when there is no in memory widget with the given id', () => {
            const nonExistingId = -1;
            const widget = repository.findById(1);

            expect(() => repository.save({...widget, id: nonExistingId}))
                .toThrow(`There is no widget to update with id ${nonExistingId}`);
        });
    });
});