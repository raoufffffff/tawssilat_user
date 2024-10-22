import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
    return (
        <>
            <View
                className="absolute top-0 left-0 w-full h-screen bg-black opacity-25"
            ></View>
            <View
                className="absolute top-0 left-0 w-full h-screen flex justify-center items-center"
            >
                <Text
                    className="text-white font-bold"
                >Chargement </Text>
                <ActivityIndicator color={"#fff"} />
            </View>
        </>
    )
}

export default Loading