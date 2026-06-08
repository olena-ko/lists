import "@radix-ui/themes/styles.css";
import './App.css';
import {Flex, Heading, Text} from "@radix-ui/themes";

const App = () => {
    return (
        <Flex height={'100dvh'} direction={'column'} align={'center'}
              justify={'center'}>
            <Heading as={'h1'}>List management</Heading>
            <Text>Stop forgetting things. Create lists.</Text>
        </Flex>
    );
};

export default App;
