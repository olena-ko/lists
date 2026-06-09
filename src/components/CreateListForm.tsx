import {
    Box,
    Button,
    Card,
    Flex,
    IconButton,
    Separator,
    Text,
    TextField
} from "@radix-ui/themes";
import {Cross1Icon, DotIcon, ListBulletIcon} from "@radix-ui/react-icons"
import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import type {IListItem} from "../types/ListItem.ts";

export const CreateListForm = (props: {
    addNewList: (newList: IListItem) => void
    hideForm: () => void
}) => {
    const [name, setName] = useState('')
    const [elements, setElements] = useState<string[]>([])

    const [newElementName, setNewElementName] = useState('')

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const deleteElement = (elementDelete: string) => {
        setElements((elList) => elList.filter((element) => element !== elementDelete))
    }

    const onChangeNewElementName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewElementName(e.target.value)
    }

    const addNewElement = () => {
        setElements([...elements, newElementName])
        setNewElementName('')
    }

    const onSaveList = () => {
        props.addNewList({
            id: (+new Date()).toString(),
            name,
            elements
        })
    }

    const onNewNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        addNewElement()
    }

    return <Card>
        <Flex direction={'column'} gap={'1'}>
            <TextField.Root placeholder="List name" value={name}
                            onChange={onChangeName}>
                <TextField.Slot>
                    <ListBulletIcon width={'10'} height={'10'}/>
                </TextField.Slot>
            </TextField.Root>
            <Separator my={'2'} size={'4'}/>
            <Flex align={'center'} py={'1'} gap={'1'}>
                <Box flexGrow={'1'}>
                    <TextField.Root placeholder="Item name"
                                    value={newElementName}
                                    onChange={onChangeNewElementName}
                                    onKeyDown={onNewNameKeyDown}
                                    size={'2'}
                    >

                    </TextField.Root>
                </Box>
            </Flex>

            {elements.map(element => {
                return <Flex key={element} gap={'1'} align={'center'}>
                    <DotIcon/>
                    <Flex flexGrow={'1'}><Text
                        size={'2'}>{element}</Text></Flex>
                    <IconButton color={"crimson"}
                                variant={'soft'}
                                onClick={() => deleteElement(element)}
                                size={'1'}
                    >
                        <Cross1Icon width={'10'} height={'10'}/>
                    </IconButton>
                </Flex>
            })}

            <Separator my={'2'} size={'4'}/>
            <Flex justify={'center'} gap={'1'}>
                <Button onClick={onSaveList} color={'plum'}>Save
                    list</Button>
                <Button onClick={props.hideForm} color={'gray'}
                        variant={'soft'}>Cancel</Button>
            </Flex>
        </Flex>
    </Card>
}