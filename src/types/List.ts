import type {ListItem} from "./ListItem.ts";

export type List =
    {
        id: string
        name: string
        items: ListItem[]
    }