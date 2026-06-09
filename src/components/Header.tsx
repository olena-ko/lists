import {Box, Flex, Separator, Text} from "@radix-ui/themes";

export const Header = () => {
    return <Box py={'2'}>
        <Flex align={'center'} gap={'4'} p={'2'}>
            <img src={'/logo.png'} alt={'List Management'} width={40}/>
            <Text>List management</Text>
            <Flex flexGrow={'1'}></Flex>
            <Text size={'2'}>Stop forgetting things.</Text>
        </Flex>
        <Separator size={'4'}/>
    </Box>
}