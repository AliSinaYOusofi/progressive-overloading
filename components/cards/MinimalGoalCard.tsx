import React from 'react';
import { View, StyleSheet, useColorScheme, TouchableOpacity, Dimensions } from 'react-native';
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
    const borderOfCards = { borderColor: "#ddd", borderWidth: 1, borderRadius: 8}

    return (
            <TouchableOpacity style={[styles.container, borderOfCards]}>
                <ThemedText style={styles.goalTitle}>{goal_index}. {goalTitle}</ThemedText>
                <ThemedText numberOfLines={2} style={styles.description}>{description}</ThemedText>
                
                <View style={styles.date_view}>
                    <ThemedText style={styles.details}>Complete by: {timeToComplete.split("T")[0]}</ThemedText>
                    <ThemedText style={styles.details}>Remaining : {distanceFromNowInDays(timeToComplete)} day(s)</ThemedText>
                </View>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        minWidth: Dimensions.get('window').width - 100,
        maxWidth: Dimensions.get('window').width - 100,
        minHeight: Dimensions.get('window').height - 600,
        maxHeight: Dimensions.get('window').height - 600,
        marginRight: 4,
        overflow: "scroll",
        position: "relative"
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

    date_view:{
        position: "absolute",
        bottom: 0,
        left: 16,
    }
});
