import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import styles from "./Home.style";
import MasonryList from '@react-native-seoul/masonry-list';
import { openDatabase } from "react-native-sqlite-storage";
import Note from "../../components/Note";
import AbsolutButton from "../../components/AbsoluteButton";
import { createNotes, addNote } from "../../apis/NotesDB/NotesDB";

const Home = ({navigation}) => {

    const [notes, setNotes] = useState([]);

    const db = openDatabase({
        name: "adssst",
    });
    
    
    const getNotes = () => {
        db.transaction(txn => {
            txn.executeSql(
                "SELECT * FROM notes order by date DESC",
                [],
                (sqlTxn, res)=> {
                    console.log("notes retrieved successfully");
                    let len = res.rows.length;

                    if(len > 0)
                    {
                        let result = [];
                        for(let i=0; i<len; i++)
                        {
                            let item = res.rows.item(i);
                            result.push({id: item.id, title: item.title, text: item.text, date: item.date});
                        }

                        setNotes(result);
                    }
                },
                error => {
                    console.log(error.message);
                }
            );
        });
    }

    useEffect(() => {
            createNotes();
            getNotes();
    }, []);
    

    const renderNote = ({item}) => {
        return(
            <Note text={item.id} />
        );
    }

    const newNote = async () => {
        addNote("dsfhjsdf","şdıfjhdg"); 
        getNotes();
        navigation.navigate("DetailsPage",{lastId: notes[0].id + 1});
    }

    return(
        <SafeAreaView style={styles.container}>
            <MasonryList
                data={notes}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={renderNote}
                refreshing={false}
            />
            <AbsolutButton onPress={newNote} />
        </SafeAreaView>
    );
}
export default Home;