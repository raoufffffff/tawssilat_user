import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Start from '../screen/start/Start'
import Home from '../screen/home/Home'
import Login from '../screen/login/Login'
import SinIn from '../screen/sinin/SinIn'
import WelcomOne from '../screen/Welcom/WelcomOne'
import WelcomTow from '../screen/Welcom/WelcomTow'
import WelcomThree from '../screen/Welcom/WelcomThree'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Menu from '../screen/Menu/Menu'
import Favorite from '../screen/favorite/Favorite'
import Search from '../screen/search/Search'
import Entypo from '@expo/vector-icons/Entypo';
import { Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Card from '../screen/card/Card'
import Resturent from '../screen/Resturent/Resturent'
import Nav from '../screen/Nav/Nav'
import Hestory from '../screen/hestory/Hestory'
import Terms from '../screen/Terms/Terms'
import Support from '../screen/Support/Support'
import About from '../screen/About/About'
import Feedback from '../screen/Feedback/Feedback'
import Food from '../screen/food/Food'
import Thanks from '../screen/thanks/Thanks'
import Truck from '../screen/truck/Truck'
import MenuType from '../screen/menuType/MenuType'
import CurrentOrder from '../screen/currentOrder/CurrentOrder'
import Personnelles from '../screen/personnelles/Personnelles'
import Locations from '../screen/Location/Location'

const Stuck = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomePages = () => {
    return (
        <Stuck.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stuck.Screen name='mainPage' component={Home} />
            <Stuck.Screen name='resturent' component={Resturent} />
            <Stuck.Screen name='food' component={Food} />
        </Stuck.Navigator>
    )
}

const MenuPages = () => {
    return (
        <Stuck.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stuck.Screen name='menu' component={Menu} />
            <Stuck.Screen name='menutype' component={MenuType} />
        </Stuck.Navigator>
    )
}

const HomeTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    borderWidth: 0.5,
                    borderTopColor: "#FC6011",
                    borderLeftColor: "#FC6011",
                    borderRightColor: "#FC6011",
                    borderTopEndRadius: 30,
                    borderTopStartRadius: 30,
                    padding: 0
                }
            }}
        >
            <Tab.Screen
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) => {
                        return <View
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 20,
                                justifyContent: 'center'
                            }}
                        >
                            <Entypo

                                name="home" size={28} color={focused ? "#FC6011" : "#9F9E9E"} />
                            <Text
                                style={{
                                    marginTop: 0.5,
                                    color: focused ? "#fc6011" : "#9f9e9e"
                                }}
                            >Home</Text>
                        </View>
                    }
                }}
                name='homepage' component={HomePages} />
            <Tab.Screen
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) => {
                        return <View
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 20,
                                justifyContent: 'center'
                            }}
                        >
                            <Entypo
                                name="grid" size={28} color={focused ? "#FC6011" : "#9F9E9E"} />
                            <Text
                                style={{
                                    marginTop: 0.5,
                                    color: focused ? "#fc6011" : "#9f9e9e"
                                }}
                            >Menu</Text>
                        </View>
                    }
                }}
                name='menupages' component={MenuPages} />
            <Tab.Screen
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) => {
                        return <View
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 20,
                                justifyContent: 'center'
                            }}
                        >
                            <MaterialIcons name="favorite" size={28} color={focused ? "#FC6011" : "#9F9E9E"} />
                            <Text
                                style={{
                                    marginTop: 0.5,
                                    color: focused ? "#fc6011" : "#9f9e9e"
                                }}
                            >Favoris</Text>
                        </View>
                    }
                }}
                name='favorite' component={Favorite} />
            <Tab.Screen
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) => {
                        return <View
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 20,
                                justifyContent: 'center'
                            }}
                        >
                            <MaterialIcons
                                name="search" size={28} color={focused ? "#FC6011" : "#9F9E9E"} />
                            <Text
                                style={{
                                    marginTop: 0.5,
                                    color: focused ? "#fc6011" : "#9f9e9e"
                                }}
                            >recherche</Text>
                        </View>
                    }
                }}
                name='search' component={Search} />

        </Tab.Navigator>
    )
}



const Navigation = () => {
    return (
        <NavigationContainer>
            <Stuck.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stuck.Screen name='start' component={Start} />
                <Stuck.Screen name='log' component={Login} />
                <Stuck.Screen name='sin' component={SinIn} />
                <Stuck.Screen name='welcomeOne' component={WelcomOne} />
                <Stuck.Screen name='welcomeTow' component={WelcomTow} />
                <Stuck.Screen name='welcomeThree' component={WelcomThree} />
                <Stuck.Screen name='home' component={HomeTabs} />
                <Stuck.Screen name='card' component={Card} />
                <Stuck.Screen name='location' component={Locations} />
                <Stuck.Screen name='nav' component={Nav} />
                <Stuck.Screen name='personnelles' component={Personnelles} />
                <Stuck.Screen name='history' component={Hestory} />
                <Stuck.Screen name='terms' component={Terms} />
                <Stuck.Screen name='support' component={Support} />
                <Stuck.Screen name='about' component={About} />
                <Stuck.Screen name='feedback' component={Feedback} />
                <Stuck.Screen name='thanks' component={Thanks} />
                <Stuck.Screen name='truck' component={Truck} />
                <Stuck.Screen name='currentorder' component={CurrentOrder} />

            </Stuck.Navigator>
        </NavigationContainer>
    )
}

export default Navigation