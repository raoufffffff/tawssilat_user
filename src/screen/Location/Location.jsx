import { View, Image, ActivityIndicator, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { getlocarion } from '../../stor/StorCart'
import { SafeAreaView } from 'react-native-safe-area-context'

const Locations = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null) // State for error messages

    const fetchLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }

            let { coords } = await Location.getCurrentPositionAsync({})
            const userLocation = { latitude: coords.latitude, longitude: coords.longitude }
            setLocation(userLocation)
            if (userLocation) {
                dispatch(getlocarion(userLocation))
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'home' }]
                })
            }
        } catch (error) {
            console.log('Failed to fetch location', error)
            setErrorMsg('Failed to fetch location')
        }
    }

    useEffect(() => {
        fetchLocation()
    }, [])






    return (
        <SafeAreaView className="flex-1 bg-white">
            <Image
                source={require('../../../assets/location.png')}
                className="w-full h-4/6"
            />

            <View className="absolute  flex justify-center flex-1 items-center w-full h-full">
                <ActivityIndicator color={"#fc6011"} size={40} />
            </View>

            {!location && (
                <View className="w-full bg-white py-2 px-3 rounded-xl absolute bottom-36">
                    <Text className="mx-auto my-5 text-lg text-center font-bold">
                        Pour vous rendre dans les restaurants à proximité active GPS
                    </Text>
                    <TouchableOpacity
                        className="bg-[#fc6011] w-10/12 mx-auto rounded-xl py-1 mt-4"
                        onPress={() => fetchLocation()}
                    >

                        <Text
                            style={styles.text}

                        >
                            active GPS
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {

        fontSize: 26,
        borderRadius: 30,
        textAlign: "center",
        color: "white",
        textTransform: "capitalize",
        marginHorizontal: "auto",
        paddingVertical: 5
    }
});

export default Locations;
