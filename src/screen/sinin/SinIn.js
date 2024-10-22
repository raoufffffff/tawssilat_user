import { Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SinIn = () => {
    const naviagtion = useNavigation()
    const [sin, setsin] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        city: "baraki"
    })
    const [louding, setlouding] = useState(false)
    const showToast = (a) => {
        Toast.show({
            type: 'error',
            text1: a ? a : "pls write all information",
            text2: a ? a : "we are good to go"
        });
    };
    const addToStorage = async (a) => {
        const jsonValue = JSON.stringify(a);
        await AsyncStorage.setItem('hamoudi', jsonValue)
            .then((res) => {
                showToast(true)
                naviagtion.reset({
                    index: 0,
                    routes: [{ name: 'welcomeOne' }]
                })
            })
            .catch(err => {
                showToast(false)
            })
    }
    const sinin = async () => {
        setlouding(true)
        if (sin.name == "" || sin.password == "" || sin.phone == "" || sin.email == "") {
            showToast()
            setlouding(false)
            return
        }

        await axios.post("https://tawssilat-user-backend.onrender.com/user", sin)
            .then(res => {
                if (res.data.good) {
                    addToStorage(res.data.result)
                    return
                }
                showToast(res.data.message)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setlouding(false)
            })
    }
    return (
        <ScrollView
            className="flex-1"
        >
            <Toast />
            <Text
                className="text-2xl text-[#555] mt-14 mx-auto"
            >S'inscrire</Text>
            <Text
                className="text-[#777] mt-5 mb-1 mx-auto "
            >Ajoutez vos coordonnées à Sin Up</Text>
            <TextInput
                className="w-10/12 mx-auto bg-[#dedede] rounded-3xl  mt-5 py-3 px-4 mb-2"
                placeholder='Votre nom'
                value={sin.name}
                onChangeText={(t) => setsin({ ...sin, name: t })}
            />
            <TextInput
                className="w-10/12 mx-auto bg-[#dedede] rounded-3xl my-3 py-3 px-4 mb-2"
                placeholder='Votre e-mail'
                value={sin.email}
                onChangeText={(t) => setsin({ ...sin, email: t })}
            />
            <TextInput
                className="w-10/12 mx-auto bg-[#dedede] rounded-3xl my-3 py-3 px-4 mb-2"
                placeholder='téléphone'
                keyboardType='number-pad'
                value={sin.phone}
                onChangeText={(t) => setsin({ ...sin, phone: t })}
            />
            <TextInput
                className="w-10/12 mx-auto bg-[#dedede] rounded-3xl my-3 py-3 px-4 mb-2"
                placeholder='Mot de passe'
                secureTextEntry={true}
                value={sin.password}
                onChangeText={(t) => setsin({ ...sin, password: t })}
            />
            <TextInput
                className="w-10/12 mx-auto bg-[#dedede] rounded-3xl my-3 py-3 px-4 mb-2"
                secureTextEntry={true}
                placeholder='Confirm Mot de passe'
            />
            <TouchableOpacity
                className="bg-[#FC6011] w-10/12 py-3 rounded-3xl mx-auto mt-5"
                onPress={() => sinin()}
            >
                <Text
                    className="text-white mx-auto text-lg "
                >
                    {louding ? <ActivityIndicator color="#fff" /> : "Sin Up"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="flex flex-row w-full justify-center mt-10"
                onPress={() => naviagtion.navigate('log')}
            >
                <Text
                    className="text-[#7C7D7E]"
                >Vous avez déjà un compte ?</Text>
                <Text
                    className="text-[#FC6011]"
                >Se connecter</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default SinIn