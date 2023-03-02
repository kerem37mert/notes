import { TouchableOpacity, Text } from "react-native";
import styles from "./Note.style";

const Note = (props) => {
    return(
        <TouchableOpacity style={styles.container}>
            <Text>{ props.text }</Text>
        </TouchableOpacity>
    );
}

export default Note;