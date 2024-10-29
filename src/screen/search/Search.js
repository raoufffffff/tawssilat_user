import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../compunent/header/Header';
import ResturentCard from '../../compunent/ResturentHome/ResturentCard';
import FoodCard from '../../compunent/foodCrad/FoodCard';
import Loading from '../../compunent/laoding/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
    const [loading, setLoading] = useState(true);
    const [rest, setRest] = useState([]);
    const [food, setFood] = useState([]);
    const [search, setSearch] = useState("");
    const [foodShow, setFoodShow] = useState(true);
    const [foodPage, setFoodPage] = useState(1); // Page for food items
    const [restPage, setRestPage] = useState(1); // Page for restaurant items
    const [visibleFood, setVisibleFood] = useState([]); // Visible food items
    const [visibleRest, setVisibleRest] = useState([]); // Visible restaurant items
    const ITEMS_PER_PAGE = 10; // Number of items per load

    useEffect(() => {
        const getRestAndFood = async () => {
            try {
                const resturants = await axios.get(`https://tawssilat-user-backend.onrender.com/rest`);
                const foodResult = await axios.get(`https://tawssilat-user-backend.onrender.com/food`);
                const restData = resturants.data.reslut;
                const foodData = foodResult.data.result;
                setRest(restData);
                setFood(foodData);
                // Load initial food items
                loadMoreFood(1, foodData, true);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        getRestAndFood();
    }, []);

    // Load more food items
    const loadMoreFood = (page, foodData = food, reset = false) => {
        const filteredFood = foodData
            .filter(e => (search !== "" ? e.name.includes(search) : e))
            .filter(e => !e.out);

        const newItems = filteredFood.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
        setVisibleFood(reset ? newItems : [...visibleFood, ...newItems]);
        setFoodPage(page);
    };

    // Load more restaurant items
    const loadMoreRestaurants = (page, restData = rest, reset = false) => {
        const filteredRestaurants = restData.filter(e => (search !== "" ? e.name.includes(search) : e));

        const newItems = filteredRestaurants.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
        setVisibleRest(reset ? newItems : [...visibleRest, ...newItems]);
        setRestPage(page);
    };

    // Handle loading more items when the user reaches the end of the list
    const handleLoadMore = () => {
        if (foodShow) {
            loadMoreFood(foodPage + 1);
        } else {
            loadMoreRestaurants(restPage + 1);
        }
    };

    // Reset lists when switching between tabs or when the search input changes
    const handleTabSwitch = (showFood) => {
        setFoodShow(showFood);
        if (showFood && visibleFood.length === 0) {
            // Load initial food items when switching to the food tab for the first time
            loadMoreFood(1, food, true);
        } else if (!showFood && visibleRest.length === 0) {
            // Load initial restaurant items when switching to the restaurant tab for the first time
            loadMoreRestaurants(1, rest, true);
        }
    };

    // Reset search results and reload data
    const handleSearchChange = (text) => {
        setSearch(text);
        if (foodShow) {
            loadMoreFood(1, food.filter(e => e.name.includes(text)), true);
        } else {
            loadMoreRestaurants(1, rest.filter(e => e.name.includes(text)), true);
        }
    };

    if (loading) {
        return <Loading />;
    }

    const renderItem = ({ item }) => (
        foodShow ? <FoodCard food={item} key={item._id} /> : <ResturentCard Resturent={item} key={item._id} />
    );

    return (
        <SafeAreaView className="bg-white flex-1 pt-4">
            <Header ret={false} showlogo={true} />
            <TextInput
                value={search}
                onChangeText={handleSearchChange}
                className="w-10/12 rounded-xl border border-[#7773] py-1 mx-auto my-2 px-2"
                placeholder='Search'
            />
            <View className="flex flex-row w-11/12 mx-auto rounded-xl overflow-hidden my-2 border border-[#aaa3]">
                <TouchableOpacity
                    className={`w-6/12 flex justify-center py-1 items-center ${foodShow ? "bg-[#fc6011]" : "bg-white"}`}
                    onPress={() => handleTabSwitch(true)}
                >
                    <Text className={`text-xl font-bold ${foodShow ? "text-white" : "text-black"}`}>Food</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`w-6/12 flex justify-center py-1 items-center ${!foodShow ? "bg-[#fc6011]" : "bg-white"}`}
                    onPress={() => handleTabSwitch(false)}
                >
                    <Text className={`text-xl font-bold ${!foodShow ? "text-white" : "text-black"}`}>Restaurant</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={foodShow ? visibleFood : visibleRest}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                onEndReached={handleLoadMore} // Load more when reaching end
                onEndReachedThreshold={0.5} // Trigger when 50% away from end
                ListFooterComponent={loading && <Loading />} // Show loading indicator when loading more
            />
        </SafeAreaView>
    );
};

export default Search;
