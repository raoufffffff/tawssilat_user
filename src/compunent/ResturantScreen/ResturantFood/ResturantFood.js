import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ResturantSearch from '../Resturentsearch/ResturantSearch'
import axios from 'axios'
import FoodCard from '../../foodCrad/FoodCard'

const ResturantFood = ({ rest, price }) => {
    const [Food, setFood] = useState([])
    const [Search, setSearch] = useState('')
    const [Type, setType] = useState('All Item')
    const ChangeSearch = (a) => {
        setSearch(a)
    }
    const myTabs = rest.menu.map(e => {
        return <Text
            className={`${Type == e ? "text-white bg-[#FC6011]" :
                "border border-[#777a]  "} px-3 py-1 rounded-xl mx-2`}
            onPress={() => setType(e)}
            key={e}
        >{e}</Text>
    })
    useEffect(() => {
        const getMyfood = async () => {
            await axios.get(`https://tawssilat-user-backend.onrender.com/rest/food/${rest._id}`)
                .then(res => {
                    setFood(res.data.reslut)
                })
                .catch(err => console.log(err))
        }
        getMyfood()
    }, [])


    let MyFood = Search != "" ? Food.filter(e => e.name.includes(Search) && !e.out).map((e, i) => {
        return <FoodCard price={price} food={e} key={i} />
    }) : Type != "All Item" ? Food.filter(e => e.type == Type && !e.out).map((e, i) => {
        return <FoodCard food={e} price={price} key={i} />
    }) : Food.filter(e => !e.out).map((e, i) => {
        return <FoodCard food={e} price={price} key={i} />
    })





    return (
        <View
            className="mt-10"
        >
            <ResturantSearch Search={Search} ChangeSearch={ChangeSearch} />
            <ScrollView
                className="mt-5 w-full"
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <Text
                    className={`${Type === "All Item" ? "text-white bg-[#FC6011]" : "border border-[#777a] text-[#FC6011"} px-3 py-1 rounded-xl mx-2`}
                    onPress={() => setType("All Item")}
                >Tout article</Text>
                {myTabs}</ScrollView>
            <View
                className="mt-7 pb-16"
            >
                {MyFood}
            </View>
        </View>
    )
}

export default ResturantFood