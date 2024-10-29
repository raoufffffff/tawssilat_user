import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Thanks = () => {
    const navigation = useNavigation()
    const route = useRoute().params
    console.log(route.id);

    return (
        <SafeAreaView
            className="flex-1  bg-white"
        >
            <Image
                source={require('../../../assets/thanks.png')}
                className="mt-20 mx-auto"
            />
            <Text
                className="mt-5 text-4xl mx-auto"
            >Merci</Text>
            <Text
                className="mt-1 text-2xl mx-auto"
            >pour votre commande</Text>
            <Text
                className="text-[#aaa] w-10/12 mx-auto mt-5 text-center"
            >
                Votre commande est en cours de traitement. Nous vous informerons
                une fois la commande récupérée au point de vente. Vérifiez
                le statut de votre commande
            </Text>
            <TouchableOpacity
                className="w-9/12 mt-20 bg-[#fc6011] mx-auto flex justify-center items-center  py-2 rounded-xl"
                onPress={() => {
                    navigation.navigate('truck', { id: route.id })
                }}
            >
                <Text
                    className="text-white text-xl font-bold"
                >Suivre ma commande</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('home')}
                className="mx-auto flex justify-center items-center my-3"
            >
                <Text

                    className="text-black text-xl mt-3 font-bold"
                >Retour à la page d'accueil</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Thanks