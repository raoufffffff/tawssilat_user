import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const LogWith = () => {
    return (
        <View
            className="w-full"
        >
            <Text
                className="text-[#7C7D7E] text-xs mt-8 mb-5 mx-auto"
            >ou connectez-vous avec</Text>
            <TouchableOpacity
                className="w-10/12 mx-auto py-3 rounded-3xl bg-[#367FC0] flex mt-6 flex-row justify-center items-center"
            >
                <FontAwesome5 name="facebook-f" size={22} color="#fff" />
                <Text
                    className=" text-white text-sm ml-5"
                >Connectez-vous avec Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="w-10/12 mx-auto py-3 rounded-3xl bg-[#DD4B39] mt-5 flex flex-row justify-center items-center"
            >
                <AntDesign name="googleplus" size={24} color="#fff" />
                <Text
                    className="ml-5 text-white text-sm"
                >Se connecter avec Google</Text>
            </TouchableOpacity>

        </View>
    )
}

export default LogWith