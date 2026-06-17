import {
    Button,
    Callout,
    Card,
    Flex,
    Separator,
    TextField
} from "@radix-ui/themes";
import {Cross2Icon} from "@radix-ui/react-icons"
import {type ChangeEvent, useMemo, useRef, useState} from "react";
import type {ListItem, List} from "../../../types";
import {type ValidationErrorKey, validationErrors} from "./validationErrors.ts";
import {ListItemsForm} from "./ListItemsForm/ListItemsForm.tsx";


export const CreateListForm = (props: {
    addNewList: (newList: List) => void
    hideForm: () => void
}) => {
    const {addNewList, hideForm} = props

    const [errors, setErrors] = useState<ValidationErrorKey[] | null>(null)
    const isValidForm = useRef(true)
    const newList = useRef<List>({
        id: crypto.randomUUID(),
        name: '',
        items: [],
    })

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        newList.current.name = e.target.value.trim()
    }

    const onChangeListItems = (listItems: ListItem[]) => {
        newList.current.items = listItems
    }

    const validateList = () => {
        const {name, items} = newList.current
        const errorsList: ValidationErrorKey[] = []
        if (!name) {
            errorsList.push('noTitle')
        }

        if (!items.length) {
            errorsList.push('noItems')
        }

        isValidForm.current = !errorsList.length
        setErrors(errorsList.length ? errorsList : null)
    }

    const handleSubmit = () => {
        validateList()
        if (!isValidForm.current) return
        addNewList({...newList.current})
        newList.current = {
            id: crypto.randomUUID(),
            name: '',
            items: [],
        }
    }

    const errorsBlock = useMemo(() => {
        if (!errors?.length) return null

        return <>
            <Callout.Root color="red" role="alert">
                {errors.map(key => <Flex align={'center'} gap={'2'} key={key}>
                    <Cross2Icon width={'10'} height={'10'}/> <Callout.Text>
                    {validationErrors[key]}
                </Callout.Text></Flex>)}
            </Callout.Root>
            <Separator my={'2'} size={'4'}/>
        </>
    }, [errors])

    return <Card>
        <Flex direction={'column'} gap={'1'}>
            {errorsBlock}

            <TextField.Root
                placeholder="List name"
                onChange={handleChangeName}
                variant={'classic'}>
            </TextField.Root>
            <Separator my={'2'} size={'4'}/>

            <ListItemsForm onChange={onChangeListItems}/>

            <Separator my={'2'} size={'4'}/>
            <Flex gap={'1'}>
                <Button onClick={handleSubmit} color={'plum'}>Save list</Button>
                <Button onClick={hideForm} color={'gray'}
                        variant={'soft'}>Cancel</Button>
            </Flex>
        </Flex>
    </Card>
}