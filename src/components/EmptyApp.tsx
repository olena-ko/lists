import {Box, Button, Flex, Heading, Text} from "@radix-ui/themes";

export const EmptyAppScreen = (props: { startWorking: () => void }) => {
    return <Flex height={'100dvh'} direction={'column'} align={'center'}
                 justify={'center'} gap={'4'}>
        <img src={'/logo.png'} alt={'List Management'}/>
        <Heading as={'h1'}>List management</Heading>
        <Text>Stop forgetting things.</Text>
        <Box>
            <Button onClick={props.startWorking} color={'plum'}>
                Create your first list
            </Button>
        </Box>
    </Flex>
}