import { SafeAreaView, ScrollView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Top from '../../compunent/top/Top'
import Header from '../../compunent/header/Header'
import Search from '../../compunent/Search/Search'
import Adds from '../../compunent/Adds/Adds'
import ResturentHome from '../../compunent/ResturentHome/ResturentHome'

const Home = () => {
    const [user, setUser] = useState({})
    const [scrollY, setScrollY] = useState(0); // State to keep track of scroll position

    const handleScroll = (event) => {
        // Extract scroll position from event
        const yOffset = event.nativeEvent.contentOffset.y;
        setScrollY(yOffset);
    };
    console.log(scrollY);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('hamoudi')
                if (jsonValue != null) {
                    setUser(JSON.parse(jsonValue))
                }
            } catch (error) {
                console.error('Failed to fetch user data', error)
            }
        }

        fetchUser()
    }, [])


    return (
        <SafeAreaView className={`flex-1 bg-white  ${scrollY > 80 && "pt-3"}`}>
            {scrollY > 80 && <Header p={true} ret={false} showlogo={true} />
            }
            <ScrollView
                onScroll={handleScroll}
            >
                <Top name={user.name} />


                <Header ret={false} showlogo={true} />
                <ScrollView>
                    <Search />
                    <Text className="text-xl px-3 font-semibold mt-3">Offres que vous pourriez aimer</Text>
                    <Adds />
                    <Text className="text-2xl px-3 font-semibold my-3">Restaurants populaires</Text>

                    <ResturentHome />
                </ScrollView>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Home
