import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./Multiple.style";

const MultipleBar = () => {
    return(
        <View style={styles.container}>
            <View style={styles.cancelTextContainer}>
                <TouchableOpacity>
                    <Image
                        style={styles.cancelButton} 
                        source={require("../../assets/cancel.png")} 
                    /> 
                </TouchableOpacity>
                <Text style={styles.text}>5 </Text>
            </View>
            <TouchableOpacity>
                <Image
                    style={styles.deleteButton} 
                    source={require("../../assets/deleteButton.png")} 
                /> 
            </TouchableOpacity>
        </View>
    );
}

export default MultipleBar;