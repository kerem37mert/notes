import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native";
import moment from "moment";
import Modal from "react-native-modal";
import styles from "./Details.styles";
import Edit from "../../components/Edit";
import BottomBar from "../../components/BottomBar";
import ColorModal from "../../components/ColorModal";
import { db } from "../../apis/NotesDB/NotesDB";

const Details = ({navigation, route}) => {

    const [note, setNote] = useState({});
    const [colorModal, setColorModal] = useState(false);

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
                bgColor={note.bgColor}
            />
            <BottomBar
                date={note.date}
                bgColor={note.bgColor}
                colorOnPress={() => setColorModal(true)}
            />
            <Modal 
                isVisible={colorModal}
                onBackdropPress={() => {setColorModal(false)}}
                onBackButtonPress={() => {setColorModal(false)}}
                backdropOpacity={0}
                
            >
                <ColorModal />
           </Modal>
        </SafeAreaView>
    );
}

export default Details;