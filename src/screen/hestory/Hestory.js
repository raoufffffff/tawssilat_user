import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import Loading from '../../compunent/laoding/Loading'
import Header from '../../compunent/header/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Hestory = () => {
    const navigation = useNavigation()
    const route = useRoute().params
    const [orders, setorders] = useState([])
    const [loading, setLoading] = useState(true);
    const [refrsh, setrefrsh] = useState(false)
    const [id, setId] = useState(null);
    useEffect(() => {
        const getStorage = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('hamoudi');
                const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
                if (userData) {
                    setId(userData._id);
                }
            } catch (e) {
                console.error('Error reading AsyncStorage data:', e);
            }
        };

        getStorage();
    }, []);
    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await axios.get(`https://tawssilat-user-backend.onrender.com/order/my/${id}`);

                setorders(res.data.result);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        getOrder()
        const refrshing = setTimeout(() => {
            setrefrsh(p => !p);
        }, 5000);

        return () => clearTimeout(refrshing); // Proper cleanup
    }, [refrsh]); // Dependency array
    if (orders.length === 0) {
        return <Loading />
    }
    const mycurrentorder = orders.map(e => {
        return <TouchableOpacity
            onPress={() => {
                navigation.navigate('truck', { id: e._id })
            }}
            key={e._id}
            className="w-11/12 mx-auto my-1 py-1 rounded-xl px-2 border border-[#aaa3]"
        >
            <View
                className="flex flex-row items-center pb-1 border-b-[0.5px] border-b-[#aaa3] mb-2"
            >
                <View
                    className="bg-[#fc6011] w-2 h-2 mr-3 rounded-full"
                ></View>
                <Text
                    className="text-xl font-bold text-[#777e]"
                >{e.restaurant.name}</Text>
            </View>
            <View>
                <View
                    className="flex flex-row justify-between w-8/12 ml-auto my-0.5"
                >
                    <Text
                        className="font-bold"
                    >Order Price :</Text>
                    <Text
                        className="bg-[#707070] text-white px-1 py-0.5 rounded-lg"
                    >{e.price} DA</Text>
                </View>
                <View
                    className="flex flex-row justify-between w-8/12 ml-auto my-0.5"
                >
                    <Text
                        className="font-bold"
                    >Delivery Cost :</Text>
                    <Text
                        className="bg-[#707070] text-white px-1 py-0.5 rounded-lg"
                    >{e.ride} DA</Text>
                </View>
                <View
                    className="flex flex-row justify-between w-8/12 ml-auto my-0.5"
                >
                    <Text
                        className="font-bold"
                    >total :</Text>
                    <Text
                        className="bg-[#707070] text-white px-1 py-0.5 rounded-lg"
                    >{e.ride + e.price} DA</Text>
                </View>


            </View>
        </TouchableOpacity>
    })
    return (
        <View
            className="flex-1 pt-4"
        >
            <Header ret={true} showlogo={true} text={"histoire"} />
            <ScrollView>
                {mycurrentorder}
            </ScrollView>
        </View>
    )
}

export default Hestory