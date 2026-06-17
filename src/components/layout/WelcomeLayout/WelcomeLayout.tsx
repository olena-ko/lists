import {Box, Button, Flex, Heading, Text} from "@radix-ui/themes";

import logo from '../../../assets/images/logo.png';

export const WelcomeLayout = (props: { startWorking: () => void }) => {
    return <Flex height={'100dvh'} direction={'column'} align={'center'}
                 justify={'center'} gap={'4'}>
        <img
            src={logo}
            alt={'Lists Management Logo'}
        />
        <Heading as={'h1'}>Lists management</Heading>
        <Text>Stop forgetting things.</Text>
        <Box>
            <Button onClick={props.startWorking} color={'plum'}>
                Create your first list
            </Button>
        </Box>
    </Flex>
}