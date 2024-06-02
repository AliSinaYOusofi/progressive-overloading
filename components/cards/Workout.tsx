import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedView } from '../ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import DeleteWorkout from '../Modals/DeleteWorkout';
import UpdateWorkout from '../Modals/UpdateWorkout';
import distanceFromNowInDays from '@/utils/returnDistanceInDays';

type Workout = {
    id: number;
    exercise_name: string;
    exercise_description: string;
    sets: number;
    reps: number;
    weight: number;
    weight_type: string;
    created: string;
    future_sets: number;
    future_reps: number;
    future_weight: number;
};

type WorkoutCardProps = {
    workout: Workout;
};

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);

    const colorScheme = useColorScheme();
    const backgroundColorOfCards = { backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#fff" }
    const borderOfCards = { borderColor: colorScheme === "dark" ? "white" : "black", borderWidth: 1, borderRadius: 8}
    
    const markAsAchevied = async () : Promise<void> => {
        
    }

    return (
        <>
            <View style={[styles.card, backgroundColorOfCards, borderOfCards]}>
                <ThemedText style={styles.title}>{workout.exercise_name}</ThemedText>
                <ThemedText style={[styles.subtitle, { color: colorScheme === "dark" ? "#c0c0c0" : "#333" }]}>Current:</ThemedText>
                <View style={styles.detailContainer}>
                    <ThemedText style={styles.detail}>Notes : {workout.exercise_description}</ThemedText>
                    <ThemedText style={styles.detail}>Sets : {workout.sets}</ThemedText>
                    <ThemedText style={styles.detail}>Reps : {workout.reps}</ThemedText>
                    <ThemedText style={styles.detail}>Weight : {workout.weight} {workout.weight_type}</ThemedText>
                </View>
                <ThemedText style={[styles.subtitle, { color: colorScheme === "dark" ? "#c0c0c0" : "#333" }]}>To:</ThemedText>
                <View style={styles.detailContainer}>
                    <ThemedText style={styles.detail}>Sets : {workout.future_sets}</ThemedText>
                    <ThemedText style={styles.detail}>Reps : {workout.future_reps}</ThemedText>
                    <ThemedText style={styles.detail}>Weight : {workout.future_weight} {workout.weight_type}</ThemedText>
                </View>

                <ThemedText style={styles.date}>Date: {workout.created.split("T")[0]} ({distanceFromNowInDays(workout.created)}) days ago</ThemedText>
                
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

                <TouchableOpacity onPress={() => setUpdateModal(true)} style={[styles.button, styles.mark_as_done_btn]}>
                        <MaterialIcons name="check-circle-outline" size={24} color="white" />
                        <ThemedText style={styles.mark_as_btn_text}>Mark as achevied</ThemedText>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                visible={deleteModal}
                transparent={true}
            >
                <DeleteWorkout toggleModal={setDeleteModal} id={workout.id}/>
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={updateModal}
            >
                <UpdateWorkout toggleModal={setUpdateModal} workout={workout}/>
            </Modal>
        </>
    );
};

export default WorkoutCard;

const styles = StyleSheet.create({
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
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
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
