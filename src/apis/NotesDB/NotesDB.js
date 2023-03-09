import { openDatabase } from "react-native-sqlite-storage";
import moment from "moment";

const db = openDatabase({
    name: "app",
});

const createNotes = () => {
    db.transaction(txn => {
        txn.executeSql(
            'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), text TEXT, bgColor VARCHAR(100), date TEXT)',
            [],
            (sqlTxn, res) => {
                //console.log("table created successfulyy");
            },
            error => {
                console.log(error.message);
            },
        )
    });
}

const addNote = (title, text) => {
    db.transaction(txn => {
        txn.executeSql(
            'INSERT INTO notes (title, text, bgColor, date) VALUES(?,?,?,?)',
            [title, text, "#fff", moment().format("YYYY-MM-DD, h:mm:ss")],
            (sqlTxn, res) => {
                console.log("notes added successfully");
            },
            error => {
                console.log(error.message);
            }
        )
    });
}

export {
    db,
    createNotes,
    addNote,
};