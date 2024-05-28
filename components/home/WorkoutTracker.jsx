import { useState } from 'react'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'
import WorkoutCards from './WorkoutCards'
import AddExerciseButton from './AddExerciseButton'
import { progressive_overloading } from '@/db/sqlitedb'

export default function WorkoutTracker() {

    const [workouts, setWorkouts] = useState([])

    useEffect( () => {
        // fetch workouts from database
        const fetchWorkout = async ()  => {
            try {
                const result = await progressive_overloading.getAllAsync("SELECT * FROM progressive_overloading")
                setWorkouts(result)
            } catch (error) {
                console.error("error fetching progressive_overloading workouts", error)
                ToastAndroid.show("Error fetching workouts", ToastAndroid.SHORT)
            }
        }

        fetchWorkout()
    }, [])
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.workout_text}> Workout Tracker</ThemedText>
            {
                workouts.map(workout => <WorkoutCards
                    key={workout.id} 
                    exerciseName={workout.exercise_name}
                    numberOfReps={workout.reps}
                    numberOfSets={workout.sets}
                    weight={workout.weight}
                    weightType={workout.weight_type}
                    />
                )
            }
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