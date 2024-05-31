import React from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { StyleSheet, useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native'

export type GoalProps = {
    goalTitle: string,
    description: string,
    timeToComplete: string,
    remindMe: boolean,
    created: Date,
    updated: Date,
    achieved: number,
}

export default function MinimalGoalCard({ goalTitle, description, timeToComplete, remindMe, created, updated, achieved }: GoalProps) {
    const colorScheme = useColorScheme()

    return (
        <ThemedView>
            <TouchableOpacity>
                <ThemedView style={[styles.container, { borderBottomColor: colorScheme === "dark" ? "white" : "black" }]}>
                    <ThemedText style={styles.goal_title}>
                        {goalTitle}
                    </ThemedText>

                    <ThemedView style={styles.goal_details_container}>
                        <ThemedText style={styles.goal_details}>
                            {description}
                        </ThemedText>

                        <ThemedText>
                            Complete by: {timeToComplete}
                        </ThemedText>

                        <ThemedText>
                            Remind Me: {remindMe ? 'Yes' : 'No'}
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

    goal_title: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    goal_details: {
        fontSize: 16,
    },

    goal_details_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 10,
    }
})
