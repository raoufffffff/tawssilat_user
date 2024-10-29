import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated, { FadeInUp } from 'react-native-reanimated'
const Header = ({ ret, showlogo, text, p }) => {
    const navigation = useNavigation()
    const [orders, setorders] = useState([])
    const [loading, setLoading] = useState(true);
    const [refrsh, setrefrsh] = useState(false)
    const [id, setId] = useState(null);
    const [user, setuser] = useState(null)
    useEffect(() => {
        const getStorage = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('hamoudi');
                const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
                if (userData) {
                    setId(userData._id);
                    setuser(userData)
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
    return (
        <Animated.View
            entering={FadeInUp.delay(p ? 100 : 300).springify().damping()}
            className={` w-full flex flex-row px-3   justify-between  items-center mb-2`}
        >
            {ret ?
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={require('../../../assets/return.png')}
                        className="h-12 w-12"
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    className="flex flex-row items-center relative"
                    onPress={() => {
                        navigation.navigate('currentorder', { id: id })
                    }}
                >

                    <Image
                        source={require('../../../assets/header-i.png')}
                        className="mr-2"
                    />
                    <View>
                        <Text
                            className="text-[12px] text-[#B6B7B7]"
                        >Livraison à vous</Text>
                        <Text
                            className="font-bold text-lg"
                        >{loading ? <ActivityIndicator /> : orders.filter(e => !e.cancel && !e.complate).length > 0 ? `vous respectez ${orders.filter(e => !e.cancel).length}  commandes` : "Vous n'avez pas de command"}</Text>
                    </View>
                </TouchableOpacity>
            }
            {text && <Text className="flex-1 text-2xl ml-3">{text}</Text>}
            {showlogo && <TouchableOpacity
                onPress={() => {
                    navigation.navigate('nav')
                }}
                className="rounded-full bg-[#fc6011] flex px-4 py-2"
            >
                {user &&
                    <Text
                        className="text-2xl  text-white   rounded-xl "

                    >{user.name[0]}</Text>

                }
            </TouchableOpacity>}
        </Animated.View>
    )
}

export default Header