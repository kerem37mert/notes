import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native";
import moment from "moment";
import styles from "./Details.styles";
import Edit from "../../components/Edit";
import BottomBar from "../../components/BottomBar";
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
                'UPDATE notes SET title=?, date=? where id=?',
                [title, moment().format("YYYY-MM-DD, h:mm:ss"), route.params.id],
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
                'UPDATE notes SET text=?, date=? where id=?',
                [text, moment().format("YYYY-MM-DD, h:mm:ss"), route.params.id],
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
                bgColor={"pink"}
            />
            <BottomBar
                date={note.date}
                bgColor={"pink"}
            />
        </SafeAreaView>
    );
}

export default Details;