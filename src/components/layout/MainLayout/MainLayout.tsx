import {useState} from "react";
import {Box, Button, Container, Flex,} from "@radix-ui/themes";
import {PlusIcon} from "@radix-ui/react-icons";
import type {List} from "../../../types";
import {CreateListForm} from "../../features/CreateListForm";
import {Header} from "../Header";
import {ListCollection} from "../../features/ListCollection";

const MainLayout = () => {
    const [lists, setLists] = useState<List[]>([])
    const [isFormHidden, setIsFormHidden] = useState(!!lists.length)

    const hideForm = () => {
        setIsFormHidden(true)
    }

    const showForm = () => {
        setIsFormHidden(false)
    }

    const addList = (newList: List) => {
        setLists([...lists, newList])
        hideForm()
    }

    const deleteList = (id: string) => {
        setLists((prev) => prev.filter(l => l.id !== id))
    }

    return (<Container className={'main-container'}>
            <Header/>
            <Flex gap={'2'} p={'2'} className={'main-content'}>
                {!!lists.length &&
                    <ListCollection data={lists} deleteList={deleteList}/>}

                <Box width={'400px'} mx={'auto'}>
                    {isFormHidden ?
                        <Flex p={'1'}
                              justify={lists.length === 0 ? 'center' : 'end'}
                              className={'test'}>
                            <Button color={'plum'}
                                    variant={'soft'}
                                    onClick={showForm} size={'2'}>
                                <PlusIcon width="15" height="15"/>
                                Create new list
                            </Button>
                        </Flex> :
                        <CreateListForm addNewList={addList}
                                        hideForm={hideForm}/>
                    }
                </Box>
            </Flex>
        </Container>
    );
};

export default MainLayout;
