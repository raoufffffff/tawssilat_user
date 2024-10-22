import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Start = () => {
    const navigation = useNavigation()

    useEffect(() => {
        const getStorege = async () => {
            const jsonValue = await AsyncStorage.getItem('hamoudi');
            let a = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (a != null) {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'location'
                    },]
                })
            }
        }
        getStorege()
    }, [])



    return (
        <View
            className="flex-1"
        >
            <Image
                source={require('../../../assets/start.png')}
                className="w-full"
            />
            <Text
                className="mx-auto text-[#7C7D7E] mt-24"
            >Découvrez une nouvelle version bêta de l'application tawssilat Nous travaillons dur pour vous offrir la meilleure expérience de livraison.</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('log')}
                className="bg-[#FC6011] w-10/12 py-3 rounded-3xl mx-auto mt-20"
            >
                <Text
                    className="text-white mx-auto text-lg "
                >
                    Se connecter
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('sin')}
                className="border border-[#FC6011] w-10/12 py-3 rounded-3xl mx-auto mt-8"
            >
                <Text
                    className="text-[#FC6011] mx-auto text-lg "
                >
                    Créer un compte
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Start