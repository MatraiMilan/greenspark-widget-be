export const ImpactTypes = {
    CARBON: "carbon",
    PLASTIC_BOTTLES: "plastic bottles",
    TREES: "trees",
} as const;

export const WidgetColors = [
    "blue",
    "green",
    "beige",
    "white",
    "black",
] as const;

export type WidgetColorType = (typeof WidgetColors)[number];

export type WidgetAction = "collects" | "plants" | "offsets";

export interface Widget {
    id: number;
    type: (typeof ImpactTypes)[keyof typeof ImpactTypes];
    amount: number;
    action: WidgetAction;
    active: boolean;
    linked: boolean;
    selectedColor: WidgetColorType;
}

export type UpdateWidgetActiveDto = Pick<Widget, "active">;
export type UpdateWidgetLinkedDto = Pick<Widget, "linked">;
export type UpdateWidgetColorDto = Pick<Widget, "selectedColor">;
