import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../compunent/header/Header'
import Search from '../../compunent/Search/Search'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Menu = () => {
    const navigation = useNavigation()
    const MyMenu = [
        {
            name: "pizza",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrz8f66U-IU8hFujqUeqB06jbkiZ1uVHu8dQ&s",
        },
        {
            name: "sandwich",
            img: "https://www.tastingtable.com/img/gallery/italian-sandwich-meat-cheese-recipe/l-intro-1641315527.jpg",
        },
        {
            name: "borgar",
            img: "https://cdn.prod.website-files.com/66422c83d3e818cb62dbec76/66422c83d3e818cb62dbed8e_Paskaborgarinn_960x556.jpg",
        },
        {
            name: "chawarma",
            img: "https://libshop.fr/wp-content/uploads/2020/03/shawarma-lebanon.jpg",
        },
        {
            name: "fajitas",
            img: "https://littlesunnykitchen.com/wp-content/uploads/2019/05/Instant-pot-steak-fajitas-22-750x750.jpg",
        },
        {
            name: "offer",
            img: "https://icebergdriveinn.com/cdn/shop/articles/Fast-Food-How-It-Has-Evolved-in-the-Past-Decades.jpg?v=1625683335",
        },
        {
            name: "tacos",
            img: "https://mojo.generalmills.com/api/public/content/GmHhoT5mr0Sue2oMxdyEig_webp_base.webp?v=868009f1&t=e724eca7b3c24a8aaa6e089ed9e611fd",
        },
        {
            name: "plat",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mMoPSUcToAGSaPOlpmUOr2UzfuV2OlVmMw&s",
        },
        {
            name: "dessert",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0zcrjllssz2ODGnOXMpesarXe8M83g_lfEw&s",
        },
        {
            name: "boissons",
            img: "https://www.information-dentaire.fr/wp-content/thumbnails/uploads/2019/10/boissons-sucrees-tt-width-1000-height-630-fill-0-crop-1-bgcolor-f0f2f7-isLogoProxy-0.jpg",
        },
        {
            name: "autre",
            img: "https://img.20mn.fr/TwFwzxVcRGitTGQQgNj-LCk/1444x920_bibimbap",
        },
    ].map(e => {
        return <TouchableOpacity key={e.name}
            onPress={() => navigation.navigate('menutype', { type: e.name })}
            className="flex flex-row w-9/12 rounded-xl ml-auto mr-8 bg-white my-5 relative h-20 border-[#eeee] border"
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
        <SafeAreaView>
            <ScrollView
                className=" pt-3 bg-white"
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
        </SafeAreaView>
    )
}

export default Menu