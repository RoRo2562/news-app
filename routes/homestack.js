import { createStackNavigator } from "react-navigation-stack";
import {createAppContainer} from "react-navigation"
import Home from "../views/Home/home"
import Login from "../views/Login/login"
const screens = {
    Home : {
        screen : Home,

    },
    Login : {
        screen : Login
    }

}
const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack);