import type {ListItem} from "../../../../types";
import {Cross2Icon, DotIcon} from "@radix-ui/react-icons";
import {Flex, IconButton, Text} from "@radix-ui/themes";

export const ListItemRow = (props: {
    data: ListItem,
    deleteItem: (id: string) => void
}) => {
    const {data, deleteItem} = props;

    return <Flex gap={'1'} align={'center'}>
        <DotIcon/>
        <Flex flexGrow={'1'}>
            <Text size={'2'}>{data.name}</Text>
        </Flex>
        <IconButton color={"crimson"}
                    variant={'soft'}
                    radius={'full'}
                    onClick={() => deleteItem(data.id)}
                    size={'1'}
        >
            <Cross2Icon width={'10'} height={'10'}/>
        </IconButton>
    </Flex>
}