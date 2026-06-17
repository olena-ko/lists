import {
    Box,
    Button,
    Callout,
    Card,
    Flex,
    IconButton,
    Separator,
    Text,
    TextField
} from "@radix-ui/themes";
import {Cross2Icon, DotIcon, EnterIcon} from "@radix-ui/react-icons"
import {
    type ChangeEvent,
    type KeyboardEvent,
    useMemo,
    useRef,
    useState
} from "react";
import type {ListItem} from "../../../types";
import {type ValidationErrorKey, validationErrors} from "./validationErrors.ts";

export const CreateListForm = (props: {
    addNewList: (newList: ListItem) => void
    hideForm: () => void
}) => {
    const [name, setName] = useState('')
    const [elements, setElements] = useState<string[]>([])
    const [errors, setErrors] = useState<ValidationErrorKey[] | null>(null)
    const isValidForm = useRef(true)
    const [newElementName, setNewElementName] = useState('')

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value.trim())
    }

    const deleteElement = (elementDelete: string) => {
        setElements((elList) => elList.filter((element) => element !== elementDelete))
    }

    const handleChangeNewElementName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewElementName(e.target.value.trim())
    }

    const addNewElement = () => {
        if (!newElementName) return
        setElements([...elements, newElementName])
        setNewElementName('')
    }

    const handleNewNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        addNewElement()
    }

    const validateList = () => {
        const errorsList: ValidationErrorKey[] = []
        if (!name) {
            errorsList.push('noTitle')
        }

        if (!elements.length) {
            if (newElementName) addNewElement()
            else errorsList.push('noElements')
        }

        isValidForm.current = !errorsList.length
        setErrors(errorsList.length ? errorsList : null)
    }

    const handleSave = () => {
        validateList()
        if (!isValidForm.current) return
        props.addNewList({
            id: crypto.randomUUID(),
            name,
            elements
        })
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

    const elementsListBlock = useMemo(() => {
        return <>
            {elements.map(element => {
                return <Flex key={element} gap={'1'} align={'center'}>
                    <DotIcon/>
                    <Flex flexGrow={'1'}><Text
                        size={'2'}>{element}</Text></Flex>
                    <IconButton color={"crimson"}
                                variant={'soft'}
                                radius={'full'}
                                onClick={() => deleteElement(element)}
                                size={'1'}
                    >
                        <Cross2Icon width={'10'} height={'10'}/>
                    </IconButton>
                </Flex>
            })}
        </>
    }, [elements])

    return <Card>
        <Flex direction={'column'} gap={'1'}>
            {errorsBlock}

            <TextField.Root placeholder="List name" value={name}
                            onChange={handleChangeName}
                            variant={'classic'}>
            </TextField.Root>

            <Separator my={'2'} size={'4'}/>

            <Flex align={'center'} py={'1'} gap={'1'}>
                <Box flexGrow={'1'}>
                    <TextField.Root placeholder="Item name"
                                    value={newElementName}
                                    onChange={handleChangeNewElementName}
                                    onKeyDown={handleNewNameKeyDown}
                                    size={'2'}
                    >
                        <TextField.Slot>
                            <DotIcon width={'10'} height={'10'}/>
                        </TextField.Slot>
                        <TextField.Slot>
                            <IconButton size="1" variant="ghost"
                                        onClick={addNewElement}
                                        disabled={!newElementName}>
                                <EnterIcon height="14" width="14"/>
                            </IconButton>
                        </TextField.Slot>
                    </TextField.Root>
                </Box>
            </Flex>

            {elementsListBlock}

            <Separator my={'2'} size={'4'}/>
            <Flex gap={'1'}>
                <Button onClick={handleSave} color={'plum'}>Save list</Button>
                <Button onClick={props.hideForm} color={'gray'}
                        variant={'soft'}>Cancel</Button>
            </Flex>
        </Flex>
    </Card>
}