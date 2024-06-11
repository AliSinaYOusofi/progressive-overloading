import React, { useState } from 'react';
import { View, StyleSheet, useColorScheme, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { ThemedText } from '../ThemedText';
import distanceFromNowInDays from '@/utils/returnDistanceInDays';
import GoalsDetailsPopup from '../Detaill on click/GoalsDetailsPopup'
import Goals from '@/app/(tabs)/goals';
export type GoalProps = {
    goalTitle: string,
    description: string,
    timeToComplete: string,
    remindMe: boolean,
    goal_index: number,
    complete_in: string,
    created: string,
    updated: string,
    achieved: number,
}

export default function MinimalGoalCard({ goalTitle, description, timeToComplete, complete_in, goal_index, created, updated, achieved }: GoalProps) {
    
    const [modal, setModal] = useState<boolean>(false)

    const borderOfCards = { borderColor: "#ddd", borderWidth: 1, borderRadius: 8}

    return (
        <>
            <TouchableOpacity onPress={() => setModal(true)} style={[styles.container, borderOfCards]}>
                <ThemedText style={styles.goalTitle}>{goal_index}. {goalTitle}</ThemedText>
                <View style={styles.justForBorder} />
                <ThemedText numberOfLines={2} style={styles.description}>{description}</ThemedText>
                
                <View style={styles.date_view}>
                    <ThemedText style={styles.details}>Complete by: {timeToComplete.split("T")[0]}</ThemedText>
                    <ThemedText style={styles.details}>Remaining : {distanceFromNowInDays(timeToComplete)} day(s)</ThemedText>
                </View>
            </TouchableOpacity>

            <Modal
                visible={modal}
                onRequestClose={() => setModal(false)}
                animationType='slide'
                transparent={true}
            >
                <GoalsDetailsPopup 
                    goalTitle={goalTitle}
                    onClose={setModal}
                    description={description}
                    created={created}
                    updated={updated}
                    timeToComplete={timeToComplete}
                    complete_in={complete_in}
                    achieved={achieved}
                />
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        minWidth: 320,
        maxWidth: 320,
        minHeight: 200,
        maxHeight:  200,
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
        color: "gray",
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
    },
    justForBorder: {
        borderColor: "#ddd",
        borderWidth: 0.3,
        marginBottom: 10,
    },
});
