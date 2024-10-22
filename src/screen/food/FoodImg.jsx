import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'

const FoodImg = ({ img, hide }) => {
    return (
        <>

            <TouchableOpacity
                className="absolute z-40 w-full h-full bg-black opacity-80"
                onPress={hide}
            >
            </TouchableOpacity>
            <View
                className="absolute mt-28 z-50 w-full h-4/6 flex justify-center items-center"
            >
                <ReactNativeZoomableView
                    maxZoom={2.5}
                    minZoom={1}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}
                    style={{ width: 400 }}
                >

                    <Image

                        source={{ uri: img }}
                        className="w-full h-96 rounded-xl"
                    />
                </ReactNativeZoomableView>
            </View>
        </>
    )
}

export default FoodImg