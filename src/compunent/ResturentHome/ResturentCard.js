import { View, Text, ImageBackground, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import MyHelp from '../../constanst/HelpAbout';
import { useSelector } from 'react-redux';

const ResturentCard = ({ Resturent }) => {
    const navigation = useNavigation();
    const card = useSelector(state => state.StorCard);
    let { des, timeing, price } = MyHelp(card.location, Resturent);

    const [bgLoading, setBgLoading] = useState(true); // For background image loading
    const [logoLoading, setLogoLoading] = useState(true); // For logo image loading

    const validBgUri = Resturent.bg && Resturent.bg !== ""; // Check for valid background image URI
    const validLogoUri = Resturent.logo && Resturent.logo !== ""; // Check for valid logo URI

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('resturent', {
                id: Resturent._id,
            })}
            className="w-11/12 mx-auto relative rounded-xl border border-[#ccc8] my-3 overflow-hidden pb-3"
        >
            <Text
                className="absolute z-50 bg-[#9F9E9E] text-white px-2 py-1 left-2 top-2 rounded-xl"
            >
                {timeing + 30} min
            </Text>
            <Text
                className={`absolute z-50 bg-white font-bold px-2 py-1 right-2 top-2 rounded-xl ${Resturent.open ? "text-green-500" : "text-red-500"}`}
            >
                {Resturent.open ? "ouvrir" : "fermé"}
            </Text>
            <Text
                className="absolute z-50 bg-[#9F9E9E] text-white px-2 py-1 left-20 top-2 rounded-xl"
            >
                {price} Da
            </Text>

            {/* Background Image with Placeholder */}
            <ImageBackground
                source={require('../../../assets/icon.png')} // Placeholder image
                style={{ width: '100%', height: 160 }} // Set dimensions
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
                        source={{ uri: Resturent.bg }} // URI image
                        style={{ width: '100%', height: 160, position: 'absolute' }}
                        onLoad={() => setBgLoading(false)} // Hide spinner after image loads
                        onError={() => setBgLoading(false)} // In case of an error
                    />
                )}
            </ImageBackground>

            <View className="px-2 mt-2">
                <View className="flex flex-row items-center">
                    <Text className="text-xl font-bold">{Resturent.name}</Text>
                </View>
                <View className="flex flex-row items-center mt-3">
                    <Entypo name="location-pin" size={20} color="#FC6011" />
                    <Text className="text-sm text-[#777]">{Resturent.city}</Text>
                    <Text className="bg-[#FC6011] text-white py-0.5 px-1.5 rounded-xl ml-5 text-xs">
                        {Number(des / 1000).toFixed(1)} KM
                    </Text>
                </View>
            </View>

            {/* Logo Image with Placeholder */}
            <ImageBackground
                source={require('../../../assets/icon.png')} // Placeholder for logo
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
                        source={{ uri: Resturent.logo }} // URI image for logo
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                        onLoad={() => setLogoLoading(false)} // Hide spinner after image loads
                        onError={() => setLogoLoading(false)} // Handle error cases
                    />
                )}
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default ResturentCard;
