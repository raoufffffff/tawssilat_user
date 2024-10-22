import { View, Text, Image, Linking, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import Loading from '../../compunent/laoding/Loading'
import Header from '../../compunent/header/Header'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AreYouSure from './AreYouSure'
const Truck = () => {
    const navigation = useNavigation()
    const route = useRoute().params
    const [order, setorder] = useState({})
    const [orderStatus, setorderStatus] = useState(0)
    const [refrsh, setrefrsh] = useState(false)
    const [AreYouSureC, setAreYouSure] = useState(false)
    const [louding, setlouding] = useState(true)
    const call = (phone) => {
        Linking.openURL(`tel:${phone}`).catch((err) =>
            Alert.alert('Error', 'Failed to make a call', [{ text: 'OK' }], { cancelable: false })
        );
    }
    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await axios.get(`https://tawssilat-user-backend.onrender.com/order/${route.id}`);
                console.log(res.data.result);
                setorder(res.data.result);
                if (res.data.result.restaurantOK) {
                    setorderStatus(1)
                }
                if (res.data.result.livrorTake) {
                    setorderStatus(2)
                }
                if (res.data.result.livrorTakefrom) {
                    setorderStatus(3)
                }
                if (res.data.result.complate) {
                    setorderStatus(4)
                }


            } catch (err) {
                console.log(err);
            } finally {
                setlouding(false);
            }
        };

        getOrder();

        const refrshing = setTimeout(() => {
            setrefrsh(p => !p);
        }, 5000);

        return () => clearTimeout(refrshing); // Proper cleanup
    }, [refrsh]); // Dependency array

    if (louding) {
        return <Loading />
    }
    const check = (name, status) => {
        if (name === "en attendant les restaurants" && status > 0) {
            return true
        }
        if (name === "chaf au travail" && status > 1) {
            return true
        }
        if (name === "le livreur pick up" && status > 2) {
            return true
        }
        if (name === "le livreur est arrivé" && status > 3) {
            return true
        }
        return false
    }
    console.log(orderStatus);

    const steps = [
        {
            name: "en attendant les restaurants",
            name2: "Commande acceptée",
            icon: <MaterialCommunityIcons name="timer-sand" size={30} color="black" />,
            iconT: <MaterialCommunityIcons name="timer-sand" size={30} color="#fff" />,
        },
        {
            name: "chaf au travail",
            name2: "Commande prête",
            icon: <MaterialCommunityIcons name="chef-hat" size={30} color="black" />,
            iconT: <MaterialCommunityIcons name="chef-hat" size={30} color="#fff" />,
        },
        {
            name: "le livreur pick up",
            name2: "Commande récupérée",
            icon: <Fontisto name="motorcycle" size={30} color="black" />,
            iconT: <Fontisto name="motorcycle" size={30} color="#fff" />,
        },
        {
            name: "le livreur est arrivé",
            name2: "Commande livrée",
            icon: <MaterialIcons name="gpp-good" size={30} color="black" />,
            iconT: <MaterialIcons name="gpp-good" size={30} color="#fff" />,
        }
    ].map(e => {
        return <View
            key={e.name}
        >
            <View
                className="w-10/12 mx-auto flex flex-row my-2 items-center"

            >
                <View
                    className={`p-3 ${e.name === "le livreur pick up" && "px-4"} ${check(e.name, orderStatus) ? " bg-[#fc6011]" : "border border-[#aaa3]"} rounded-full`}
                >
                    {check(e.name, orderStatus) ? e.iconT : e.icon}
                </View>
                <View>

                    <Text
                        className={`${check(e.name, orderStatus) && "text-[#fc6011]"} text-2xl ml-4`}
                    >{check(e.name, orderStatus) ? e.name2 : e.name}</Text>
                    {e.name === "le livreur pick up" && orderStatus > 2 && <Text
                        onPress={() => {
                            call(order.livror.phone)
                        }}
                        className="bg-[#3370ff] text-center w-40 text-white px-2 py-1 mx-3 mt-3 rounded-xl"
                    >appeler le chauffeur</Text>}
                </View>
            </View>
            {e.name != "le livreur est arrivé" && <Image
                source={require('../../../assets/truck.gif')}
                className="w-3 h-10 ml-[51px] my-1"
            />}
        </View>
    })
    if (order.cancel) {
        return <View
            className="flex-1 pt-4"
        >
            <Header ret={true} text={"traking"} showlogo={true} />
            <View
                className="flex-1 flex  items-center"
            >
                <Image
                    source={require('../../../assets/cancel.png')}
                    className="w-11/12 h-56 mt-10"
                    resizeMode='center'
                />
                <Text
                    className="text-red-500 font-bold text-xl"
                >cette commande a été annulée</Text>
            </View>
        </View>
    }

    const cancelOrder = async () => {
        try {
            await axios.get(`https://tawssilat-user-backend.onrender.com/order/cancel/${route.id}`)
                .then(res => {
                    if (res.data.good) {
                        navigation.navigate('home')
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    const hide = () => {
        setAreYouSure(false)
    }
    return (
        <View
            className="flex-1 pt-4 "
        >
            <Header ret={true} text={"suivi"} showlogo={true} />
            <ScrollView
            >

                {AreYouSureC && <AreYouSure hide={hide} ok={cancelOrder} />}
                <Image
                    source={require('../../../assets/line.png')}
                    className="w-10/12 h-32"
                    resizeMode='center'
                />
                <View
                    className="flex"
                >
                    {steps}
                </View>
                <View
                    className="w-full py-2   bg-[#fc6011] mx-auto   rounded-lg my-5"
                >
                    {orderStatus === 0 ?
                        <Text
                            onPress={() => {
                                console.log("llk")
                                setAreYouSure(true)
                            }}
                            className="text-white text-center text-lg z-50"
                        >annuler la commande</Text>
                        :
                        orderStatus === 1 ?
                            <Text
                                className="text-white text-center text-lg"
                            >votre Commande acceptée et en préparation</Text>
                            :
                            orderStatus === 2 ?
                                <Text
                                    className="text-white text-center text-lg"
                                >votre Commande prête, le livreur va la récupérer</Text>
                                :
                                <Text
                                    className="text-white text-center text-lg"
                                >Le livreur est en route pour livrer votre commande</Text>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Truck