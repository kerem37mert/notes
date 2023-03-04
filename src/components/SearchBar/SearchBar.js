import { TextInput } from "react-native";
import styles from "./SearchBar.style";

const SearchBar = (props) => {
    return(
        <TextInput 
            style={styles.textInput}
            placeholder="Notlarınızda Arayın" 
            onChangeText={props.onChange}
        />
    );
}

export default SearchBar;