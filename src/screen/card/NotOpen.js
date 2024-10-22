import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { clear } from '../../stor/StorCart'

const NotOpen = ({ about }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    return (
        <>
            <View
                className="absolute w-full h-full opacity-25 bg-black z-40"
            ></View>
            <View
                className="absolute w-full h-full flex pt-60 items-center z-50"
            >
                <View
                    className="w-11/12 py-3 bg-white rounded-xl px-2"
                >
                    <Text
                        className="text-center text-[#3339]"
                    >{about}</Text>
                    <TouchableOpacity
                        className="bg-[#fc6011] w-3/12 mx-auto py-1 rounded-xl mt-7"
                        onPress={() => {
                            navigation.navigate('home')
                            dispatch(clear())
                        }}
                    >
                        <Text
                            className="text-white mx-auto text-xl"
                        >ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default NotOpen