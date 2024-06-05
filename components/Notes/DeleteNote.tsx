import { useAppContext } from '@/context/ContextProvider';
import { progressive_overloading } from '@/db/sqlitedb';
import React from 'react'
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View, useColorScheme } from 'react-native';
import { ThemedText } from '../ThemedText';

type Props = {
    id: string | number;
    toggleModal: (toggle: boolean) => void;
}

export default function DeleteNote({id, toggleModal} : Props) {

    const colorScheme = useColorScheme()
    const { setRefresNotesTable } = useAppContext()

    const deleteNote = async () : Promise<void> => {
        
        try {
            await progressive_overloading.execAsync(`DELETE FROM notes WHERE id = ${id}`);
            setRefresNotesTable( prev => ! prev)
            ToastAndroid.show("Note deleted", ToastAndroid.LONG)
        } catch (error) {
            console.error("Failed to delete data", error);
            ToastAndroid.show("Failed to delete data", ToastAndroid.LONG)
        }

        finally {
            toggleModal(false);
        }
    }

    return (
        <View style={styles.modalContainer}>
            <View style={[styles.popup_container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>

                <ThemedText style={{fontWeight: "bold"}}> Are sure you want to delete this goal? </ThemedText>
                <ThemedText> This action cannot be undone</ThemedText>

                <View style={styles.button_views}>
                    <TouchableOpacity onPress={deleteNote} style={[styles.delete_button, styles.both_button]}>
                        <Text style={{color: "white"}}> Delete </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleModal(false)} style={[styles.cancel_button, styles.both_button]}>
                        <Text style={{color: "white"}}> Cancel </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: "relative",
        
    },

    popup_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    button_views : {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 10,
    },

    delete_button: {
        backgroundColor: "#c04000",
        
    },

    cancel_button: {
        backgroundColor: "#355e3b",
        
    },
    
    both_button: {
        borderRadius: 10,
        paddingHorizontal: 24,
        paddingVertical: 10
    }
})