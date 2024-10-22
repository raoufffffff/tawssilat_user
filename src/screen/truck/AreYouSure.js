import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

const AreYouSure = ({ ok, hide }) => {
    const [louding, setlouding] = useState(false)
    return (
        <>
            <View
                className="absolute top-0 left-0 w-full h-screen bg-black opacity-25 z-50"
            ></View>
            <View
                className="absolute top-0 left-0 w-full h-screen flex justify-center items-center"
            >

                <View
                    className=" w-10/12 bg-white h-32 flex  z-[100000] rounded-xl"
                >
                    <Text
                        className=" mx-auto my-3 text-lg"
                    >es-tu sûr</Text>
                    <View
                        className="flex flex-row justify-center mt-5"
                    >

                        <Text
                            onPress={() => {
                                setlouding(true)
                                ok()
                            }}
                            className=" font-bold mx-3 rounded-xl w-20 text-center py-1 bg-[#fc6011] text-white"
                        >{louding ? <ActivityIndicator /> : "cancel"} </Text>
                        <Text
                            onPress={hide}
                            className=" font-bold mx-3 rounded-xl w-20 py-1 text-center text-[#fc6011] border border-[#fc6011]"
                        >no </Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default AreYouSure