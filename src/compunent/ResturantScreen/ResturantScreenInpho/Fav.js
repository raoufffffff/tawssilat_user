import { ImageBackground, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Fav = ({ resId }) => {
    const [id, setId] = useState(null);
    const [user, setUser] = useState(null);
    const [Favs, setFavs] = useState(false);
    const [loading, setLoading] = useState(true);

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
                if (userData.resFiv && userData.resFiv.includes(resId)) {
                    setFavs(true);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getUserData();
        }
    }, [id, resId]);

    const like = async () => {
        setLoading(true);
        try {
            const updatedFoodFav = [...user.resFiv, resId];
            await axios.put(`https://tawssilat-user-backend.onrender.com/user/${id}`, {
                resFiv: updatedFoodFav
            });
            setFavs(true);
            setUser((prevUser) => ({ ...prevUser, resFiv: updatedFoodFav }));
        } catch (error) {
            console.error('Error updating favorite foods:', error);
        } finally {
            setLoading(false);
        }
    };

    const dislike = async () => {
        setLoading(true);
        try {
            const updatedFoodFav = user.resFiv.filter((e) => e !== resId);
            await axios.put(`https://tawssilat-user-backend.onrender.com/user/${id}`, {
                resFiv: updatedFoodFav
            });
            setFavs(false);
            setUser((prevUser) => ({ ...prevUser, resFiv: updatedFoodFav }));
        } catch (error) {
            console.error('Error removing favorite food:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../../../assets/vieu.png')}
            className="absolute -right-5 -top-8 h-16 w-16 flex justify-center items-center z-50"
        >
            {loading ? (
                <ActivityIndicator color={"#fc6011"} />
            ) : Favs ? (
                <Ionicons
                    onPress={dislike}
                    name="heart-sharp"
                    size={30}
                    color="#FC6011"
                />
            ) : (
                <FontAwesome5
                    onPress={like}
                    name="heart"
                    size={24}
                    color="#FC6011"
                />
            )}
        </ImageBackground>
    );
};
export default Fav