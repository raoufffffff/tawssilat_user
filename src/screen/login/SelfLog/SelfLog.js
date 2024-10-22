import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SelfLog = ({ showToast }) => {
    const naviagtion = useNavigation()
    const [log, setlog] = useState({
        email: "",
        password: ""
    })

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
    const [louding, setlouding] = useState(false)
    const login = async () => {
        setlouding(true)
        await axios.post('https://tawssilat-user-backend.onrender.com/auth', log)
            .then((res) => {
                if (!res.data.good) {
                    showToast(false, res.data.message)
                    return
                }
                addToStorage(res.data.result)
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setlouding(false)
            })
    }
    return (
        <View
            className="w-full"
        >
            <TextInput
                className="w-10/12 mx-auto bg-[#dedede] rounded-3xl mt-10 py-3 px-4 mb-2"
                placeholder='Votre e-mail'
                value={log.email}
                onChangeText={(t) => setlog({ ...log, email: t })}
            />
            <TextInput
                className="w-10/12 mx-auto bg-[#dedede] rounded-3xl mt-4 mb-2 py-3 px-4"
                secureTextEntry={true}
                placeholder='Mot de passe'
                value={log.password}
                onChangeText={(t) => setlog({ ...log, password: t })}
            />
            <TouchableOpacity
                className="bg-[#FC6011] w-10/12 py-3 rounded-3xl mx-auto mt-5"
                onPress={() => login()}

            >
                <Text
                    className="text-white mx-auto text-lg "

                >
                    {louding ? <ActivityIndicator color="#fff" /> : "Se connecter"}
                </Text>
            </TouchableOpacity>
            <Text
                className="mx-auto mt-5 text-[#555]"
            >
                Mot de passe oublié ?
            </Text>
        </View>
    )
}

export default SelfLog