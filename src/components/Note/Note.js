import { TouchableOpacity, Text } from "react-native";
import styles from "./Note.style";

const Note = (props) => {
    return(
        <TouchableOpacity style={styles.container} onPress={props.goDetails}>
            <Text>{ props.text }</Text>
        </TouchableOpacity>
    );
}

export default Note;