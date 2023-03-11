import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./Multiple.style";

const MultipleBar = (props) => {
    return(
        <View style={[styles.container, {display: props.visible}]}>
            <View style={styles.cancelTextContainer}>
                <TouchableOpacity onPress={props.close}>
                    <Image
                        style={styles.cancelButton} 
                        source={require("../../assets/cancel.png")} 
                    /> 
                </TouchableOpacity>
                <Text style={styles.text}>{props.number}</Text>
            </View>
            <TouchableOpacity onPress={props.delete}>
                <Image
                    style={styles.deleteButton} 
                    source={require("../../assets/deleteButton.png")} 
                /> 
            </TouchableOpacity>
        </View>
    );
}

export default MultipleBar;