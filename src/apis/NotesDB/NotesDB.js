import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
    name: "adssst",
});

const createNotes = () => {
    db.transaction(txn => {
        txn.executeSql(
            'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), text TEXT, date DATETIME DEFAULT CURRENT_TIMESTAMP)',
            [],
            (sqlTxn, res) => {
                console.log("table created successfulyy");
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
            'INSERT INTO notes (title, text) VALUES(?,?) ',
            [title, text],
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
    createNotes,
    addNote,
};