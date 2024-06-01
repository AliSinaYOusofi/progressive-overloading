import React from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import distanceFromNowInDays from '@/utils/returnDistanceInDays';

export type GoalProps = {
    goalTitle: string,
    description: string,
    timeToComplete: string,
    remindMe: boolean,
    created: Date,
    updated: Date,
    achieved: number,
    complete_in: string,
    goal_index: number
}

export default function MinimalGoalCard({ goalTitle, description, timeToComplete, remindMe, complete_in, goal_index }: GoalProps) {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#333" : "#fff", shadowColor: colorScheme === "dark" ? "#fff" : "#000" }]}>
            <TouchableOpacity>
                
                <ThemedText style={styles.goal_title}>{goal_index}. {goalTitle}</ThemedText>
                <View style={styles.goal_details_container}>
                    <ThemedText style={styles.goal_details}>{description}</ThemedText>
                    <ThemedText style={styles.goal_details}> I will complete it in: {complete_in}</ThemedText>
                    <ThemedText style={styles.goal_details}> Remaining days: {distanceFromNowInDays(timeToComplete)}</ThemedText>
                    <ThemedText style={styles.goal_details}>Complete by: {timeToComplete.split("T")[0]}</ThemedText>
                    <ThemedText style={styles.goal_details}>Remind Me: {remindMe ? 'Yes' : 'No'}</ThemedText>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    goal_title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    goal_details_container: {
        flexDirection: 'column',
    },
    goal_details: {
        fontSize: 14,
        marginBottom: 4,
    },
});
