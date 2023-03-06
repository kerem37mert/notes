import React, { useState, useEffect} from "react";
import { SafeAreaView, FlatList, BackHandler } from "react-native";
import moment from "moment";
import styles from "./Details.styles";
import Edit from "../../components/Edit";
import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import ColorModal from "../../components/ColorModal";
import { db } from "../../apis/NotesDB/NotesDB";

const Details = ({navigation, route}) => {

    const [note, setNote] = useState({});
    const [colorModal, setColorModal] = useState("none");

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

    const changeColor = (bgColor) => {
        db.transaction(txn => {
            txn.executeSql(
                'UPDATE notes SET bgColor=? where id=?',
                [bgColor, route.params.id],
                (sqlTxn, res) => {
                    console.log("background color updated successfully");
                    getNote();
                },
                error => {
                    console.log(error.message);
                }
            );
        });
    }

    const closeButton = () => {
        if(colorModal == "flex")
        {
            setColorModal("none");
        }
    }

    const renderTopBar = () => {
        return(
            <TopBar 
                goBack={()=>navigation.goBack()}
                bgColor={note.bgColor}
            />
        );
    }

    const renderEdit = () => {
        return(
            <Edit 
                title={note.title} 
                text={note.text} 
                saveTitle={saveTitle}
                saveText={saveText}
                bgColor={note.bgColor}
            />
        );
    }

    useEffect(() => {
        getNote();
    }, []);

    useEffect(() => {
        const backAction = () => {
          if(colorModal == "flex")
          {
            setColorModal("none");
          }
          else if(colorModal == "none"){
            navigation.goBack();
          }
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
            return () => backHandler.remove();
        }, [colorModal]);
    

    return(
        <SafeAreaView style={styles.container}>
            <FlatList 
                style={{backgroundColor: note.bgColor}}
                ListHeaderComponent={renderTopBar}
                data={[1]}
                renderItem={renderEdit}
            />
            <BottomBar
                date={note.date}
                bgColor={note.bgColor}
                colorOnPress={() => setColorModal("flex")}
            />
            <ColorModal
                bgColor={note.bgColor}
                changeColor={changeColor}
                display={colorModal}
                closeButton={closeButton}
            />
        </SafeAreaView>
    );
}

export default Details;