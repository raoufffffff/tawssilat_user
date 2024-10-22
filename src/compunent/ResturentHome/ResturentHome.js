import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ResturentCard from './ResturentCard'
import { Skeleton } from '@rneui/themed';


const ResturentHome = () => {
    const [Resturent, setResturent] = useState([])
    useEffect(() => {
        const getres = async () => {
            await axios.get('https://tawssilat-user-backend.onrender.com/rest')
                .then(res => {
                    setResturent(res.data.reslut)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getres()
    }, [])

    if (Resturent.length == 0) {
        return <>
            <View
                className="w-full px-3 rounded-3xl overflow-auto relative my-4"
            >
                <Skeleton
                    width={"full"}
                    height={150}
                    animation="wave" />
                <View
                    className="my-1"
                ></View>
                <View
                    className="absolute rounded-full top-24 right-5"
                >
                    <Skeleton circle width={100} height={100} animation='wave' />

                </View>
                <Skeleton width={170} height={30} animation='wave' />
            </View>
            <View
                className="w-full px-3 rounded-3xl overflow-auto relative my-4"
            >
                <Skeleton
                    width={"full"}
                    height={150}
                    animation="wave" />
                <View
                    className="my-1"
                ></View>
                <View
                    className="absolute rounded-full top-24 right-5"
                >
                    <Skeleton circle width={100} height={100} />

                </View>
                <Skeleton width={170} height={30} animation='wave' />
            </View>
        </>
    }

    const myResturent = Resturent.map((e, i) => {
        return <ResturentCard Resturent={e} key={i} />
    })
    return (
        <View
            className="flex"
        >
            {myResturent}
        </View>
    )
}

export default ResturentHome