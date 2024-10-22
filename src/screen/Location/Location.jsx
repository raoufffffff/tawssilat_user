import { View, Image, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { getlocarion } from '../../stor/StorCart'

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

    const translateX = useSharedValue(-300); // Start position (off-screen to the left)

    useEffect(() => {
        translateX.value = withTiming(0, { duration: 500 }); // Move to its original position
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <View className="flex-1 bg-white">
            <Animated.Image
                source={require('../../../assets/location.png')}
                className="w-full h-4/6"
            />

            <View className="absolute  top-[310px] left-40">
                <ActivityIndicator color={"#fc6011"} size={40} />
            </View>

            {!location && (
                <View className="w-full bg-white py-2 px-3 rounded-xl absolute bottom-36">
                    <Text className="mx-auto my-5 text-lg text-center font-bold">
                        Pour vous rendre dans les restaurants à proximité active GPS
                    </Text>
                    <Animated.Text
                        style={[styles.text, animatedStyle]}
                        onPress={() => fetchLocation()}
                    >
                        active GPS
                    </Animated.Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        width: "90%",
        backgroundColor: "#fc6011",
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
