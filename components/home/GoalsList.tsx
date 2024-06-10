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

export type Goal = {
    id: number;
    goal_title: string;
    description: string;
    time_to_complete: string;
    remind_me: boolean;
    created: Date;
    updated: Date;
    achevied: number;
    complete_in: string
};

type GoalCardProps = {
    goal: Goal;
};

const GoalCard = ({ goal }: GoalCardProps) => {
    
    const colorScheme = useColorScheme();
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const backgroundColorOfCards = { backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#fff" }
    const borderOfCards = { borderColor: "#ddd", borderWidth: 1, borderRadius: 8}
    const {setRefreshGoalsDatabase} = useAppContext()
    const markGoalAsAcheived = async () : Promise<void> => {
        try {
            let statement = await progressive_overloading.prepareAsync('UPDATE goals SET acheived = 1 WHERE id = ?');
            await statement.executeAsync(goal.id);
            ToastAndroid.show('Goal marked as acheived', ToastAndroid.LONG);
            setRefreshGoalsDatabase(prev => !prev);
        } catch (error) {
            console.error('Error marking goal as acheived', error);
            ToastAndroid.show('Error marking goal as acheived', ToastAndroid.LONG);
        }
    }

    return (
        <>
            <ThemedView style={[styles.card, borderOfCards]}>
                
                <ThemedText style={styles.title}>{goal.goal_title}</ThemedText>
                
                <View style={styles.detailContainer}>
                    <ThemedText style={styles.detail}>Description: {goal.description}</ThemedText>
                    <ThemedText style={styles.detail}>I will complete in: {goal.complete_in}</ThemedText>
                    <ThemedText style={styles.detail}>Remaining days: {distanceFromNowInDays(goal.time_to_complete)}</ThemedText>
                    <ThemedText style={styles.detail}>Time to Complete: {goal.time_to_complete.split("T")[0]}</ThemedText>
                    {/* <ThemedText style={styles.detail}>Remind Me: {goal.remind_me ? 'Yes' : 'No'}</ThemedText> */}
                </View>
                
                <ThemedText style={styles.date}>Created: {new Date(goal.created).toDateString()}</ThemedText>
                
                <ThemedText style={styles.date}>Updated: {new Date(goal.updated).toDateString()}</ThemedText>
                
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
                <TouchableOpacity onPress={markGoalAsAcheived} style={[styles.button, styles.mark_as_done_btn]}>
                    <MaterialIcons name="check-circle-outline" size={24} color="white" />
                    <ThemedText style={styles.mark_as_btn_text}>Mark as achevied</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <Modal
                animationType="fade"
                visible={deleteModal}
                transparent={true}
            >
                <DeleteGoal toggleModal={setDeleteModal} id={goal.id}/>
            </Modal>

            <Modal
                animationType="fade"
                visible={updateModal}
                transparent={true}
            >
                <UpdateGoalsPopup toggleModal={setUpdateModal} goal={goal}/>
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
        borderRadius: 50,
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

export default GoalCard