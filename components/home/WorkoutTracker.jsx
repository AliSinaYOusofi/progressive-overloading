import { useState } from 'react'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ToastAndroid, FlatList } from 'react-native'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'
import WorkoutCards from './WorkoutCards'
import AddExerciseButton from './AddExerciseButton'
import { progressive_overloading } from '@/db/sqlitedb'
import { useAppContext } from '@/context/ContextProvider'
import NoWorkoutsAdded from '../cards/NoWorkoutsAdded'

export default function WorkoutTracker() {

    const [workouts, setWorkouts] = useState([])
    
    const { refreshDatabaseFetch } = useAppContext()

    useEffect( () => {
        // fetch workouts from database
        const fetchWorkout = async ()  => {
            try {
                const result = await progressive_overloading.getAllAsync("SELECT * FROM progressive_overloading")
                setWorkouts(result.reverse())
            } catch (error) {
                console.error("error fetching progressive_overloading workouts", error)
                ToastAndroid.show("Error fetching workouts", ToastAndroid.SHORT)
            }
        }

        fetchWorkout()
    }, [refreshDatabaseFetch])

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.workout_text}> 1. Progressive Overloading </ThemedText>

            {
                
                workouts.length
                ?
                <FlatList
                    data={workouts}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => <WorkoutCards 
                            exercise_name={item.exercise_name} 
                            reps={item.reps} 
                            sets={item.sets} 
                            weight={item.weight} 
                            weight_type={item.weight_type} 
                            workout_index={index}
                            id={item.id} 
                            created={item.created}
                            updated={item.updated}
                            future_reps={item.future_reps}
                            future_sets={item.future_sets}
                            future_weight={item.future_weight}
                            achevied={item.acheived}
                        />
                    }
                />
                
                :
                <NoWorkoutsAdded />
            }
            <AddExerciseButton />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    workout_text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    }
})