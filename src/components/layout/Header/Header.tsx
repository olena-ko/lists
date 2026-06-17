import {Box, Flex, Separator, Text} from "@radix-ui/themes";
import logo from '../../../assets/images/logo.png';

export const Header = () => {
    return <Box>
        <Flex align={'center'} gap={'4'} p={'2'}>
            <img src={logo} alt={'Lists' +
                ' Management Logo'} width={40}/>
            <Text>Lists management</Text>
            <Flex flexGrow={'1'}></Flex>
            <Text size={'2'}>Stop forgetting things.</Text>
        </Flex>
        <Separator size={'4'}/>
    </Box>
}