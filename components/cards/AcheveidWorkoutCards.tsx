import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, useColorScheme, ToastAndroid } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import DeleteWorkout from '../Modals/DeleteWorkout';
import UpdateWorkout from '../Modals/UpdateWorkout';
import distanceFromNowInDays from '@/utils/returnDistanceInDays';
import { progressive_overloading } from '@/db/sqlitedb';
import { useAppContext } from '@/context/ContextProvider';
import { ThemedView } from '../ThemedView';

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
    achieved: number;
};

type AchievedWorkoutCardProps = {
    workout: Workout;
};

const AchievedWorkoutCard = ({ workout }: AchievedWorkoutCardProps) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    
    const { setRefreshDatabaseFetch } = useAppContext();
    
    const colorScheme = useColorScheme();
    const backgroundColorOfCards = { backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#fff' };
    const borderOfCards = { borderColor: "#ddd", borderWidth: 1, borderRadius: 8}

    const markAsInProgress = async (): Promise<void> => {
        try {
            let statement = await progressive_overloading.prepareAsync('UPDATE progressive_overloading SET acheived = 0 WHERE id = ?');
            await statement.executeAsync(workout.id);
            ToastAndroid.show('Workout marked as in progress', ToastAndroid.LONG);
            setRefreshDatabaseFetch(prev => !prev);
        } catch (error) {
            console.error('Error marking workout as in progress', error);
            ToastAndroid.show('Error marking workout as in progress', ToastAndroid.LONG);
        }
    };

    return (
        <>
            <ThemedView style={[styles.card, borderOfCards]}>
                <ThemedText style={styles.title}>{workout.exercise_name}</ThemedText>
                <View style={styles.justForBorder} />
                <ThemedText style={[styles.subtitle, { color: colorScheme === 'dark' ? '#c0c0c0' : '#333' }]}>Current:</ThemedText>
                <ThemedText style={styles.detail}>{workout.exercise_description}</ThemedText>
                <View style={styles.justForBorder} />
                <View style={styles.detailContainer}>
                    <ThemedText style={styles.detail}>Sets : {workout.sets}</ThemedText>
                    <ThemedText style={styles.detail}>Reps : {workout.reps}</ThemedText>
                    <ThemedText style={styles.detail}>Weight : {workout.weight} {workout.weight_type}</ThemedText>
                </View>
                <ThemedText style={[styles.subtitle, { color: colorScheme === 'dark' ? '#c0c0c0' : '#333' }]}>To:</ThemedText>
                <View style={styles.detailContainer}>
                    <ThemedText style={styles.detail}>Sets : {workout.future_sets}</ThemedText>
                    <ThemedText style={styles.detail}>Reps : {workout.future_reps}</ThemedText>
                    <ThemedText style={styles.detail}>Weight : {workout.future_weight} {workout.weight_type}</ThemedText>
                </View>

                <ThemedText style={styles.date}>Date: {workout.created.split('T')[0]} ({distanceFromNowInDays(workout.created)}) days ago</ThemedText>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setUpdateModal(true)} style={[styles.button, styles.editButton]}>
                        <MaterialIcons name='mode-edit-outline' size={24} color='white' />
                        <ThemedText style={styles.buttonText}>Edit</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDeleteModal(true)} style={[styles.button, styles.deleteButton]}>
                        <MaterialIcons name='delete-outline' size={24} color='white' />
                        <ThemedText style={styles.buttonText}>Delete</ThemedText>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={markAsInProgress} style={[styles.button, styles.markAsInProgressBtn]}>
                    <MaterialIcons name='restore' size={24} color='white' />
                    <ThemedText style={styles.markAsBtnText}>Mark as In Progress</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <Modal animationType='fade' visible={deleteModal} transparent={true}>
                <DeleteWorkout toggleModal={setDeleteModal} id={workout.id} />
            </Modal>

            <Modal animationType='fade' transparent={true} visible={updateModal}>
                <UpdateWorkout toggleModal={setUpdateModal} workout={workout} />
            </Modal>
        </>
    );
};

export default AchievedWorkoutCard;

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
    markAsInProgressBtn: {
        backgroundColor: '#00796B',
    },
    markAsBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    justForBorder: {
        borderColor: "#ddd",
        borderWidth: 0.3,
        marginBottom: 10,
    },
});
