import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../compunent/header/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import navlinks from '../../constanst/navlinks'
import { useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo';
import Loading from '../../compunent/laoding/Loading'
const Nav = () => {
    const [user, setuser] = useState(null)
    const navigation = useNavigation()
    useEffect(() => {
        const getuser = async () => {
            const jsonValue = await AsyncStorage.getItem('hamoudi');
            let a = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (a != null) {
                setuser(a)
            }
        }
        getuser()
    }, [])
    const logout = async () => {
        await AsyncStorage.clear()
            .then(() => {
                navigation.navigate('start')
            })
    }
    const links = navlinks.map((e, i) => {
        return <TouchableOpacity
            onPress={() => {
                navigation.navigate(e.to)
            }}
            className="flex flex-row border-b pt-3 pb-2 border-b-[#ccca] w-full"
            key={i}>
            {e.icon}
            <Text
                className="ml-2 text-lg font-[400]"
            >{e.name}</Text>
        </TouchableOpacity>
    })
    if (!user) {
        return <Loading />
    }
    return (
        <View
            className="flex-1  bg-white pt-5"
        >
            <Header showlogo={false} ret={true} />
            {user && <Text
                className="text-4xl mb-2  text-center mx-auto bg-[#fc6011] text-white rounded-full px-6 py-4"
            >{user.name[0]}</Text>}

            <Text
                className="mx-auto text-xl"
            >{user.name}</Text>
            <Text
                className="mx-auto text-[#777] mb-3"
            >{user.email}</Text>
            <View
                className="px-5"
            >
                {links}
                <TouchableOpacity
                    onPress={() => logout()}
                    className="flex flex-row  pt-3 pb-2  w-full"
                >
                    <Entypo name="log-out" size={24} color="#777a" />
                    <Text
                        className="ml-2 text-lg font-[400]"
                    >Déconnexion</Text>
                </TouchableOpacity>
            </View>
            <Text
                className="text-sm mx-auto text-[#777] mt-3"
            >Tawssilatcompany@gmail.com
            </Text>
        </View>
    )
}

export default Nav