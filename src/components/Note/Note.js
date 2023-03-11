import { TouchableOpacity, View, Text } from "react-native";
import styles from "./Note.style";

const Note = (props) => {

    const Item = () => {
        if(!props.item.title && !props.item.text)
        {
            return(
                <Text style={styles.text}>Henüz bir şeyler not almadınız.</Text>
            );
        }
        else if(!props.item.title && props.item.text)
        {
            return(
                <Text style={styles.text}>{ props.item.text }</Text>
            );
        }
        else if(props.item.title && !props.item.text)
        {
            return(
                <Text style={styles.title}>{ props.item.title }</Text>
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
        <TouchableOpacity 
            style={[props.isSelected ? styles.selectedContainer : styles.container, {backgroundColor: props.item.bgColor}]} 
            onPress={props.goDetails}
            onLongPress={props.onLongPress}
        >
            <Item />
        </TouchableOpacity>
    );
}

export default Note;