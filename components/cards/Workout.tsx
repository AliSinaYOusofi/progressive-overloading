import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedView } from '../ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import DeleteWorkout from '../Modals/DeleteWorkout';
import UpdateWorkout from '../Modals/UpdateWorkout';

type Workout = {
    id: number;
    exercise_name: string;
    exercise_description: string;
    sets: number;
    reps: number;
    weight: number;
    weight_type: string;
    date: string;
};

type WorkoutCardProps = {
    workout: Workout;
    
};

const WorkoutCard = ({ workout }: WorkoutCardProps) => {

    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [updateModal, setUpdateModal] = useState<boolean>(false)

    const colorScheme = useColorScheme()

    return (
        <>
            <View style={[styles.card, { backgroundColor: colorScheme === "dark" ? "#060B17" : "white"}]}>
                <ThemedText style={styles.title}>{workout.exercise_name}</ThemedText>
                <ThemedText style={styles.description}>{workout.exercise_description}</ThemedText>
                <ThemedText style={styles.detail}>Sets: {workout.sets}</ThemedText>
                <ThemedText style={styles.detail}>Reps: {workout.reps}</ThemedText>
                <ThemedText style={styles.detail}>
                    Weight: {workout.weight} {workout.weight_type}
                </ThemedText>
                <ThemedText style={styles.date}>Date: {workout.date}</ThemedText>
                
                <TouchableOpacity onPress={() => setUpdateModal(true)} style={[styles.closeButton, { backgroundColor: "#355e3b"}]}>
                    <ThemedText style={[styles.closeButtonText, ]}>Edit</ThemedText>
                    <MaterialIcons name="mode-edit-outline" size={24} color={colorScheme === "dark" ? "white" : "black"} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setDeleteModal(true)} style={[styles.closeButton, { backgroundColor: "#c04000"}]}>
                    <ThemedText style={[styles.closeButtonText, ]}> Delete </ThemedText>
                    <MaterialIcons name="delete-outline" size={24} color={colorScheme === "dark" ? "white" : "black"} />
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
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#888',
        marginTop: 10,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
