import "@radix-ui/themes/styles.css";
import './styles/global.css';

import {useState} from "react";
import {WelcomeLayout} from "./components/layout/WelcomeLayout";
import {MainLayout} from "./components/layout/MainLayout";

const App = () => {
    const [isWelcome, setIsWelcome] = useState(true);
    if (!isWelcome) return <MainLayout/>

    return <WelcomeLayout startWorking={() => {
        setIsWelcome(false);
    }}/>
};

export default App;
