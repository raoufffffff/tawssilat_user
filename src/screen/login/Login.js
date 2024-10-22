import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SelfLog from './SelfLog/SelfLog'
import Toast from 'react-native-toast-message'
import LogWith from './antherLog/LogWith'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const naviagtion = useNavigation()

    const showToast = (r, e) => {
        Toast.show({
            type: r ? 'success' : 'error',
            text1: r ? "welcom back" : `${e} is wrong`,
            text2: r ? "we are good to go" : e
        });
    };
    return (
        <View
            className="flex-1"
        >
            <Toast />
            <Text
                className="text-2xl text-[#555] mt-10 mx-auto"
            >Se connecter</Text>
            <Text
                className="text-[#777] mt-5 mb-1 mx-auto "
            >Ajoutez vos coordonnées pour vous connecter</Text>
            <SelfLog showToast={showToast} />
            <TouchableOpacity
                className="flex flex-row w-full justify-center mt-10"
                onPress={() => naviagtion.navigate('sin')}
            >
                <Text
                    className="text-[#7C7D7E]"
                >Vous n'avez pas de compte ?</Text>
                <Text
                    className="text-[#FC6011]"
                >S'inscrire</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login