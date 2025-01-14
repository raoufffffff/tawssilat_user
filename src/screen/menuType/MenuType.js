import { ScrollView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Loading from '../../compunent/laoding/Loading'
import axios from 'axios'
import FoodCard from '../../compunent/foodCrad/FoodCard'
import Header from '../../compunent/header/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const MenuType = () => {
    const [food, setfood] = useState([])
    const { type } = useRoute().params
    useEffect(() => {
        const getfood = async () => {
            await axios.get('https://tawssilat-user-backend.onrender.com/food')
                .then((res) => {
                    console.log(res.data);

                    setfood(res.data.result)
                })
        }
        getfood()
    }, [])
    if (food.length === 0) {
        return <Loading />
    }
    const foodType = food.filter((e) => e.type === type).map((e, i) => {
        return <FoodCard food={e} key={i} />
    })
    return (
        <SafeAreaView>

            <ScrollView
                className="bg-white"
            >
                <Header ret={true} showlogo={true} />
                <Text
                    className="text-3xl ml-5 my-3 font-bold"
                >{type}</Text>
                {foodType}
                {food.filter((e) => e.type === type).length === 0 && <Text
                    className="text-2xl mx-auto capitalize text-[#777] mt-10"
                >Il n'existe pas un tel type</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default MenuType