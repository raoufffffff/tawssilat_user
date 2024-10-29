import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../compunent/header/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../compunent/laoding/Loading'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { SafeAreaView } from 'react-native-safe-area-context'

const Personnelles = () => {
    const [user, setuser] = useState(null)
    const navigation = useNavigation()
    const [loading, setloading] = useState(false)
    const [newuser, setnewuser] = useState({
        password: "",
        phone: ""
    })
    const showToast = (r) => {
        Toast.show({
            type: r ? 'success' : 'error',
            text1: r ? "success" : "something went wrong",
            text2: r ? "success" : "something went wrong"
        });
    };
    useEffect(() => {
        const getuser = async () => {
            const jsonValue = await AsyncStorage.getItem('hamoudi');
            let a = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (a != null) {
                setuser(a)
                setnewuser({ password: a.password, phone: a.phone })
            }
        }
        getuser()
    }, [])
    if (!user) {
        return <Loading />
    }
    const savenewdata = async (e) => {
        await AsyncStorage.setItem('hamoudi', JSON.stringify(e))
    }
    const save = async () => {
        setloading(true)
        try {
            await axios.put(`https://tawssilat-user-backend.onrender.com/user/${user._id}`, newuser)
                .then(res => {
                    console.log(res.data);

                    showToast(true)
                    setTimeout(() => {
                        navigation.navigate('home')
                    }, 1000);
                    savenewdata(res.data.result)
                })
        } catch (error) {
            showToast(false)
        } finally {
            setloading(false)
        }
    }
    return (
        <SafeAreaView
            className="flex-1 pt-4"
        >
            <Toast />
            <Header ret={true} text={"personnelles"} />
            {user && <Text
                className="text-5xl mb-2  text-center mx-auto bg-[#fc6011] text-white rounded-full px-8 py-6 mt-5"
            >{user.name[0]}</Text>}

            <Text
                className="mx-auto text-xl my-3"
            >{user.name}</Text>
            <Text
                className="mx-auto text-[#777] mb-3"
            >{user.email}</Text>
            <View
                className="w-full flex justify-center items-center mt-5"
            >
                <View
                    className="w-11/12 bg-[#e1e0e0] px-4 py-2 rounded-2xl my-1.5"
                >
                    <Text
                        className="text-xs text-[#898989]"
                    >téléphone</Text>
                    <TextInput
                        onChangeText={t => setnewuser({ ...newuser, phone: t })}
                        value={newuser.phone}
                    />
                </View>
                <View
                    className="w-11/12 bg-[#e1e0e0] px-4 py-2 rounded-2xl my-1.5"
                >
                    <Text
                        className="text-xs text-[#898989]"
                    >mot de passe</Text>
                    <TextInput
                        secureTextEntry={true}
                        value={newuser.password}
                        onChangeText={t => setnewuser({ ...newuser, password: t })}
                    />
                </View>
                <View
                    className="w-11/12 bg-[#fc6011] px-4 py-2 rounded-2xl mt-5"
                >


                    {!loading ? <Text
                        onPress={() => save()}
                        className="text-2xl text-center text-[#fff] flex justify-center items-center"
                    > sauvegarder</Text>
                        : <ActivityIndicator color={"#fff"} size={30} />}
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Personnelles