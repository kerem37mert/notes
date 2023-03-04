import { TouchableOpacity, Text } from "react-native";
import styles from "./Note.style";

const Note = (props) => {

    const getItem = () => {
        if(props.item.title == "")
        {
            return(
                <Text style={styles.text}>{ props.item.text }</Text>
            );
        }
        else {
            return(
                <View>
                    <Text style={styles.title}>{ props.item.title }</Text>
                    <Text style={styles.text}>{ props.item.text }</Text>
                </View>
            );
        }
    } 

    return(
        <TouchableOpacity style={styles.container} onPress={props.goDetails}>
            <Text style={styles.text}>{ props.item.text }</Text>
        </TouchableOpacity>
    );
}

export default Note;