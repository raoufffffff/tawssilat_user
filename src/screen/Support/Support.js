import { View, Text, Image, Linking, Alert, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../compunent/header/Header'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const Support = () => {
    const call = (phone) => {
        Linking.openURL(`tel:${phone}`).catch((err) =>
            Alert.alert('Error', 'Failed to make a call', [{ text: 'OK' }], { cancelable: false })
        );
    }
    const facebook = () => {
        Linking.openURL(`https://www.facebook.com/share/15JoGuERpD/?mibextid=qi2Omg`).catch((err) =>
            Alert.alert('Error', 'Failed to make a call', [{ text: 'OK' }], { cancelable: false })
        );
    }
    const openWhatsApp = (phone) => {
        // Construct the WhatsApp URL with the phone number
        const url = `whatsapp://send?phone=${phone}`;

        // Use Linking to open the URL
        Linking.openURL(url).catch((err) =>
            Alert.alert('Error', 'Failed to open WhatsApp', [{ text: 'OK' }], { cancelable: false })
        );
    };
    const instgarm = () => {
        Linking.openURL(`https://www.instagram.com/tawssilatdelivery?igsh=cDR6Y3AzbnZ0cjl2`).catch((err) =>
            Alert.alert('Error', 'Failed to make a call', [{ text: 'OK' }], { cancelable: false })
        );
    }
    const email = 'raouf.hamoudi.r@gmail.com';
    const subject = 'wach kho';
    const body = 'ana livror ta3 zbi ';
    const sendEmail = () => {
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'Unable to open email client');
                }
            })
            .catch((err) => {
                console.error('An error occurred', err);
                Alert.alert('Error', 'Failed to open email client');
            });
    };
    return (
        <ScrollView
            className="flex-1  pt-1 bg-white"
        >
            <Header ret={true} showlogo={false} text={"Service d'assistance"} />
            <Text
                className="mx-auto text-2xl font-bold"
            >Centre d'aide</Text>
            <Image
                source={require('../../../assets/su.png')}
                className="mx-auto mt-5"
            />
            <Text
                className="mt-5 text-2xl px-5"
            >Aide</Text>
            <TouchableOpacity
                onPress={() => call("0798888642")}
                className="flex flex-row px-5 mt-5"
            >
                <Image
                    source={require('../../../assets/phone.png')} />
                <View
                    className="flex-1 ml-1 border-b border-b-white"
                >
                    <Text
                        className="text-lg"
                    >Ligne d'assistance</Text>
                    <Text
                        className="text-[#aaa] text-[8px]"
                    >Disponible 24h/24</Text>
                </View>
            </TouchableOpacity>
            <Text
                className="mt-5 text-2xl px-5"
            >Links</Text>
            <TouchableOpacity
                onPress={() => sendEmail()}
                className="flex flex-row px-5 mt-5"
            >
                <View
                    className="bg-white w-10 h-10 my-auto mx-auto rounded-full flex justify-center items-center"
                >
                    <MaterialCommunityIcons name="gmail" size={30} color="#58BE3F"
                    />
                </View>
                <View
                    className="flex-1 ml-2 border-b border-b-white pb-2"
                >
                    <Text
                        className="text-lg"
                    >Gmail</Text>
                    <Text
                        className="text-[#aaa] text-[7px]"
                    >tawssilat123@gmail.com</Text>
                    <Text
                        className="text-[#aaa] text-[7px]"
                    >Vous pouvez nous envoyer un e-mail</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => facebook()}
                className="flex flex-row px-5 mt-5"
            >
                <View
                    className="bg-white w-10 h-10 my-auto mx-auto rounded-full flex justify-center items-center"
                >
                    <FontAwesome name="facebook-f" size={30} color="#58BE3F" />
                </View>
                <View
                    className="flex-1 ml-2 border-b border-b-white pb-2"
                >
                    <Text
                        className="text-lg"
                    >Facebook</Text>
                    <Text
                        className="text-[#aaa] text-[7px]"
                    >tawssilat</Text>
                    <Text
                        className="text-[#aaa] text-[7px]"
                    >Vous pouvez nous rejoindre sur Facebook</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => instgarm()}
                className="flex flex-row px-5 mt-5"
            >
                <View
                    className="bg-white w-10 h-10 my-auto mx-auto rounded-full flex justify-center items-center"
                >
                    <FontAwesome name="instagram" size={30} color="#58BE3F" />

                </View>
                <View
                    className="flex-1 ml-2 border-b border-b-white pb-2"
                >
                    <Text
                        className="text-lg"
                    >Instagram</Text>
                    <Text
                        className="text-[#aaa] text-[7px]"
                    >tawssilat_12</Text>
                    <Text
                        className="text-[#aaa] text-[7px]"
                    >Vous pouvez nous rejoindre sur Instagram</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => openWhatsApp("+213798888642")}
                className="flex flex-row px-5 mt-5 mb-5"
            >
                <View
                    className="bg-white w-10 h-10 my-auto mx-auto rounded-full flex justify-center items-center"
                >
                    <FontAwesome name="whatsapp" size={30} color="#58BE3F" />
                </View>
                <View
                    className="flex-1 ml-2 border-b border-b-white pb-2"
                >
                    <Text
                        className="text-lg"
                    >Whatsapp</Text>
                    <Text
                        className="text-[#aaa] text-[7px]"
                    >Vous pouvez discuter avec nous sur Whatsapp</Text>
                    <Text
                        className="text-[#aaa] text-[7px]"
                    >+213 0798888642</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Support