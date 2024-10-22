import { View, Text, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getreide } from '../../stor/StorCart';

const FoodCard = ({ food, price }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('food', {
                    id: food._id,
                });
                dispatch(getreide(price));
            }}
            className="w-11/12 mx-auto flex flex-row relative rounded-xl my-3 h-32 border border-[#ccca] overflow-hidden"
        >
            <Image
                source={{ uri: food.img }} // Replace with your placeholder image path

                className="w-5/12 rounded-tl-xl rounded-bl-xl z-50"
            />
            <View
                className="absolute top-0 left-0 w-5/12 overflow-hidden"
            >
                <Image
                    source={require('../../../assets/adds-3.jpeg')}
                    className="w-full"
                    resizeMode='cover'
                />
            </View>
            <View className="px-2 py-2 w-7/12">
                <Text className="text-xl font-[700] capitalize mb-3">{food.name}</Text>
                <Text>{food.des}</Text>
                <View className="mt-auto flex flex-row justify-end">
                    {food.newPrice > 0 && (
                        <Text className="text-lg font-bold text-[#7777] line-through mr-2">
                            {food.price} DA
                        </Text>
                    )}
                    <Text className="text-lg font-bold text-[#FC6011]">
                        {food.newPrice > 0 ? food.newPrice : food.price} DA
                    </Text>
                </View>
            </View>
        </TouchableOpacity >
    );
};

export default FoodCard;
