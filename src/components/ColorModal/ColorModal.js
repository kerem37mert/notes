import { View, TouchableOpacity, Text, FlatList } from "react-native";
import styles from "./ColorModal.style";

const ColorModal = (props) => {

    const colors = [
        {
            id: 1,
            color: "white"
        },
        {
            id: 2,
            color: "#FFCDD2"
        },
        {
            id: 3,
            color: "#F8BBD0"
        },
        {
            id: 4,
            color: "#EF9A9A"
        },
        {
            id: 5,
            color: "#F48FB1"
        },
        {
            id: 6,
            color: "#E1BEE7"
        },
        {
            id: 7,
            color: "#CE93D8"
        },
        {
            id: 8,
            color: "#BA68C8"
        },
        {
            id: 9,
            color: "#D1C4E9"
        },
        {
            id: 10,
            color: "#B39DDB"
        },
        {
            id: 11,
            color: "#9575CD"
        },
        {
            id: 12,
            color: "#C5CAE9"
        },
        {
            id: 13,
            color: "#9FA8DA"
        },
        {
            id: 14,
            color: "#7986CB"
        },
        {
            id: 15,
            color: "#5C6BC0"
        },
        {
            id: 16,
            color: "#BBDEFB"
        },
        {
            id: 17,
            color: "#90CAF9"
        },
        {
            id: 18,
            color: "#64B5F6"
        },
        {
            id: 19,
            color: "#42A5F5"
        },
        {
            id: 20,
            color: "#B3E5FC"
        },
        {
            id: 21,
            color: "#81D4FA"
        },
        {
            id: 22,
            color: "#4FC3F7"
        },
        {
            id: 23,
            color: "#29B6F6"
        },
        {
            id: 24,
            color: "#B2DFDB"
        },
        {
            id: 25,
            color: "#80CBC4"
        },
        {
            id: 26,
            color: "#4DB6AC"
        },
        {
            id: 27,
            color: "#C8E6C9"
        },
        {
            id: 28,
            color: "#A5D6A7"
        },
        {
            id: 29,
            color: "#81C784"
        },
        {
            id: 30,
            color: "#66BB6A"
        },
        {
            id: 31,
            color: "#C5E1A5"
        },
        {
            id: 32,
            color: "#AED581"
        },
        {
            id: 33,
            color: "#9CCC65"
        },
        {
            id: 34,
            color: "#F0F4C3"
        },
        {
            id: 35,
            color: "#E6EE9C"
        },
        {
            id: 36,
            color: "#DCE775"
        },
        {
            id: 37,
            color: "#D4E157"
        },
        {
            id: 38,
            color: "#FFE0B2"
        },
        {
            id: 39,
            color: "#FFCC80"
        },
        {
            id: 40,
            color: "#FFB74D"
        },
        {
            id: 41,
            color: "#FFA726"
        },
        {
            id: 42,
            color: "#FFAB91"
        },
        {
            id: 43,
            color: "#FF8A65"
        },
        {
            id: 44,
            color: "#FF7043"
        },
        {
            id: 45,
            color: "#BCAAA4"
        },
        {
            id: 46,
            color: "#A1887F"
        },
        {
            id: 47,
            color: "#BDBDBD"
        },
        {
            id: 48,
            color: "#9E9E9E"
        },

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
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Renk</Text>
            </View>
            <FlatList 
                data={colors} 
                renderItem={renderColor} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

export default ColorModal;