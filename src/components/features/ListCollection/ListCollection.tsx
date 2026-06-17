import type {ListItem} from "../../../types";
import {ListCard} from "../ListCard";
import {Flex} from "@radix-ui/themes";

export const ListCollection = (props: {
    data: ListItem[],
    deleteList: (id: string) => void
}) => {
    const {data, deleteList} = props;
    return <Flex
        direction={'column'}
        gap={'1'}
        flexGrow={'1'}
        flexShrink={'1'}
        flexBasis={'0'}>
        {data.map(list => <ListCard
            key={list.id}
            list={list}
            deleteList={deleteList}
        />)}
    </Flex>
}