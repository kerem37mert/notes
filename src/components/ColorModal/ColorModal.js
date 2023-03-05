import { View, TouchableOpacity, Text, FlatList } from "react-native";
import styles from "./ColorModal.style";

const ColorModal = (props) => {

    const colors = [
        {
            id: 1,
            color: "blue"
        },
        {
            id: 2,
            color: "pink"
        },
        {
            id: 3,
            color: "yellow"
        },
        {
            id: 4,
            color: "green"
        },
        {
            id: 5,
            color: "blue"
        },
        {
            id: 6,
            color: "pink"
        },
        {
            id: 7,
            color: "yellow"
        },
        {
            id: 8,
            color: "green"
        },
        {
            id: 9,
            color: "yellow"
        },
        {
            id: 10,
            color: "green"
        }
    ];
    
    const renderColor = ({item}) => {
        return(
            <TouchableOpacity 
                style={[styles.bgColor, {backgroundColor: item.color}]}
                onPress={() => {props.changeColor(item.color)}}
            >
            </TouchableOpacity>
        );
    }

    return(
        <View style={[styles.container, {backgroundColor: props.bgColor, display: props.display}]}>
            <Text style={styles.title}>Renk</Text>
            <FlatList 
                data={colors} 
                renderItem={renderColor} 
                horizontal={true}
            />
        </View>
    );
}

export default ColorModal;