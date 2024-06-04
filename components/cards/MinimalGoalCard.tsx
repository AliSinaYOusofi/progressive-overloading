import React from 'react';
import { View, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import distanceFromNowInDays from '@/utils/returnDistanceInDays';

export type GoalProps = {
    goalTitle: string,
    description: string,
    timeToComplete: string,
    remindMe: boolean,
    goal_index: number,
    complete_in: string,
    created: Date,
    updated: Date,
    achieved: number
}

export default function MinimalGoalCard({ goalTitle, description, timeToComplete, remindMe, goal_index }: GoalProps) {
    const colorScheme = useColorScheme();

    const backgroundColorOfCards = { backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#fff" }
    const borderOfCards = { borderColor: colorScheme === "dark" ? "white" : "black", borderWidth: 1, borderRadius: 8 }

    return (
        <View style={[styles.container, borderOfCards, { marginLeft: 10}]}>
            <TouchableOpacity style={{width: "100%", marginRight: 20, marginLeft: 10}}>
                <ThemedText style={styles.goalTitle}>{goal_index}. {goalTitle}</ThemedText>
                <ThemedText style={styles.description}>{description}</ThemedText>
                <ThemedText style={styles.details}>Complete by: {timeToComplete.split("T")[0]}</ThemedText>
                <ThemedText style={styles.details}>Remaining days: {distanceFromNowInDays(timeToComplete)}</ThemedText>
                <ThemedText style={styles.remindMe}>Remind Me: {remindMe ? 'Yes' : 'No'}</ThemedText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        width: "auto",
        
    },
    goalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    details: {
        fontSize: 14,
        marginBottom: 4,
    },
    remindMe: {
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 4,
    },
});
