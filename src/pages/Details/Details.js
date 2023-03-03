import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native";
import styles from "./Details.styles";
import Edit from "../../components/Edit";

import { db } from "../../apis/NotesDB/NotesDB";

const Details = ({navigation, route}) => {

    const [note, setNote] = useState({});

    const getNote = () => {
        db.transaction(txn => {
            txn.executeSql(
                "SELECT * FROM notes where id=?",
                [route.params.id],
                (sqlTxn, res)=> {
                    console.log("note retrieved successfully");

                    let item = res.rows.item(0);
                    setNote(item);
                    
                },
                error => {
                    console.log(error.message);
                }
            );
        });
    }

    const saveTitle = (title) => {
        db.transaction(txn => {
            txn.executeSql(
                'UPDATE notes SET title=? where id=?',
                [title, route.params.id],
                (sqlTxn, res) => {
                    console.log("note updated successfully");
                },
                error => {
                    console.log(error.message);
                }
            );
        });
    }

    const saveText = (text) => {
        db.transaction(txn => {
            txn.executeSql(
                'UPDATE notes SET text=? where id=?',
                [text, route.params.id],
                (sqlTxn, res) => {
                    console.log("note updated successfully");
                },
                error => {
                    console.log(error.message);
                }
            );
        });
    }

    useEffect(() => {
        getNote();
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <Edit 
                title={note.title} 
                text={note.text} 
                saveTitle={saveTitle}
                saveText={saveText}
            />
        </SafeAreaView>
    );
}

export default Details;