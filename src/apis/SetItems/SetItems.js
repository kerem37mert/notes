import AsyncStorage from "@react-native-async-storage/async-storage";

const SetItems = async (key, jsonValue) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(`@${key}`, jsonValue);
    } catch (e) {
        console.log(e);
    }
}

export default SetItems;