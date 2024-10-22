import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import RssturentInpho from '../../compunent/ResturantScreen/ResturantScreenInpho/RssturentInpho'
import ResturantFood from '../../compunent/ResturantScreen/ResturantFood/ResturantFood'
import { useDispatch, useSelector } from 'react-redux'
import AntDesign from '@expo/vector-icons/AntDesign';
import MyHelp from '../../constanst/HelpAbout'
import { clear, getreide } from '../../stor/StorCart'
import Loading from '../../compunent/laoding/Loading'
const Resturent = () => {
    const dispatch = useDispatch()
    const card = useSelector(state => state.StorCard)
    const navigation = useNavigation()
    const [rest, setrest] = useState(null)
    const route = useRoute().params
    useEffect(() => {
        const getrest = async () => {
            await axios.get(`https://tawssilat-user-backend.onrender.com/rest/${route.id}`)
                .then(res => {
                    setrest(res.data.reslut)
                })
                .catch(err => console.log(err))
        }
        getrest()

    }, [])
    if (!rest) {
        return <Loading />
    }

    const { price } = MyHelp(card.location, rest)
    return (
        <>
            <ScrollView
                className=" min-h-screen"
            >
                <RssturentInpho rest={rest} location={card.location} />
                <ResturantFood rest={rest} price={price} location={card.location} />


            </ScrollView>
            {card.card.length > 0 && rest._id === card.resourstorId && <TouchableOpacity
                className="bg-[#fc6011] z-[500] absolute w-full bottom-2 py-2 px-5 flex flex-row justify-between items-center"
                onPress={() => {
                    dispatch(getreide(price))
                    navigation.navigate('card', {
                        location: card.location
                    })
                }}
            >
                <Text
                    className="text-white text-xl font-bold"
                >voir la panier</Text>
                <AntDesign name="arrowright"
                    size={30} color="#fff" />
            </TouchableOpacity>}
            {rest._id != card.resourstorId && card.resourstorId != 0 &&
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
                            >Voulez-vous supprimer le panier ?</Text>
                            <Text
                                className="text-[#aaa] px-5 text-center text-xs"
                            >Vous ne pouvez pas acheter dans deux restaurantsen même temps</Text>
                            <View
                                className="flex flex-row justify-center mt-5"
                            >
                                <Text
                                    onPress={() => dispatch(clear())}
                                    className="mx-2 px-2 py-1 rounded-xl border border-[#fc6011] text-[#fc6011]"
                                >Supprimer</Text>
                                <Text
                                    onPress={() => navigation.goBack()}
                                    className="mx-2 px-2 py-1 rounded-xl text-white bg-[#fc6011]"
                                >Sauver un panier</Text>
                            </View>
                        </View>
                    </View>

                </>
            }
        </>
    )
}

export default Resturent