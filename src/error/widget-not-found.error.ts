export class WidgetNotFoundError extends Error {
    constructor(id: number) {
        super(`Widget not found with id ${id}`);
    }
}
