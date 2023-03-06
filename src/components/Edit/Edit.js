import { View, TextInput } from "react-native";
import styles from "./Edit.style";

const Edit = (props) => {
    return(
        <View style={[styles.container, {backgroundColor: props.bgColor}]}>
            <TextInput 
                style={styles.title} 
                placeholderTextColor="#e0e0e0"
                placeholder="Başlık"
                defaultValue={props.title} 
                onChangeText={props.saveTitle}
            />
            <TextInput 
                style={styles.text} 
                placeholderTextColor="#e0e0e0"
                placeholder="Not" 
                multiline={true} 
                defaultValue={props.text}
                onChangeText={props.saveText}
            />
        </View>
    );
}

export default Edit;