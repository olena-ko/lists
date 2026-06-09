import "@radix-ui/themes/styles.css";
import './App.css';
import {Box, Button, Container, Flex,} from "@radix-ui/themes";
import {useState} from "react";
import type {IListItem} from "./types/ListItem.ts";
import {CreateListForm} from "./components/CreateListForm.tsx";
import {EmptyAppScreen} from "./components/EmptyApp.tsx";
import {Header} from "./components/Header.tsx";
import {ListItem} from "./components/ListItem.tsx";
import {PlusIcon} from "@radix-ui/react-icons";

const App = () => {
    const [showNewListForm, setShowNewListForm] = useState(false)
    const [lists, setLists] = useState<IListItem[]>([])

    const hideForm = () => {
        setShowNewListForm(false)
    }

    const onListCreated = (newList: IListItem) => {
        setLists([...lists, newList])
        hideForm()
    }

    const showCreateListForm = () => {
        setShowNewListForm(true)
    }

    const deleteList = (id: string) => {
        setLists((prev) => prev.filter(l => l.id !== id))
    }

    if (!lists.length && !showNewListForm) {
        return <EmptyAppScreen
            startWorking={showCreateListForm}
        />
    }

    return (<Container>
            <Header/>
            <Flex gap={'2'}>
                {!!lists.length &&
                    <Flex direction={'column'} gap={'1'} flexGrow={'1'}
                          flexShrink={'1'} flexBasis={'0'}>
                        {lists.map(list => <ListItem key={list.id} list={list}
                                                     deleteList={deleteList}/>)}
                    </Flex>}
                <Box width={'400px'} mx={'auto'}>
                    {!showNewListForm &&
                        <Flex justify={'end'}>
                            <Button color={'plum'}
                                    variant={'soft'}
                                    onClick={showCreateListForm} size={'2'}>
                                <PlusIcon width="15" height="15"/>
                                Create new list
                            </Button>
                        </Flex>}
                    {showNewListForm &&
                        <CreateListForm addNewList={onListCreated}
                                        hideForm={hideForm}/>
                    }
                </Box>
            </Flex>
        </Container>
    );
};

export default App;
