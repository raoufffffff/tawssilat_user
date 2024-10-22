import { ScrollView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Loading from '../../compunent/laoding/Loading'
import axios from 'axios'
import FoodCard from '../../compunent/foodCrad/FoodCard'
import Header from '../../compunent/header/Header'

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
        <ScrollView>
            <Header ret={true} showlogo={true} />
            <Text
                className="text-3xl ml-5 my-3 font-bold"
            >{type}</Text>
            {foodType}
        </ScrollView>
    )
}

export default MenuType