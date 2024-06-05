import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, ToastAndroid } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { notes } from '@/components/Notes/AddNotesPopup'
import { progressive_overloading } from '@/db/sqlitedb'
import { useAppContext } from '@/context/ContextProvider'
import NotesCard from '@/components/Notes/NotesCard'
import NoNotesAddedCard from '@/components/cards/NoNotesAddedCard'

export default function Notes() {

    const [ Note, setNotes] = useState<notes[]>([])
    const { refreshNOtesTable } = useAppContext()
    
    useEffect(() => {
        const fetchGoals = async (): Promise<void> => {
            try {
                const result: notes[] = await progressive_overloading.getAllAsync(`SELECT * FROM notes;`);
                setNotes(result.reverse());
                console.log("goals ", result);
            } catch (error) {
                console.error("failed to fetch data ", error);
                ToastAndroid.show("failed to fetch data", ToastAndroid.LONG);
            }
        };
        fetchGoals();
    }, [refreshNOtesTable]);

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={<FontAwesome name="sticky-note" size={410} style={styles.headerImage} />} >
            <ThemedText style={styles.goal_text}> Sticky Notes ({Note.length})</ThemedText>
            {
                Note.length
                ?
                Note.map( (item, index) => <NotesCard key={item.id} id={item.id} title={item.title} content={item.content} created={item.created} updated={item.updated}/>)
                :
                <NoNotesAddedCard />
            }
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    goal_text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'gray',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // default text color for buttons
    },
    goalCount: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});