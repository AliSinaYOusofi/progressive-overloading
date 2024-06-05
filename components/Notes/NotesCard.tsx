import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Modal, ToastAndroid } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import DeleteGoal from '../Modals/DeleteGoal';
import UpdateGoalsPopup from '../Modals/UpdateGoalsPopup';
import distanceFromNowInDays from '@/utils/returnDistanceInDays';
import { progressive_overloading } from '@/db/sqlitedb';
import { useAppContext } from '@/context/ContextProvider';
import { notes } from './AddNotesPopup';
import DeleteNote from './DeleteNote';
import EditNotesPopup from './EditNotesPopup';


const NotesCard = (notes: notes) => {
    
    const colorScheme = useColorScheme();
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const backgroundColorOfCards = { backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#fff" }
    const borderOfCards = { borderColor: colorScheme === "dark" ? "white" : "black", borderWidth: 1, borderRadius: 8}
    const { setRefresNotesTable } = useAppContext()

    return (
        <>
            <View style={[styles.card, backgroundColorOfCards, borderOfCards]}>
                
                <ThemedText style={styles.title}>{notes.title}</ThemedText>
                
                <View style={styles.detailContainer}>
                    <ThemedText style={styles.detail}>Description: {notes.content}</ThemedText>
                </View>
                
                <ThemedText style={styles.date}>Created: {new Date(notes.created).toDateString()}</ThemedText>
                
                <ThemedText style={styles.date}>Updated: {new Date(notes.updated).toDateString()}</ThemedText>
                
                <View style={styles.buttonContainer}>
                    
                    <TouchableOpacity onPress={() => setUpdateModal(true)} style={[styles.button, styles.editButton]}>
                        <MaterialIcons name="mode-edit-outline" size={24} color="white" />
                        <ThemedText style={styles.buttonText}>Edit</ThemedText>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => setDeleteModal(true)} style={[styles.button, styles.deleteButton]}>
                        <MaterialIcons name="delete-outline" size={24} color="white" />
                        <ThemedText style={styles.buttonText}>Delete</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="fade"
                visible={deleteModal}
                transparent={true}
            >
                <DeleteNote toggleModal={setDeleteModal} id={notes.id}/>
            </Modal>

            <Modal
                animationType="fade"
                visible={updateModal}
                transparent={true}
            >
                <EditNotesPopup toggleModal={setUpdateModal} notes={notes}/>
            </Modal>
            
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        borderRadius: 10,
        padding: 20,
        margin: 10,
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4a4a4a',
    },
    detailContainer: {
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        marginBottom: 5,
        color: '#6b6b6b',
    },
    date: {
        fontSize: 14,
        color: '#888',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        margin: 5,
    },
    editButton: {
        backgroundColor: '#355e3b',
    },
    deleteButton: {
        backgroundColor: '#c04000',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    noGoalsText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },

    mark_as_done_btn: {
        backgroundColor: "#6200EA",
    },

    mark_as_btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10
    }
});

export default NotesCard