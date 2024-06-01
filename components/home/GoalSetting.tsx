import React, { useEffect, useState } from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { StyleSheet, ToastAndroid } from 'react-native'
import NoGoalsAdded from '../cards/NoGoalsAdded'
import AddGoalsPopup from '../Modals/AddGoalsPopup'
import AddGoalsButton from '../home/AddGoalsButton'
import { progressive_overloading } from '@/db/sqlitedb'
import MinimalGoalCard from '../cards/MinimalGoalCard'
import { useAppContext } from '@/context/ContextProvider'

export type Goal = {
    id: number,
    goal_title: string,
    description: string,
    time_to_complete: string,
    remind_me: boolean,
    created: Date,
    updated: Date,
    achevied: number
    complete_in: string
}
export default function GoalSetting() {
    
    const [goals, setGoals] = useState<Goal[]>([])
    const { refreshGoalsDatabase } = useAppContext()

    useEffect( () => {
        const fetchGoals = async () : Promise<void> => {
            try {
                const result: Goal[] = await progressive_overloading.getAllAsync("SELECT * FROM goals")
                setGoals(result)
            } catch (error) {
                console.error("failed to fetch data ", error)
                ToastAndroid.show("failed to fetch data ", ToastAndroid.LONG)
            }
        }
        fetchGoals()
    }, [refreshGoalsDatabase])
    
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.goal_text}> 2. Goals </ThemedText>
            {
                goals.length
                ?
                goals.map((item, index) => <MinimalGoalCard goal_index={index} complete_in={item.complete_in} key={item.id} goalTitle={item.goal_title} description={item.description} timeToComplete={item.time_to_complete} created={item.created} updated={item.updated} achieved={item.achevied} remindMe={item.remind_me}/>)
                :
                <NoGoalsAdded />
            }
            <AddGoalsButton />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    goal_text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    }
})