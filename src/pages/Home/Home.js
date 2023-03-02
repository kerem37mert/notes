import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import styles from "./Home.style";
import Note from "../../components/Note";
import MasonryList from '@react-native-seoul/masonry-list';

const Home = () => {

    const renderNote = ({item}) => {
        return(
            <Note text={item} />
        );
    }

    return(
        <SafeAreaView style={styles.container}>
            <MasonryList
                 data={[1,2,3,4,5,6]}
                 numColumns={2}
                 showsVerticalScrollIndicator={false}
                 renderItem={renderNote}
                 refreshing={false}
            />
        </SafeAreaView>
    );
}

export default Home;