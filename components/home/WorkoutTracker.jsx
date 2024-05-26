import { useState } from 'react'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'
import WorkoutCards from './WorkoutCards'
import AddExerciseButton from './AddExerciseButton'

export default function WorkoutTracker() {

    const [workouts, setWorkouts] = useState([])

    useEffect( () => {
        // fetch workouts from database
    }, [])
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.workout_text}> Workout Tracker</ThemedText>
            <WorkoutCards />
            <WorkoutCards />
            <WorkoutCards />
            <AddExerciseButton />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    workout_text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    }
})