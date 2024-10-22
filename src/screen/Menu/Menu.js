import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../compunent/header/Header'
import Search from '../../compunent/Search/Search'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const Menu = () => {
    const navigation = useNavigation()
    const MyMenu = [{
        name: "pizza",
        img: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/2caca97b-77f6-48e7-837d-62642c0c9861/Derivates/12591894-e010-4a02-b04e-2627d8374298.jpg",
    }, {
        name: "Sandwish",
        img: "https://i.ytimg.com/vi/AxA18myxSkI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBtf5bniYxH1wwA0NB6cL_HOwvybw"
    }, {
        name: "Burgers",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsLo8QpRX_wQic0xWpenLxsEkF9YBdkS70JQ&s"
    }, {
        name: "Les Plats",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9fU2XtMKssAn-f2Sa9Rjd3u5MGfVY0KCdXQ&s"
    }].map(e => {
        return <TouchableOpacity key={e.name}
            onPress={() => navigation.navigate('menutype', { type: e.name })}
            className="flex flex-row w-9/12 rounded-xl ml-auto mr-8 bg-white my-5 relative h-20"
        >
            <Image
                source={{ uri: e.img }}
                className="h-20 w-20 absolute rounded-3xl -left-12"
            />
            <View
                className="absolute -right-2.5 top-5 rounded-full border border-[#aaa4] p-1 bg-white"
            >
                <AntDesign name="arrowright" size={24} color="#fc6011" />
            </View>
            <Text
                className="text-xl my-auto ml-10 font-bold"
            >{e.name}</Text>
        </TouchableOpacity>
    })
    return (
        <ScrollView
            className=" pt-3"
        >
            <Header ret={false} showlogo={true} />
            <View
                className="my-1"
            ></View>
            <Search />
            <View
                className="relative w-full  my-10 py-5"
            >
                <View
                    className="absolute w-3/12 h-[105%] bg-[#fc6011] rounded-tr-2xl rounded-br-2xl"
                ></View>

                {MyMenu}
            </View>
        </ScrollView>
    )
}

export default Menu