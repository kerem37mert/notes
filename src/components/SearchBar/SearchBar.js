import { TextInput } from "react-native";
import styles from "./SearchBar.style";

const SearchBar = (props) => {
    return(
        <TextInput 
            style={styles.textInput}
            placeholder="Notlarınızda Arayın" 
            onChange={props.onChange}
        />
    );
}

export default SearchBar;