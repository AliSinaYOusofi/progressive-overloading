import React, { useEffect, useState } from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { FlatList, StyleSheet, ToastAndroid } from 'react-native'
import { progressive_overloading } from '@/db/sqlitedb'
import { useAppContext } from '@/context/ContextProvider'
import NoNotesAddedCard from '../cards/NoNotesAddedCard'
import AddNotesButton from './AddNotesButton'
import MinimalNotesCard from './MinimalNotesCard'
import { notes } from './AddNotesPopup'


export default function MinimalNotesList() {
    
    const [notes, setNotes] = useState<notes[]>([])
    const { refreshNOtesTable } = useAppContext()

    useEffect( () => {
        const fetchNotes = async () : Promise<void> => {
            try {
                const result: notes[] = await progressive_overloading.getAllAsync("SELECT * FROM notes")
                setNotes(result.reverse())
            } catch (error) {
                console.error("failed to fetch data ", error)
                ToastAndroid.show("failed to fetch data ", ToastAndroid.LONG)
            }
        }
        fetchNotes()
    }, [refreshNOtesTable])
    
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.goal_text}> 3. Notes </ThemedText>
            {
                notes.length
                ?
                <FlatList
                    data={notes}
                    horizontal
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => <MinimalNotesCard id={item.id} title={item.title} content={item.content} created={item.created} updated={item.updated}/>}
                />
                :
                <NoNotesAddedCard />
            }
            <AddNotesButton />
        </ThemedView>
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
        marginBottom: 10
    }
})