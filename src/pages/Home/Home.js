import React, { useState, useEffect } from "react";
import { SafeAreaView, Alert } from "react-native";
import styles from "./Home.style";
import MasonryList from '@react-native-seoul/masonry-list';
import Note from "../../components/Note";
import SearchBar from "../../components/SearchBar";
import MultipleBar from "../../components/MultipleBar";
import AbsolutButton from "../../components/AbsoluteButton";
import { db, createNotes, addNote } from "../../apis/NotesDB/NotesDB";

const Home = ({navigation}) => {

    const [notes, setNotes] = useState([]);
    const [notesCopy, setNotesCopy] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [multipleBar, setMultipleBar] = useState("none");
    const [selectedItems, setSelectedItems] = useState([]);

    const selected = (id) => {
        setMultipleBar("flex");
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));

        } else {
            setSelectedItems([...selectedItems, id]);
        }

         // Eğer seçili öğe yoksa, multipleBarı kapalı yap
        if (selectedItems.length === 1 && selectedItems.includes(id)) {
            closeMultipleBar();
        }
    }

    //Note Onpress
    const noteOnPress = (item) => {
        if(multipleBar == "none"){
            //MultiBar açıksa detaile git
            navigation.navigate("DetailsPage", {id: item.id})
        }
        else{
            //multibar kapalıysa selected işlemini yap
            selected(item.id);
        }
    }

    const deleteSelectedItems = () => {
        Alert.alert('Uyarı!', 'Seçtiğiniz notları silmek istediğinize emin misiniz?', [
            {
              text: 'İptal',
              onPress: () => setMultipleBar(),
              style: 'cancel',
            },
            {
                text: 'Sil', 
                onPress: () => {
                    let itemsLeft = [...notes];
                    selectedItems.forEach(itemId => {
                      db.transaction(txn => {
                        txn.executeSql(
                          "DELETE FROM notes where id=?",
                          [itemId],
                          (sqlTxn, res)=> {
                            console.log("notes deleted successfully");
                            itemsLeft = itemsLeft.filter(item => item.id !== itemId);
                            if(itemsLeft.length === 0 || selectedItems.length === itemsLeft.length) {
                              setSelectedItems([]);
                              setMultipleBar("none");
                            }
                            setNotesCopy(itemsLeft); // Notları güncelle
                          },
                          error => {
                            console.log(error.message);
                          }
                        );
                      });
                    });
                    setNotes(itemsLeft);
                }
            },
        ]);
    }
      

    useEffect(() => {
        setNotesCopy([]);
        getNotes();
    }, []);
    
    useEffect(() => {
        if(searchText && notes)
        {
            const filter = notes.filter(item => item.title.toUpperCase().indexOf(searchText.toUpperCase()) > -1 || item.text.toUpperCase().indexOf(searchText.toUpperCase()) > -1);
            setNotesCopy(filter);
        } else {
            setNotesCopy(notes);
        }
    }, [searchText, notes]);
    

    
    const closeMultipleBar = () => {
        setSelectedItems([]);
        setMultipleBar("none");
    }

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
                            result.push({id: item.id, title: item.title, text: item.text, bgColor:item.bgColor, date: item.date});
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
        setNotesCopy(notes);
    }, [notes]);
    
    useEffect(() => {
        setNotesCopy(notes);
    }, [notes]);

    const renderNote = ({item}) => {
        return(
            <Note 
                item={item} 
                goDetails={() => noteOnPress(item)}
                onLongPress={() => selected(item.id)}
                isSelected={selectedItems.includes(item.id)}
            />
        );
    }

    const newNote = () => {
        addNote("",""); 
        getNotes();
        navigation.navigate("DetailsPage", {id: (notes.length == 0) ? 1: notes[0].id + 1});
        setSearchText("");
    }

    const SearchOnChange = (text) => {
        setSearchText(text);
    }

    useEffect(() => {
        if(searchText && notes)
        {
            const filter = notes.filter(item => item.title.toUpperCase().indexOf(searchText.toUpperCase()) > -1 || item.text.toUpperCase().indexOf(searchText.toUpperCase()) > -1);
            setNotesCopy(filter);
        } else {
            setNotesCopy(notes);
        }
    }, [searchText, notes]);

    return(
        <SafeAreaView style={styles.container}>
            <MultipleBar
                visible={multipleBar} 
                close={closeMultipleBar}
                number={selectedItems.length}
                delete={deleteSelectedItems}
            />
            <MasonryList
                data={notesCopy}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={renderNote}
                refreshing={false}
                ListHeaderComponent={<SearchBar onChange={SearchOnChange} defaultVal={searchText} />}
            />
            <AbsolutButton onPress={() => { newNote(); }} />
        </SafeAreaView>
    );
}
export default Home;