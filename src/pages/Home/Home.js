import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import styles from "./Home.style";
import MasonryList from '@react-native-seoul/masonry-list';
import Note from "../../components/Note";
import SearchBar from "../../components/SearchBar";
import AbsolutButton from "../../components/AbsoluteButton";
import { db, createNotes, addNote } from "../../apis/NotesDB/NotesDB";

const Home = ({navigation}) => {

    const [notes, setNotes] = useState([]);
    
    const getNotes = () => {
        db.transaction(txn => {
            txn.executeSql(
                "SELECT * FROM notes order by date DESC",
                [],
                (sqlTxn, res)=> {
                    //console.log("notes retrieved successfully");
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
    }, [notes]);
    

    const renderNote = ({item}) => {
        return(
            <Note 
                item={item} 
                goDetails={() => navigation.navigate("DetailsPage", {id: item.id}) } 
            />
        );
    }

    const newNote = () => {
        addNote("",""); 
        getNotes();
        console.log(notes);
        navigation.navigate("DetailsPage", {id: (notes.length == 0) ? 1: notes[0].id + 1});
    }

    const SearchOnChange = () => {
        
    }

    return(
        <SafeAreaView style={styles.container}>
            <MasonryList
                data={notes}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={renderNote}
                refreshing={false}
                ListHeaderComponent={<SearchBar onChange={} />}
            />
            <AbsolutButton onPress={() => { newNote(); }} />
        </SafeAreaView>
    );
}
export default Home;