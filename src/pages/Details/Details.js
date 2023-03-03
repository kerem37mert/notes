import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import styles from "./Details.styles";
import Edit from "../../components/Edit";

const Details = ({navigation, route}) => {

    console.log(route.params.lastId);
    return(
        <SafeAreaView style={styles.container}>
            <Edit />
        </SafeAreaView>
    );
}

export default Details;