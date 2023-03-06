import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 20
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    close: {
        color: "#000",
        fontSize: 16,
        marginBottom: 20
    },
    title: {
        color: "#000",
        fontSize: 16,
        marginBottom: 20
    },
    bgColor: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#000",
        marginLeft: 10,
        marginRight: 10
    }
});