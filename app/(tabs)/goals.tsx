import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ToastAndroid, useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import GoalCard from '@/components/home/GoalsList';
import NoGoalsAdded from '@/components/cards/NoGoalsAdded';
import { progressive_overloading } from '@/db/sqlitedb';
import { useAppContext } from '@/context/ContextProvider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AchievedGoalsCard from '@/components/cards/AcheivedGoalsCard';
import NoAcheviedGoalsCard from '@/components/cards/NoAcheviedGoalsCard';

export type Goal = {
    id: number,
    goal_title: string,
    description: string,
    time_to_complete: string,
    remind_me: boolean,
    created: Date,
    updated: Date,
    achevied: number,
    complete_in: string
}

export default function Goals() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [view, setView] = useState<'inProgress' | 'achieved'>('inProgress');
    const { refreshGoalsDatabase } = useAppContext();
    const colorScheme = useColorScheme();

    useEffect(() => {
        const fetchGoals = async (): Promise<void> => {
            try {
                const result: Goal[] = await progressive_overloading.getAllAsync(`SELECT * FROM goals WHERE acheived = ${view === 'inProgress' ? 0 : 1}`);
                setGoals(result.reverse());
                console.log("goals ", result);
            } catch (error) {
                console.error("failed to fetch data ", error);
                ToastAndroid.show("failed to fetch data", ToastAndroid.LONG);
            }
        };
        fetchGoals();
    }, [refreshGoalsDatabase, view]);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={<Feather size={310} name="target" style={styles.headerImage} />}
        >
            <ThemedView style={styles.container}>
                
                <View style={styles.buttonContainer}>
                
                    <TouchableOpacity
                        style={[
                            styles.button,
                            view === 'inProgress' && {
                                backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
                            },
                        ]}
                        onPress={() => setView('inProgress')}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                view === 'inProgress' && { color: colorScheme === 'dark' ? 'black' : 'white' },
                            ]}
                        >
                            In Progress
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            view === 'achieved' && {
                                backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
                            },
                        ]}
                        onPress={() => setView('achieved')}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                view === 'achieved' && { color: colorScheme === 'dark' ? 'black' : 'white' },
                            ]}
                        >
                            Achieved
                        </Text>
                    </TouchableOpacity>
                </View>
                {view === 'inProgress' ? (
                    <>
                        <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                            In Progress ({goals.length})
                        </ThemedText>
                        {goals.length > 0 ? (
                            goals.map(item => <GoalCard key={item.id} goal={item} />)
                        ) : (
                            <NoGoalsAdded />
                        )}
                    </>
                ) : (
                    <>
                        <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                            Achieved ({goals.length})
                        </ThemedText>
                        {goals.length > 0 ? (
                            goals.map(item => <AchievedGoalsCard key={item.id} goal={item} />)
                        ) : (
                            <NoAcheviedGoalsCard />
                        )}
                    </>
                )}
            </ThemedView>
        </ParallaxScrollView>
    );
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
        marginBottom: 10,
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'gray',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // default text color for buttons
    },
    goalCount: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
