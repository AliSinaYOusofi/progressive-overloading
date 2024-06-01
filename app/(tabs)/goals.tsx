import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import NoGoalsAdded from '@/components/cards/NoGoalsAdded'
import GoalCard from '@/components/home/GoalsList'
import { useAppContext } from '@/context/ContextProvider'
import { progressive_overloading } from '@/db/sqlitedb'
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { StyleSheet, ToastAndroid } from 'react-native'

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

export default function goals() {

    const [goals, setGoals] = useState<Goal[]>([])
    const { refreshGoalsDatabase } = useAppContext()

    useEffect( () => {
        const fetchGoals = async () : Promise<void> => {
            try {
                const result: Goal[] = await progressive_overloading.getAllAsync("SELECT * FROM goals")
                setGoals(result)
                console.log("goals ", result)
            } catch (error) {
                console.error("failed to fetch data ", error)
                ToastAndroid.show("failed to fetch data ", ToastAndroid.LONG)
            }
        }
        fetchGoals()
    }, [refreshGoalsDatabase])

    return (
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={<Feather size={310} name="target" style={styles.headerImage} />}
      >

            <ThemedView style={styles.container}>
                <ThemedText style={styles.goal_text}> 2. Goals </ThemedText>
                {
                    goals.length
                    ?
                    goals.map(item => <GoalCard key={item.id} goal={item}/>)
                    :
                    <NoGoalsAdded />
                }
                
            </ThemedView>
      </ParallaxScrollView>
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
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
})