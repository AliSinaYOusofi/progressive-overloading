import { ThemedText } from '../ThemedText'
import React, { useEffect, useState } from 'react';
import { ToastAndroid, useColorScheme } from 'react-native';
import { progressive_overloading } from '@/db/sqlitedb';
import { useAppContext } from '@/context/ContextProvider';
import AchievedWorkoutCard from '../cards/AcheveidWorkoutCards';
import NoAcheivedWorkout from '../cards/NoAcheivedWorkout';

type Workout = {
  id: number;
  exercise_name: string;
  exercise_description: string;
  sets: number;
  reps: number;
  weight: number;
  weight_type: string;
  created: string;
  weightType: string;
  future_sets: number;
  future_reps: number;
  future_weight: number;
  achieved: number;
};

export default function AcheviedWorkouts() {

    const [acheviedWorkouts, setAcheivedWorkouts] = useState<Workout[]>([]);
    
    const { refreshDatabaseFetch } = useAppContext();
    const colorScheme = useColorScheme();

    useEffect(() => {
        const fetchWorkout = async () => {
        try {
            const result: Workout[] = await progressive_overloading.getAllAsync("SELECT * FROM progressive_overloading WHERE acheived = 1");
            setAcheivedWorkouts(result.reverse());
        } catch (error) {
            console.error("Error fetching progressive_overloading workouts", error);
            ToastAndroid.show("Error fetching workouts", ToastAndroid.SHORT);
        }
        };

        fetchWorkout();
    }, [refreshDatabaseFetch]);

    return (
        <>
            <ThemedText style={{fontSize: 20, fontWeight: 'bold',marginBottom: 10,}}>
                Achevied Workouts ({acheviedWorkouts.length})
            </ThemedText>
            {
                acheviedWorkouts.length > 0 ? (
                    acheviedWorkouts.map((workout, index) => <AchievedWorkoutCard key={index} workout={workout} />)
                  ) : (
                    <NoAcheivedWorkout />
                )
            }
        </>
    )
    }
