import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./BottomBar.style";

const BottomBar = (props) => {
    return(
        <View style={[styles.container, {backgroundColor: props.bgColor}]}>
            <Text style={styles.date}>Son düzenleme: {props.date}</Text>
            <TouchableOpacity 
                style={[styles.color, {backgroundColor: props.bgColor}]}
                onPress={props.colorOnPress}
            >               
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.moreButton}
                onPress={props.moreOnPress}
            >
                <Image style={styles.more} source={require("../../assets/more.png")}  />
            </TouchableOpacity>    
        </View>
    );
}

export default BottomBar; 