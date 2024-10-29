import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomThree = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView
            className="flex-1"
        >
            <Image
                source={require('../../../assets/wel-3.png')}
                className="mx-auto mt-16"
            />
            <Image
                source={require('../../../assets/sli-3.png')}
                className="mx-auto mt-10"
            />
            <Text
                className="text-3xl mx-auto mt-10"
            >
                Suivez votre demande
            </Text>
            <Text
                className="text-center w-10/12 mx-auto mt-6 text-[#7C7D7E] "
            >Suivi en temps réel de votre nourriture sur Il'application une fois la commande passée</Text>
            <TouchableOpacity
                className="bg-[#FC6011] w-10/12 py-3 rounded-3xl mx-auto mt-16"
                onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: "location" }]
                })}
            >
                <Text
                    className="text-white mx-auto text-lg "
                >Suivant</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default WelcomThree