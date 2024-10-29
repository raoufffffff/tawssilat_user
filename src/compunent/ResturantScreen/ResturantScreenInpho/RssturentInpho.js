import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import Header from '../../header/Header'
import MyHelp from '../../../constanst/HelpAbout'
import Fav from './Fav';

const RssturentInpho = ({ location, rest }) => {
    let { des, timeing, price } = MyHelp(location, rest)
    return (
        <ImageBackground
            source={{ uri: rest.bg }}
            className="h-52 pt-2"

        >
            <Header ret={true} showlogo={true} />
            <View
                className="w-11/12 mx-auto bg-[#fff] border-[#eee] border pb-5 mt-14 rounded-xl relative"
            >
                <Fav resId={rest._id} />
                <Text
                    className="mx-auto mt-3 text-2xl capitalize text-[#56595c]"
                >{rest.name}</Text>
                <View
                    className="flex flex-row w-full justify-center items-center mt-3"
                >
                    <View
                        className="flex justify-center items-center"
                    >
                        <Text
                            className="mb-1 font-semibold text-[#333a]"
                        >Temps de livraison</Text>
                        <Text
                            className="text-[#FC6011] "
                        >{timeing + 30}-{timeing + 40} min </Text>
                    </View>
                    <View
                        className="bg-[#7777] mt-3 w-[1] h-5/6 mx-3"
                    ></View>
                    <View
                        className="flex justify-center items-center"
                    >
                        <Text
                            className="mb-1 font-semibold text-[#333a]"
                        >Distance</Text>
                        <Text
                            className="text-[#FC6011] "
                        >{Math.round(des / 1000)} Km</Text>
                    </View>
                    <View
                        className="bg-[#7777] mt-3 w-[1] h-5/6 mx-3"
                    ></View>
                    <View
                        className="flex justify-center items-center"
                    >
                        <Text
                            className="mb-1 font-semibold text-[#333a]"
                        >Prix de livraison</Text>
                        <Text
                            className="text-[#FC6011] "
                        >{price} DA</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default RssturentInpho