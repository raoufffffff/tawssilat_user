import { Text, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../compunent/header/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
const Feedback = () => {
    const navigation = useNavigation()
    const [louding, setlouding] = useState(false)
    const [feed, setfeed] = useState({
        by: "",
        type: "user",
        body: "",
    })
    useEffect(() => {
        const getuser = async () => {
            const jsonValue = await AsyncStorage.getItem('hamoudi');
            let a = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (a != null) {

                setfeed({ ...feed, by: a._id })
            }
        }
        getuser()
    }, [])
    const showToust = (e) => {
        Toast.show({
            type: e ? 'success' : 'error',
            text1: e ? "thanks for your feedback" : "something went wrong",
            text2: e ? "we will do our best to improve the service" : "try again",
        })
    }
    const sendFeed = async () => {
        setlouding(true)
        await axios.post(`https://tawssilat-user-backend.onrender.com/feedback`, feed)
            .then(() => {
                showToust(true)
                setTimeout(() => {
                    navigation.navigate("home")
                }, 1000);
            })
            .catch(() => {
                showToust(false)
            })
            .finally(() => {
                setlouding(false)
            })
    }

    return (
        <ScrollView
            className="flex-1  pt-1 bg-white"
        >
            <Toast />
            <Header ret={true} showlogo={false} text={"FeedBack"} />
            <Image
                source={require('../../../assets/Feed.png')}
                className="mx-auto mt-5"
            />
            <Text
                className="text-3xl capitalize mx-auto"
            >Feedback</Text>
            <Text
                className="text-xs text-[#777] mt-4 text-center w-11/12 mx-auto"
            >Qu'est-ce que tu aimes</Text>
            <TextInput
                placeholder='write your feedback about the app'
                numberOfLines={5}
                placeholderTextColor={"#777a"}
                className="border border-[#7772] w-11/12 mx-auto px-3 rounded-xl mt-4"
                value={feed.body}
                onChangeText={(t) => setfeed({ ...feed, body: t })}
            />
            <TouchableOpacity
                className="w-9/12 py-1 rounded-xl mx-auto mt-4 bg-[#58BE3F]"
                onPress={() => sendFeed()}
            >
                <Text
                    className="mx-auto text-xl text-white font-bold"
                >{louding ? <ActivityIndicator color="#fff" /> : "Envoyer"}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Feedback