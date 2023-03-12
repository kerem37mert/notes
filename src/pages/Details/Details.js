import React, { useState, useEffect} from "react";
import { SafeAreaView, FlatList, BackHandler, Alert } from "react-native";
import moment from "moment";
import Modal from "react-native-modal";
import styles from "./Details.styles";
import Edit from "../../components/Edit";
import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import ColorModal from "../../components/ColorModal";
import MoreModal from "../../components/MoreModal";
import { db } from "../../apis/NotesDB/NotesDB";

const Details = ({navigation, route}) => {

    const [note, setNote] = useState({});
    const [colorModal, setColorModal] = useState(false);
    const [moreModal, setMoreModal] = useState(false);

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

    const deleteNote = () => {
        db.transaction(txn => {
            txn.executeSql(
                'DELETE FROM notes where id=?',
                [note.id],
                (sqlTxn, res) => {
                    console.log("note deleted successfully");
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomePage' }],
                    });
                },
                error => {
                    console.log(error.message);
                }
            );
        })
    }

    const deleteOnPress = () => {
        Alert.alert('Uyarı!', 'Bu notu silmek istediğinize emin misiniz?', [
            {
              text: 'İptal',
              onPress: () => setMoreModal(false),
              style: 'cancel',
            },
            {text: 'Sil', onPress: () => deleteNote()},
        ]);
    }

    const RenderTopBar = () => {
        return(
            <TopBar 
                goBack={()=>navigation.goBack()}
                bgColor={note.bgColor}
            />
        );
    }

    const RenderEdit = () => {
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
                style={{backgroundColor: note.bgColor ? note.bgColor : note.bgColor}}
                ListHeaderComponent={RenderTopBar}
                data={[1]}
                renderItem={RenderEdit}
            />
            <BottomBar
                date={note.date}
                bgColor={note.bgColor}
                colorOnPress={() => setColorModal(true)}
                moreOnPress={() => setMoreModal(true)}
            />
             <Modal
                style={{justifyContent: "flex-end", margin: 0}}
                isVisible={colorModal}
                onBackdropPress={() => setColorModal(false)}
                onBackButtonPress={() => setColorModal(false)}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={900}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}
            >
                <ColorModal 
                    bgColor={note.bgColor} 
                    changeColor={changeColor}
                />
            </Modal>
            <Modal
                style={{justifyContent: "flex-end", margin: 0}}
                isVisible={moreModal}
                onBackdropPress={() => setMoreModal(false)}
                onBackButtonPress={() => setMoreModal(false)}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={900}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}
            >
                <MoreModal 
                    bgColor={note.bgColor} 
                    deleteOnPress={deleteOnPress}
                />
            </Modal>
        </SafeAreaView>
    );
}

export default Details;