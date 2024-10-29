import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomTow = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView
            className="flex-1"
        >
            <Image
                source={require('../../../assets/wel-2.png')}
                className="mx-auto mt-16"
            />
            <Image
                source={require('../../../assets/sli-2.png')}
                className="mx-auto mt-10"
            />
            <Text
                className="text-3xl mx-auto mt-10"
            >
                Livraison rapide
            </Text>
            <Text
                className="text-center w-10/12 mx-auto mt-6 text-[#7C7D7E] px-5"
            >Livraison de restauration rapide à votre domicile, au bureau où que vous soyez</Text>
            <TouchableOpacity
                className="bg-[#FC6011] w-10/12 py-3 rounded-3xl mx-auto mt-16"
                onPress={() => navigation.navigate('welcomeThree')}
            >
                <Text
                    className="text-white mx-auto text-lg "
                >Suivant</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default WelcomTow