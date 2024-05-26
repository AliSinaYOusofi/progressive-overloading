import React from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { StyleSheet } from 'react-native'

export type workoutProps = {
    exerciseName: string,
    numberOfSets: number,
    numberOfReps: number,
    weight: number
}

export default function WorkoutCards({exerciseName = 'Bench Press' , numberOfSets = 2 , numberOfReps = 12, weight = 20}: workoutProps) {
    return (
        <ThemedView>
            <ThemedView style={styles.container}>
                
                <ThemedText style={styles.exercise_name}>
                    {exerciseName}
                </ThemedText>
                
                <ThemedView style={styles.exercise_details_container}>
                    <ThemedText style={styles.exercise_details}>
                        {numberOfSets} sets
                    </ThemedText>

                    <ThemedText>
                        {numberOfReps} reps
                    </ThemedText>

                    <ThemedText>
                        {weight} kg
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    exercise_name: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    exercise_details: {
        fontSize: 16,
    },

    exercise_details_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 10
    }
})