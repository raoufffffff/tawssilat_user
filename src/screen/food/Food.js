import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../compunent/header/Header';
import Fontisto from '@expo/vector-icons/Fontisto';
import FoodScreenInpho from '../../compunent/foodScreen/FoodScreenInpho';
import Entypo from '@expo/vector-icons/Entypo';
import { add, clear, newPrice, newRest } from '../../stor/StorCart';
import Loading from '../../compunent/laoding/Loading';
import FoodImg from './FoodImg';

const Food = () => {
    const navigation = useNavigation()
    const card = useSelector(state => state.StorCard)
    const dispatch = useDispatch()
    const [showimg, setshowimg] = useState(false)
    const [food, setfood] = useState(null)
    const [checkadd, setcheckadd] = useState([])
    const route = useRoute().params
    const [item, setitem] = useState({
        name: "",
        price: 0,
        q: 1,
        addon: [],
        id: Math.floor(Math.random() * 1000)
    })
    console.log(item);

    useEffect(() => {
        const getfood = async () => {
            await axios.get(`https://tawssilat-user-backend.onrender.com/food/${route.id}`)
                .then(res => {
                    setfood(res.data.result)
                    setitem({ ...item, name: res.data.result.name, price: res.data.result.newPrice > 0 ? res.data.result.newPrice : res.data.result.price })
                })
                .catch(() => console.log("nik moooook"))
        }
        getfood()
        console.log('o');

    }, [route.id])
    const plus = () => {
        setitem({ ...item, q: item.q + 1 })
    }
    const minus = () => {
        if (item.q == 1) {
            return
        }
        setitem({ ...item, q: item.q - 1 })
    }
    const addAddon = (e) => {
        setitem({ ...item, addon: [...item.addon, e], price: item.price + Number(e.price) })
    }
    const removeAddOn = (e) => {
        let a = item.addon.filter(add => add != e)
        setitem({ ...item, addon: a, price: item.price - e.price })
    }

    if (!food) {
        return <Loading />
    }
    const addon = food.addon.map((e, i) => {
        return <View key={i}
            className="flex flex-row my-1 justify-between"
        >
            <View
                className="flex flex-row"
            >
                <Text
                    className="mx-2"
                >{e.name}</Text>
                <Text>{e.price} DA</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (checkadd.find(a => a === e)) {
                        removeAddOn(e)
                        setcheckadd(p => checkadd.filter(a => a != e))
                    } else {
                        addAddon(e)
                        setcheckadd(p => [...checkadd, e])
                    }
                }}
                className={`h-5 w-5 rounded-full ${checkadd.find(a => a === e) ? "bg-[#fc6011]" : "border border-[#fc6011]"} `}
            ></TouchableOpacity>
        </View>
    })
    console.log(item);
    const hide = () => {
        setshowimg(false)
    }
    return (
        <View className="flex-1">
            {showimg && <FoodImg img={food.img} hide={hide} />}
            <ScrollView
                className=" min-h-screen "
            >
                <ImageBackground
                    source={{ uri: food.img }}
                    className="w-full h-56 pt-4 relative"
                >
                    <TouchableOpacity
                        className="absolute w-full h-full"
                        onPress={() => setshowimg(true)}
                    >

                    </TouchableOpacity>
                    <Header ret={true} showlogo={true} />
                    <FoodScreenInpho food={food} item={item} plus={plus} minus={minus} />
                </ImageBackground>

                {food.addon.length > 0 &&
                    <>
                        <Text
                            className="text-lg mt-44 font-bold px-3"
                        >Personnalisez votre commande</Text>
                        <View
                            className="w-11/12 mx-auto mt-4 py-2 px-3 flex "
                        >
                            {addon}
                        </View>
                    </>}
                <View
                    className={`${food.addon.length > 0 ? "mt-5" : "mt-52"} flex justify-center items-center relative h-44 mb-20 `}
                >
                    <View
                        className="h-44 w-4/12 bg-[#FC6011] absolute left-0 rounded-tr-3xl rounded-br-3xl"
                    ></View>
                    <View
                        className="bg-white w-8/12 h-32 rounded-2xl relative"
                    >
                        <Text
                            className="mt-2 mx-auto font-bold text-[15px]"
                        >Prix total</Text>
                        <Text
                            className="mt-2 mx-auto font-bold text-[15px] text-[#fc6011] text-2xl"
                        >{item.price * item.q} DA</Text>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(add(item))
                                dispatch(newRest(food.by))
                                dispatch(newPrice(card.price + (item.price * item.q)))
                                navigation.navigate('resturent', {
                                    id: food.by,
                                })
                            }}
                            className="bg-[#fc6011] flex flex-row mt-3  items-center justify-between px-3 rounded-xl py-1 mx-auto"
                        >
                            <Fontisto name="shopping-basket-add" size={24} color="#fff" />
                            <Text
                                className="font-bold mx-2 text-white"
                            >Ajouter à la panier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(add(item))
                                dispatch(newRest(food.by))
                                dispatch(newPrice(card.price + (item.price * item.q)))
                                navigation.navigate('resturent', {
                                    id: food.by,
                                })
                            }}
                            className="absolute -right-5 bg-[#fc6011] rounded-full p-3 mt-10"
                        >
                            <Entypo name="shopping-cart" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {food.by != card.resourstorId && card.resourstorId != 0 &&
                <>
                    <View
                        className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
                    >

                    </View>
                    <View
                        className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
                    >
                        <View
                            className="bg-[#fff] z-[500]  w-10/12   px-5 flex rounded-xl py-5"
                        >
                            <Text
                                className="text-lg mx-auto text-center font-bold mb-3"
                            >souhaitez-vous effacer votre carte actuelle</Text>
                            <Text
                                className="text-[#aaa] px-5 text-center text-xs"
                            >vous ne pouvez pas acheter dans deux restaurants en même temps</Text>
                            <View
                                className="flex flex-row justify-center mt-5"
                            >
                                <Text
                                    onPress={() => dispatch(clear())}
                                    className="mx-2 px-2 py-1 rounded-xl border border-[#fc6011] text-[#fc6011]"
                                >claire</Text>
                                <Text
                                    onPress={() => navigation.goBack()}
                                    className="mx-2 px-2 py-1 rounded-xl text-white bg-[#fc6011]"
                                >sauve ma carte</Text>
                            </View>
                        </View>
                    </View>

                </>
            }
        </View>
    )
}

export default Food