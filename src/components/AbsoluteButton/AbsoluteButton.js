import { TouchableOpacity, Image } from "react-native";
import styles from "./AbsoluteButton.style";

const AbsolutButton = () => {
    return(
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={require("../../assets/addButton.png")} />
        </TouchableOpacity>
    );
}

export default AbsolutButton;