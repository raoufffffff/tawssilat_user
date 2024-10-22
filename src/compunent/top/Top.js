import { View, Text } from 'react-native'
import React from 'react'

const Top = ({ name }) => {
    return (
        <View
            className="w-full flex px-4 mt-2 "
        >
            <Text
                className="text-[#4A4B4D] font-bold text-lg"
            >Bienvenue chez <Text
                className="text-[#FC6011] font-bold text-lg"
            >Tawssilat
                </Text>
            </Text>
            <Text
                className="text-[#4A4B4D] font-bold text-lg"
            >{name}</Text>
        </View>
    )
}

export default Top