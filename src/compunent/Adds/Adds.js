import { ScrollView, Image } from 'react-native'
import React from 'react'

const Adds = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-5 px-2"
        >
            <Image source={require('../../../assets/adds-3.jpeg')}
                className="mx-3 h-44 rounded-xl w-80"
            />
            <Image source={require('../../../assets/adds-1.jpeg')}
                className="mx-3 h-44 rounded-xl w-72"
            />
            <Image source={require('../../../assets/adds-2.jpeg')}
                className="mx-3 h-44 rounded-xl w-80"
            />

        </ScrollView>
    )
}

export default Adds