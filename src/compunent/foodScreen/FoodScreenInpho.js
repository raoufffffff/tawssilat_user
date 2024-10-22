import { View, Text } from 'react-native'
import React from 'react'
import FoodScreenFav from './FoodScreen'
import Entypo from '@expo/vector-icons/Entypo';
const FoodScreenInpho = ({ food, item, plus, minus }) => {
    return (
        <View
            className="rounded-t-2xl mt-28  px-3 py-3 bg-[#eee]"
        >
            <FoodScreenFav foodId={food._id} />
            <Text
                className="text-3xl text-[#777] "
            >{food.name}</Text>
            <View
                className="mt-5 flex flex-row justify-between items-center text-lg"
            >
                <Text
                    className="font-bold "
                >
                    Nombre de produits
                </Text>
                <View
                    className="flex flex-row items-center"
                >
                    <Text
                        onPress={minus}
                        className="mr-5 px-4 text-lg rounded-xl py-1 font-bold bg-[#FC6011] text-white"
                    >-</Text>
                    <Text
                        className="text-[#FC6011] border border-[#FC6011] text-lg px-3 rounded-xl py-1"
                    >{item.q}</Text>
                    <Text
                        onPress={plus}
                        className="ml-5 px-4 text-lg rounded-xl py-1 font-bold bg-[#FC6011] text-white"
                    >+</Text>
                </View>
            </View>
            <Text
                className="text-lg font-bold mt-3"
            >Description</Text>
            <Text
                className="mt-3 text-[#666]"
            >{food.des}</Text>
            <View
                className="w-11/12 mx-auto h-[0.5] bg-[#999a] my-5"
            ></View>


        </View>
    )
}

export default FoodScreenInpho