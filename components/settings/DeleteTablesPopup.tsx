import { useAppContext } from '@/context/ContextProvider';
import { progressive_overloading } from '@/db/sqlitedb';
import React from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View, useColorScheme } from 'react-native';
import { ThemedText } from '../ThemedText';

type Props = {
    tables: { clearGoals: boolean; clearNotes: boolean; clearProgressive: boolean }; 
    toggleModal: (toggle: boolean) => void;
    clearNotes: (toggle: boolean) => void;
    clearGoals: (toggle: boolean) => void;
    clearProgressive: (toggle: boolean) => void;
}

export default function DeleteTablesPopup({ tables, toggleModal, clearGoals, clearNotes, clearProgressive }: Props) {
    const colorScheme = useColorScheme();
    const { setRefresNotesTable, setRefreshDatabaseFetch, setRefreshGoalsDatabase } = useAppContext();

    const clearTable = async (): Promise<void> => {
        
        try {
            if (tables.clearProgressive) {
                await progressive_overloading.execAsync("DELETE FROM progressive_overloading");
                setRefreshDatabaseFetch(prev => ! prev);
                clearProgressive(false) 
            }
            if (tables.clearGoals) {
                await progressive_overloading.execAsync("DELETE FROM goals");
                setRefreshGoalsDatabase(prev => ! prev); 
                clearGoals(false)
            }
            if (tables.clearNotes) {
                await progressive_overloading.execAsync("DELETE FROM notes");
                setRefresNotesTable(prev => ! prev);
                clearNotes(false)
            }

            ToastAndroid.show("Selected data cleared", ToastAndroid.LONG);

        } catch (error) {
            console.error("Failed to delete data", error);
            ToastAndroid.show("Failed to delete data", ToastAndroid.LONG);
        } finally {
            toggleModal(false);
        }
    }

    return (
        <View style={styles.modalContainer}>
            <View style={[styles.popup_container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
                <ThemedText style={{ fontWeight: "bold" }}>Delete the selected table ?</ThemedText>
                <ThemedText>This action cannot be undone.</ThemedText>

                <View style={styles.button_views}>
                    <TouchableOpacity onPress={clearTable} style={[styles.delete_button, styles.both_button]}>
                        <Text style={{ color: "white" }}>Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleModal(false)} style={[styles.cancel_button, styles.both_button]}>
                        <Text style={{ color: "white" }}>Cancel</Text>
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
    button_views: {
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
        borderRadius: 50,
        paddingHorizontal: 24,
        paddingVertical: 10,
    }
});
