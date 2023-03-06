import { View, TouchableOpacity, Text, Image} from "react-native";
import styles from "./MoreModal.style";

const MoreModal = (props) => {
    return(
        <View style={[styles.container, {backgroundColor: props.bgColor}]}>
            <TouchableOpacity 
                style={styles.button}
                onPress={props.deleteOnPress}
            >
                <Image style={styles.buttonImg} source={require("../../assets/deleteButton.png")} />
                <Text style={styles.text}>Sil</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MoreModal;