import AsyncStorage from "@react-native-async-storage/async-storage";

const GetItems = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
       console.log(e);
    }
}

export default GetItems;