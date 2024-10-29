import React, { useRef, useState } from 'react';
import { View, Dimensions, FlatList, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const videos = [
    {
        id: '1',
        uri: 'https://firebasestorage.googleapis.com/v0/b/tawssilatrest.appspot.com/o/rafinha.mp4?alt=media&token=7a2eb48b-654b-4052-9c6b-c568f3d61f2f',
        text: "First Video Caption"
    },
    {
        id: '2',
        uri: 'https://firebasestorage.googleapis.com/v0/b/tawssilatrest.appspot.com/o/barca_bayrn.mp4?alt=media&token=95dcce39-43ae-4fef-870b-f1f7d6e145fe',
        text: "Second Video Caption"
    },
    {
        id: '3',
        uri: 'https://firebasestorage.googleapis.com/v0/b/tawssilatrest.appspot.com/o/barca_bayrn.mp4?alt=media&token=95dcce39-43ae-4fef-870b-f1f7d6e145fe',
        text: "Third Video Caption"
    }
];

const VideoItem = React.forwardRef(({ uri, isActive, text }, ref) => {
    const [status, setStatus] = useState({});
    const navigation = useNavigation()
    const togglePlayPause = () => {
        if (ref.current) {
            if (status.isPlaying) {
                ref.current.pauseAsync();
            } else {
                ref.current.playAsync();
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={togglePlayPause}>
            <View style={{ width, height: '100%' }}>
                <Video
                    ref={ref}
                    style={StyleSheet.absoluteFillObject}
                    source={{ uri }}
                    isLooping
                    shouldPlay={isActive}
                    resizeMode="cover"
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
                <View style={styles.textOverlay}>
                    <Text
                        onPress={() => {
                            navigation.navigate('home')
                        }}
                        style={styles.caption}>{text}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

const Singel = () => {
    const videoRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index;
            setActiveIndex(index);
        }
    });

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 100, // Fully visible item triggers the callback
    });

    return (
        <FlatList
            data={videos}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                <View style={{ width, height: '100%' }}>
                    <VideoItem
                        ref={(ref) => (videoRefs.current[index] = ref)}
                        uri={item.uri}
                        isActive={index === activeIndex}
                        text={item.text}  // Pass the text to the VideoItem
                    />
                </View>
            )}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
            contentContainerStyle={{ width: width * videos.length }}
        />
    );
};

const styles = StyleSheet.create({
    textOverlay: {
        position: 'absolute',
        top: 50,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    caption: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 10,
    },
});

export default Singel;
