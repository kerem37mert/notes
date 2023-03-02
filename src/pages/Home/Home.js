import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import styles from "./Home.style";
import Note from "../../components/Note";
import MasonryList from '@react-native-seoul/masonry-list';
import { openDatabase } from "react-native-sqlite-storage";
import { createNotes, addNote } from "../../apis/NotesDB/NotesDB";

const Home = () => {

    const [notes, setNotes] = useState([]);

    const db = openDatabase({
        name: "my",
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
            <Note text={item.title} />
        );
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
            <Button title="click" onPress={() => {addNote("dsfhjsdf","şdıfjhdg"); getNotes()}} />
        </SafeAreaView>
    );
}
export default Home;