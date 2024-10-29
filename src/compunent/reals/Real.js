import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Real = () => {
    const navigation = useNavigation()
    const navi = () => {
        navigation.navigate('singel')
    }
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="h-32 w-full px-3"
        >
            <TouchableOpacity
                className="h-24 w-24 rounded-full bg-neutral-500 mx-2"
                onPress={() => navi()}
            ></TouchableOpacity>
            <TouchableOpacity
                className="h-24 w-24 rounded-full bg-neutral-500 mx-2"
                onPress={() => navi()}
            ></TouchableOpacity>
            <TouchableOpacity
                className="h-24 w-24 rounded-full bg-neutral-500 mx-2"
                onPress={() => navi()}
            ></TouchableOpacity>
            <TouchableOpacity
                className="h-24 w-24 rounded-full bg-neutral-500 mx-2"
                onPress={() => navi()}
            ></TouchableOpacity>
        </ScrollView>
    )
}

export default Real