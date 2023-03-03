import { TouchableOpacity, Image } from "react-native";
import styles from "./AbsoluteButton.style";

const AbsolutButton = (props) => {
    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress} >
            <Image style={styles.image} source={require("../../assets/addButton.png")} />
        </TouchableOpacity>
    );
}

export default AbsolutButton;