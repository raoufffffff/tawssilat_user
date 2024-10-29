import { ScrollView, Image, TouchableOpacity, Linking, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { Skeleton } from '@rneui/themed';

const Adds = () => {
    const [adds, setadds] = useState([])
    const [louding, setlouding] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        const getadds = async () => {
            try {
                await axios.get('https://tawssilat-api.onrender.com/adds')
                    .then((res) => {
                        setadds(res.data.message)
                    })
            } catch (error) {
                alert.apply("error", error)
            } finally {
                setlouding(false)
            }
        }
        getadds()
    }, [])

    const facebook = (a) => {
        Linking.openURL(a).catch((err) =>
            Alert.alert('Error', 'Failed to make a call', [{ text: 'OK' }], { cancelable: false })
        );
    }

    if (louding) {
        return <ScrollView horizontal
            className="mt-5"
            showsHorizontalScrollIndicator={false}
        >
            <View
                className="mx-3 h-44 rounded-xl w-80"
            >
                <Skeleton
                    width={"full"}
                    height={150}
                    animation="wave" />


            </View>
            <View
                className="mx-3 h-44 rounded-xl w-80"
            >
                <Skeleton
                    width={"full"}
                    height={150}
                    animation="wave" />

            </View>
        </ScrollView>
    }

    const myadds = adds.map(e => {
        return <TouchableOpacity
            key={e._id}
            className="mx-3 h-44 rounded-xl w-80 overflow-hidden"
            onPress={() => {
                e.in ? navigation.navigate(e.linkin.name, { id: e.linkin.id }) : facebook(e.linkout)
            }}
        >
            <Image
                source={{ uri: e.img }}
                className="w-full h-full"
                resizeMode='cover'
            />
        </TouchableOpacity>
    })
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-5 px-2"
        >
            {myadds}

        </ScrollView>
    )
}

export default Adds