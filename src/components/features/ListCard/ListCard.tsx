import {
    Box,
    Button,
    Card,
    Checkbox,
    Flex,
    IconButton,
    Separator,
    Text
} from "@radix-ui/themes";
import {CaretDownIcon, CaretUpIcon, TrashIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import type {ListItem} from "../../../types";

export const ListCard = (props: {
                             list: ListItem,
                             deleteList: (id: string) => void
                         }
) => {
    const {id, name, elements} = props.list
    const [isOpened, setIsOpened] = useState(false);
    const toggleCard = () => {
        setIsOpened((prev) => !prev)
    }

    const handleDelete = () => {
        props.deleteList(id)
    }

    return <Card>
        <Flex gap={'2'} align={'center'} p={'1'}>
            <IconButton onClick={toggleCard} variant={'ghost'} size={'1'}
                        color={'gray'}>
                {isOpened ? <CaretUpIcon/> :
                    <CaretDownIcon/>}
            </IconButton>
            <Flex flexGrow={'1'}><Text>{name}</Text></Flex>
            <Button color={'crimson'} variant={'soft'}
                    size='1'
                    type={'button'}
                    onClick={handleDelete}
            >
                <TrashIcon width="15" height="15"/>
                <Text>Delete</Text>
            </Button>
        </Flex>
        {isOpened && <Box>
            <Separator size={'4'} my={'3'}/>

            {elements.map(element => {
                return <Flex
                    key={element} gap={'2'} p={'1'} align={'center'}>
                    <Checkbox/>
                    <Text>{element}</Text>
                </Flex>
            })}</Box>}
    </Card>
}