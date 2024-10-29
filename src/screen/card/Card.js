import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../compunent/header/Header'
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Confirm from './Confirm'
import NotOpen from './NotOpen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { remove } from '../../stor/StorCart'
const Card = () => {
    const navigation = useNavigation()
    const [user, setuser] = useState(null)
    const [notopen, setnotopen] = useState(false)
    const [rest, setrest] = useState(null)
    const [confirm, setconfirm] = useState(false)
    const card = useSelector(state => state.StorCard)
    const dispatch = useDispatch()
    const [order, setorder] = useState({
        ride: "",
        items: "",
        price: "",
        userid: "",
        restaurantid: "",
        user: {
            name: "",
            location: card.location,
            phone: "",
        },
        restaurant: {
            name: "",
            location: {},
            phone: "",
        },
    })

    const a = () => {
        let a = 0
        console.log(card.card);

        card.card.map(e => {
            a += e.price * e.q
        })
        console.log(a);

        return a
    }

    const myCardItems = card.card.map((e, i) => {
        return <View
            className="px-3 border-b border-b-[#999a] py-2 flex flex-row items-center justify-between"
            key={i}>

            <View
                className="flex  "
            >
                <Text
                    className="font-bold"
                >{e.q}  <FontAwesome name="times" size={15}
                    color="#fc6011"
                    />  {e.name}</Text>
                {e.addon.map((p, i) => {
                    return <Text
                        className="ml-7 font-bold"
                        key={i}>{p.name}</Text>
                })}
            </View>

            <View
                className="flex flex-row "
            >
                <Text
                    className="font-bold text-[#000a]"
                >{e.price * e.q} DA</Text>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(remove(e.id))
                    }}
                    className="bg-[#fc6011] text-white mr-2 ml-4 "
                >
                    <Entypo name="minus" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    })

    useEffect(() => {
        const getuser = async () => {
            const jsonValue = await AsyncStorage.getItem('hamoudi');
            let a = jsonValue != null ? JSON.parse(jsonValue) : null;
            if (a != null) {
                setuser(a)
            }
        }
        const getrest = async () => {
            await axios.get(`https://tawssilat-user-backend.onrender.com/rest/${card.resourstorId}`)
                .then(res => {
                    setrest(res.data.reslut)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getrest()
        getuser()
    }, [])
    // const { des } = MyHelp()

    const reConfirm = () => {
        if (!rest.open || card.ride > 310) {
            setnotopen(true)
            return
        }

        setorder({
            items: card.card,
            user: {
                ...order.user,
                name: user.name,
                phone: user.phone,
            },
            restaurantid: card.resourstorId,
            userid: user._id,
            price: a(),
            ride: card.ride,
            restaurant: {
                location: rest.location,
                name: rest.name,
                phone: rest.phone
            }
        })
        setconfirm(true)
    }
    const cancel = () => {
        setconfirm(false)
    }

    console.log(card);


    return (
        <SafeAreaView
            className="flex-1 relative"
        >
            {notopen && <NotOpen about={!rest.open ? "Le restaurant est fermé, veuillez commander auprès d'un autre restaurant." : "Le restaurant ne livre pas dans votre région, veuillez commander auprès d'un autre restaurant."} />}
            <ScrollView
                className=" pt-2 bg-white min-h-screen"
            >
                <Header ret={true} showlogo={true} text={"VÉRIFIER"} />
                <Text
                    className="px-5 font-bold text-2xl text-[#666] mt-3"
                >ma panier</Text>
                <View
                    className="bg-[#F6F6F6] w-full mt-3 "
                >
                    {myCardItems}
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('resturent', {
                        id: card.resourstorId
                    })}
                    className="mx-auto mt-5 flex flex-row items-center"
                >
                    <Feather name="plus" size={20} color="#fc6011" />
                    <Text
                        className="text-[#fc6011]  mx-2"
                    >
                        + Ajouter des articles
                    </Text>
                </TouchableOpacity>
                <View
                    className="w-11/12 border-y border-y-[#ccca] mx-auto mt-5 py-3"
                >
                    <View
                        className="flex flex-row justify-between my-2"
                    >
                        <Text
                            className=" font-bold"
                        >
                            Prix de command
                        </Text>
                        <Text
                            className="font-bold text-[#fc6011]"
                        >
                            {a()} DA</Text>
                    </View>
                    <View
                        className="flex flex-row justify-between my-2"
                    >
                        <Text
                            className=" font-bold"
                        >
                            Prix de livraison

                        </Text>
                        <Text
                            className="font-bold text-[#fc6011]"
                        >
                            {card.ride} DA</Text>
                    </View>
                </View>
                <View
                    className="flex flex-row justify-between my-2 px-4"
                >
                    <Text
                        className=" font-bold text-xl"
                    >
                        Prix total
                    </Text>
                    <Text
                        className="font-bold text-xl text-[#fc6011]"
                    >
                        {card.ride + a()} DA</Text>
                </View>
            </ScrollView>
            {card.card.length > 0 && <TouchableOpacity
                className="flex flex-row justify-center absolute bottom-0 bg-green-600 w-full py-2"
                onPress={() => reConfirm()}
            >
                <Text
                    className="text-white text-xl font-bold"
                >Confirmation</Text>
            </TouchableOpacity>}
            {confirm && <Confirm order={order} cancel={cancel} />}
        </SafeAreaView>
    )
}

export default Card