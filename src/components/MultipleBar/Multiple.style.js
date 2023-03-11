import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: "#e0e0e0",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cancelTextContainer: {
        flexDirection: "row",  
        alignItems: "center"  
    },
    cancelButton: {
        width: 20,
        height: 20
    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 20
    },
    deleteButton: {
        height: 30,
        width: 30
    },
    
});