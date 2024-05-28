import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { ThemedView } from '../ThemedView';

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
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{workout.exercise_name}</Text>
            <Text style={styles.description}>{workout.exercise_description}</Text>
            <Text style={styles.detail}>Sets: {workout.sets}</Text>
            <Text style={styles.detail}>Reps: {workout.reps}</Text>
            <Text style={styles.detail}>
                Weight: {workout.weight} {workout.weight_type}
            </Text>
            <Text style={styles.date}>Date: {new Date(workout.date).toLocaleString()}</Text>
            
            <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton}>
                <Text> Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WorkoutCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
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
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
