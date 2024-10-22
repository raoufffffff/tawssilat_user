import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const Search = () => {
    const navigation = useNavigation()
    return (
        <View
            className="w-full flex-row pl-2 pr-5 items-center"
        >
            <TouchableOpacity
                className="border border-[#ddd7] rounded-xl mr-2 p-3"
                onPress={() => navigation.navigate('card')}
            >
                <FontAwesome name="shopping-cart" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('search')
                }}
                className="border border-[#ddd7] flex flex-row rounded-xl p-3 flex-1 items-center"
            >
                <Text
                    className="flex-1 text-[#777]"
                >Rechercher des food ou une zone</Text>
                <FontAwesome name="search" size={24} color="#555" />
            </TouchableOpacity>
        </View>
    )
}

export default Search