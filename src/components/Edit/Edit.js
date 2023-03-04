import { View, TextInput } from "react-native";
import styles from "./Edit.style";

const Edit = (props) => {
    return(
        <View style={[styles.container, {backgroundColor: props.bgColor}]}>
            <TextInput 
                style={styles.title} 
                placeholder="Başlık"
                defaultValue={props.title} 
                onChangeText={props.saveTitle}
            />
            <TextInput 
                style={styles.text} 
                placeholder="Not" 
                multiline={true} 
                defaultValue={props.text}
                onChangeText={props.saveText}
            />
        </View>
    );
}

export default Edit;