import { View, Text, TextInput } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ResturantSearch = ({ ChangeSearch, Search }) => {
    return (
        <View
            className="flex flex-row w-11/12 mx-auto px-3 py-1 rounded-xl items-center border border-[#ccca] mt-3"
        >
            <TextInput
                placeholder='Search for meals or area'
                className="flex-1 p-1"
                value={Search}
                onChangeText={(t) => ChangeSearch(t)}
            />
            <FontAwesome name="search" size={24} color="#555" />
        </View>
    )
}

export default ResturantSearch