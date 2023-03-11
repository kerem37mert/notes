import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray"
    },
    selectedContainer: {
        flex: 1,
        margin: 5,
        padding: 20,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "blue"
    },
    title: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 18
    },
    text: {
        color: "#000",
        fontSize: 14
    }
});