import React, { useEffect, useRef, useState } from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { FlatList, StyleSheet, ToastAndroid, View } from 'react-native'
import NoGoalsAdded from '../cards/NoGoalsAdded'
import AddGoalsPopup from '../Modals/AddGoalsPopup'
import AddGoalsButton from '../home/AddGoalsButton'
import { progressive_overloading } from '@/db/sqlitedb'
import MinimalGoalCard from '../cards/MinimalGoalCard'
import { useAppContext } from '@/context/ContextProvider'
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';
export type Goal = {
    id: number,
    goal_title: string,
    description: string,
    time_to_complete: string,
    remind_me: boolean,
    created: string,
    updated: string,
    achevied: number
    complete_in: string
}
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-1665900038997295/9829014595';

export default function GoalSetting() {
    
    const [goals, setGoals] = useState<Goal[]>([])
    const { refreshGoalsDatabase } = useAppContext()
    const bannerRef = useRef(null);

    useEffect( () => {
        const fetchGoals = async () : Promise<void> => {
            try {
                const result: Goal[] = await progressive_overloading.getAllAsync("SELECT * FROM goals")
                setGoals(result.reverse())
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
                <FlatList
                    data={goals}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => <MinimalGoalCard goal_index={index}  complete_in={item.complete_in} key={item.id} goalTitle={item.goal_title} description={item.description} timeToComplete={item.time_to_complete} created={item.created} updated={item.updated} achieved={item.achevied} remindMe={item.remind_me}/>}
                />
                :
                <NoGoalsAdded />
            }
            <AddGoalsButton />
            <View style={{marginTop: 20}}/>
            <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
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