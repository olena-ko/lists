import type {ListItem} from "../../../../types";
import {type ChangeEvent, type KeyboardEvent, useEffect, useState} from "react";
import {IconButton, TextField} from "@radix-ui/themes";
import {DotIcon, EnterIcon} from "@radix-ui/react-icons";
import {ListItemRow} from "../ListItemRow/ListItemRow.tsx";

export const ListItemsForm = (props: {
    onChange: (listItems: ListItem[]) => void
}) => {
    const {onChange} = props
    const [name, setName] = useState('')
    const [listItems, setListItems] = useState<ListItem[]>([])
    useEffect(() => {
        onChange(listItems)
    }, [listItems, onChange])
    const deleteListItem = (listItemId: string) => {
        setListItems((item) => item.filter(({id}) => listItemId !== id))
    }
    const addListItem = () => {
        if (!name) return
        setListItems([...listItems, {
            id: crypto.randomUUID(),
            name
        }])
        setName('')
    }
    const handleKeyDownName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        addListItem()
    }
    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value.trim())
    }

    return <>
        <TextField.Root placeholder="List item name"
                        value={name}
                        onChange={handleChangeName}
                        onKeyDown={handleKeyDownName}
                        size={'2'}
        >
            <TextField.Slot>
                <DotIcon width={'10'} height={'10'}/>
            </TextField.Slot>
            <TextField.Slot>
                <IconButton size="1" variant="ghost"
                            onClick={addListItem}
                            disabled={!name}>
                    <EnterIcon height="14" width="14"/>
                </IconButton>
            </TextField.Slot>
        </TextField.Root>

        {listItems.map(item => <ListItemRow
                key={item.id}
                data={item}
                deleteItem={deleteListItem}
            />
        )}
    </>

}