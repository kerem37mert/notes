import { View, TouchableOpacity, Image } from "react-native";
import styles from "./TopBar.style";

const TopBar = (props) => {
    return(
        <View style={[styles.container, {backgroundColor: props.bgColor}]}>
            <TouchableOpacity onPress={props.goBack}>
                <Image 
                    source={require("../../assets/backButton.png")}
                    style={styles.backButton}
                />
            </TouchableOpacity>
        </View>
    );
}

export default TopBar;