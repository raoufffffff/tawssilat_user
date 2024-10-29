import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ResturentCard from './ResturentCard'
import { Skeleton } from '@rneui/themed';
import { useSelector } from 'react-redux';
import MyHelp from '../../constanst/HelpAbout';


const ResturentHome = () => {
    const card = useSelector(state => state.StorCard);

    const [Resturent, setResturent] = useState([])
    const [L, setL] = useState(true)
    useEffect(() => {
        const getres = async () => {
            await axios.get('https://tawssilat-user-backend.onrender.com/rest')
                .then(res => {
                    setResturent(res.data.reslut)
                })
                .catch(err => {
                    console.log(err);
                }).finally(() => {
                    setL(false)
                })
        }
        getres()
    }, [])

    if (L) {
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
    const c = () => {
        let b = []
        for (let i = 0; i < Resturent.length; i++) {

            if (Resturent[i].open) {
                b.unshift(Resturent[i])
            } else {
                b.push(Resturent[i])
            }



        }
        return b
    }

    const ca = () => {
        let b = []
        for (let i = 0; i < Resturent.length; i++) {
            let { des } = MyHelp(card.location, Resturent[i])
            console.log(des, "xmxx");
            if (des > 3500) {

            } else {
                if (Resturent[i].open) {
                    b.unshift(Resturent[i])
                } else {
                    b.push(Resturent[i])
                }
            }
        }
        return b
    }
    const myResturent = ca().map((e, i) => {
        return <ResturentCard Resturent={e} key={i} />
    })





    return (
        <View
            className="flex"
        >
            {ca().length === 0 ?
                <Text
                    className="text-2xl mx-auto mt-7 capitalize text-[#777] px-5 text-center"
                >aucun restaurant dans votre région</Text>
                :
                myResturent
            }
        </View>
    )
}

export default ResturentHome