import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./BottomBar.style";

const BottomBar = (props) => {
    return(
        <View style={[styles.container, {backgroundColor: props.bgColor}]}>
            <Text style={styles.date}>Son düzenleme: {props.date}</Text>
            <TouchableOpacity style={[styles.color, {backgroundColor: "red"}]}></TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
                <Image style={styles.more} source={require("../../assets/more.png")}  />
            </TouchableOpacity>    
        </View>
    );
}

export default BottomBar; 