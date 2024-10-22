import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { clear } from '../../stor/StorCart'

const Confirm = ({ order, cancel }) => {
    const [louding, setlouding] = useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const postOrder = async () => {
        setlouding(true)
        await axios.post(`https://tawssilat-api.onrender.com/order`, order)
            .then(res => {
                if (res.data.good) {
                    setlouding(false)
                    dispatch(clear())
                    cancel()
                    navigation.navigate('thanks', { id: res.data.result._id })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <TouchableOpacity

                onPress={cancel}
                className="absolute -top-0 left-0 w-full h-full bg-black opacity-30"
            ></TouchableOpacity>
            <View
                className="absolute z-[100] bottom-0 left-0 h-40 rounded-t-3xl bg-[#fff] w-full pt-4"
            >
                <Text
                    className="mx-auto mt-3 mb-7 text-2xl font-bold"
                >Confirmez votre commande</Text>
                <View
                    className="flex flex-row justify-center"
                >
                    <Text
                        onPress={cancel}
                        className="mx-3 text-xl mt-3 text-white bg-red-500 rounded-xl px-2 py-1"
                    >Annuler</Text>
                    {louding ?
                        <Text
                            className="mx-3 text-xl mt-3 text-white bg-green-500 rounded-xl px-10 py-1 "
                        ><ActivityIndicator color="#fff" /></Text>
                        : <Text
                            onPress={() => postOrder()}
                            className="mx-3 text-xl mt-3 text-white bg-green-500 rounded-xl px-2 py-1"
                        > confirm</Text>}
                </View>
            </View>
        </>
    )
}

export default Confirm