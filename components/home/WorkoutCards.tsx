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
    weightType: string
}

export default function WorkoutCards({exerciseName = 'Bench Press' , numberOfSets = 2 , numberOfReps = 12, weight = 20, weightType= 'kg'}: workoutProps) {
    const colorScheme = useColorScheme()

    return (
        <ThemedView>

            <TouchableOpacity>

                <ThemedView style={[styles.container, { borderBottomColor: colorScheme === "dark" ? "white" : "black"}]}>
                    
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
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        
        borderBottomWidth: 1,
        flexWrap: "wrap"
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