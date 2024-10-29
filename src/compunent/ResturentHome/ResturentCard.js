import { View, Text, ImageBackground, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import MyHelp from '../../constanst/HelpAbout';
import { useSelector } from 'react-redux';

const ResturentCard = ({ Resturent }) => {
    const navigation = useNavigation();
    const card = useSelector(state => state.StorCard);
    const { des, timeing, price } = MyHelp(card.location, Resturent);

    const [bgLoading, setBgLoading] = useState(true);
    const [logoLoading, setLogoLoading] = useState(true);

    const validBgUri = Resturent.bg && Resturent.bg.trim() !== "";
    const validLogoUri = Resturent.logo && Resturent.logo.trim() !== "";

    // Return null if the distance is more than 3500 meters
    // if (des > 3500) return null;

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('resturent', { id: Resturent._id })}
            className="w-11/12 mx-auto relative rounded-xl border border-[#ccc8] my-3 overflow-hidden pb-3"
        >
            {/* Delivery Time */}
            <Text className="absolute z-50 bg-[#9F9E9E] text-white px-2 py-1 left-2 top-2 rounded-xl">
                {timeing + 30} min
            </Text>

            {/* Open/Closed Status */}
            <View
                className={`absolute z-50 bg-white font-bold px-2 py-1 right-2 top-2 rounded-xl`}
            >

                <Text
                    className={` ${Resturent.open ? 'text-green-500' : 'text-red-500'}`}
                >
                    {Resturent.open ? 'ouvrir' : 'fermé'}
                </Text>
            </View>

            {/* Price */}
            <Text className="absolute z-50 bg-[#9F9E9E] text-white px-2 py-1 left-20 top-2 rounded-xl">
                {price} Da
            </Text>

            {/* Background Image with Loading Indicator */}
            <ImageBackground
                source={require('../../../assets/p-b.jpg')} // Placeholder image
                style={{ width: '100%', height: 160 }}
                className="relative"
            >
                {bgLoading && validBgUri && (
                    <ActivityIndicator
                        size="large"
                        color="#FC6011"
                        style={{ position: 'absolute', left: '50%', top: '50%', transform: [{ translateX: -12 }, { translateY: -12 }] }}
                    />
                )}
                {validBgUri && (
                    <Image
                        source={{ uri: Resturent.bg }}
                        style={{ width: '100%', height: 160, position: 'absolute' }}
                        onLoad={() => setBgLoading(false)}
                        onError={() => setBgLoading(false)}
                    />
                )}
            </ImageBackground>

            {/* Restaurant Info */}
            <View className="px-2 mt-2">
                <View className="flex flex-row items-center">
                    <Text className="text-xl font-bold">{Resturent.name}</Text>
                </View>

                {/* Location and Distance */}
                <View className="flex flex-row items-center mt-3">
                    <Entypo name="location-pin" size={20} color="#FC6011" />
                    <Text className="text-sm text-[#777]">{Resturent.city}</Text>
                    <View
                        className="bg-[#FC6011] text-white py-0.5 px-1.5 rounded-xl ml-5 text-xs"
                    >

                        <Text className="  text-white  text-xs">
                            {Number(des / 1000).toFixed(1)} KM
                        </Text>
                    </View>
                </View>
            </View>

            {/* Logo Image with Loading Indicator */}
            <ImageBackground
                source={require('../../../assets/p-s.jpg')} // Placeholder for logo
                style={{ width: 80, height: 80, position: 'absolute', right: 12, bottom: 10, borderRadius: 12, overflow: 'hidden' }}
            >
                {logoLoading && validLogoUri && (
                    <ActivityIndicator
                        size="small"
                        color="#FC6011"
                        style={{ position: 'absolute', left: '50%', top: '50%', transform: [{ translateX: -10 }, { translateY: -10 }] }}
                    />
                )}
                {validLogoUri && (
                    <Image
                        source={{ uri: Resturent.logo }}
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                        onLoad={() => setLogoLoading(false)}
                        onError={() => setLogoLoading(false)}
                    />
                )}
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default ResturentCard;
