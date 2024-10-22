import { View, Text, Image, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'


const WelcomOne = () => {
    const navigation = useNavigation()

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    return (
        <View
            className="flex-1"
        >
            <Image
                source={require('../../../assets/wel-1.png')}
                className="mx-auto mt-16 "
            />
            <Image
                source={require('../../../assets/sli-1.png')}
                className="mx-auto mt-10"
            />
            <Text
                className="text-3xl mx-auto mt-10"
            >
                Trouvez la meilleure food
            </Text>
            <TouchableOpacity
                className="bg-[#FC6011] w-10/12 py-3 rounded-3xl mx-auto mt-16"
                onPress={() => navigation.navigate('welcomeTow')}
            >
                <Text
                    className="text-white mx-auto text-lg "
                >Suivant</Text>
            </TouchableOpacity>
        </View>
    )
}

export default WelcomOne