import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Modal } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import DeleteGoal from '../Modals/DeleteGoal';

export type Goal = {
    id: number;
    goal_title: string;
    description: string;
    time_to_complete: string;
    remind_me: boolean;
    created: Date;
    updated: Date;
    achevied: React.ReactNode;
};

type GoalCardProps = {
    goal: Goal;
};

const GoalCard = ({ goal }: GoalCardProps) => {
    
    const colorScheme = useColorScheme();
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);

    return (
        <>
            <View style={[styles.card, { backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#fff" }]}>
                
                <ThemedText style={styles.title}>{goal.goal_title}</ThemedText>
                
                <View style={styles.detailContainer}>
                    <ThemedText style={styles.detail}>Description: {goal.description}</ThemedText>
                    <ThemedText style={styles.detail}>Time to Complete: {goal.time_to_complete}</ThemedText>
                    <ThemedText style={styles.detail}>Remind Me: {goal.remind_me ? 'Yes' : 'No'}</ThemedText>
                </View>
                
                <ThemedText style={styles.date}>Created: {new Date(goal.created).toDateString()}</ThemedText>
                
                <ThemedText style={styles.date}>Updated: {new Date(goal.updated).toDateString()}</ThemedText>
                
                <View style={styles.buttonContainer}>
                    
                    <TouchableOpacity style={[styles.button, styles.editButton]}>
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
                <DeleteGoal toggleModal={setDeleteModal} id={goal.id}/>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
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
});

export default GoalCard