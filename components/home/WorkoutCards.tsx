import React from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { StyleSheet, useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native'

export type workoutProps = {
    exerciseName: string,
    numberOfSets: number,
    numberOfReps: number,
    weight: number,
    weightType: string,
    workout_index: number
}

export default function WorkoutCards({exerciseName = 'Bench Press' , numberOfSets = 2 , numberOfReps = 12, weight = 20, weightType= 'kg', workout_index}: workoutProps) {
    const colorScheme = useColorScheme()

    return (
        <ThemedView style={[styles.card, { backgroundColor: colorScheme === "dark" ? "#333" : "#fff", shadowColor: colorScheme === "dark" ? "#fff" : "#000" }]}>
            <TouchableOpacity>
                <ThemedView style={styles.container}>
                    <ThemedText style={styles.exercise_name}>
                        {workout_index}
                    </ThemedText>
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
                            {weight} {weightType}
                        </ThemedText>
                    </ThemedView>
                </ThemedView>
            </TouchableOpacity>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        flexWrap: "wrap",
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
        columnGap: 10,
    }
})
