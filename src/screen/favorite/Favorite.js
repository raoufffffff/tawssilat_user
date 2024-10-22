import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loading from '../../compunent/laoding/Loading';
import ResturentCard from '../../compunent/ResturentHome/ResturentCard';
import Header from '../../compunent/header/Header';
import FoodCard from '../../compunent/foodCrad/FoodCard';

const Favorite = () => {
    const [loading, setLoading] = useState(true);
    const [foodShow, setfoodShow] = useState(true)
    const [id, setId] = useState(null);
    const [user, setUser] = useState(null);
    const [rest, setreat] = useState([])
    const [food, setfood] = useState([])
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
        const getUserData = async () => {
            try {
                const res = await axios.get(`https://tawssilat-user-backend.onrender.com/user/${id}`);
                const userData = res.data.result;

                setUser(userData);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (id) {
            getUserData();
        }
    }, [id]);
    useEffect(() => {
        const getRestAndFood = async () => {
            try {
                const resturants = await axios.get(`https://tawssilat-user-backend.onrender.com/rest`)
                const FoodResult = await axios.get(`https://tawssilat-user-backend.onrender.com/food`)
                const restData = resturants.data.reslut
                const FoodData = FoodResult.data.result
                setreat(restData)
                setfood(FoodData)
            } catch (error) {
                console.error('Error fetching user data:', error);

            }
            finally {
                setLoading(false);
            }
        }
        getRestAndFood()


    }, [foodShow]); // Dependency array
    if (loading) {
        return <Loading />
    }
    const myFavoriteResturants = rest.filter(e => user.resFiv.includes(e._id)).map(e => {
        return <ResturentCard Resturent={e} key={e._id} />
    })
    const myFavoriteFood = food.filter(e => user.foodFiv.includes(e._id)).map(e => {
        return <FoodCard food={e} key={e._id} />
    })
    return (
        <View
            className="flex-1 pt-4 w-full bg-white"
        >
            <Header ret={false} showlogo={true} />
            <View
                className="flex flex-row w-11/12 mx-auto rounded-xl overflow-hidden my-2 border border-[#aaa3]"
            >
                <TouchableOpacity
                    className={`w-6/12 flex justify-center py-1 items-center ${foodShow ? "bg-[#fc6011]" : "bg-white"}`}
                    onPress={() => setfoodShow(true)}
                >
                    <Text
                        className={`text-xl font-bold ${foodShow ? "text-white" : "text-black"}`}
                    >Food</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`w-6/12 flex justify-center py-1 items-center ${!foodShow ? "bg-[#fc6011]" : "bg-white"}`}
                    onPress={() => setfoodShow(false)}
                >
                    <Text
                        className={`text-xl font-bold ${!foodShow ? "text-white" : "text-black"}`}
                    >Restaurant</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                className="w-full "
            >
                {foodShow ? myFavoriteFood : myFavoriteResturants}

            </ScrollView>


        </View>
    )
}

export default Favorite