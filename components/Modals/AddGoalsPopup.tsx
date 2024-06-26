import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Switch, ToastAndroid, View, useColorScheme } from 'react-native'
import { TextInput } from 'react-native'
import { ThemedView } from '../ThemedView'
import { TouchableOpacity } from 'react-native'
import { ThemedText } from '../ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { progressive_overloading } from '@/db/sqlitedb'
import { useAppContext } from '@/context/ContextProvider'
import parseNaturalLanguageDate from '@/utils/parseNaturalLanguageDate'
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-1665900038997295/5732721441';

export const interstitialAds = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['gym', 'fitness', 'workout', 'exercise', 'health', 'nutrition', 'muscle', 'training', 'weights', 'bodybuilding'],
});

export type typeToggleModal = {
    toggleModal: (toggle: boolean) => void;
}

export default function AddGoalsPopup({toggleModal} : typeToggleModal) {

    const colorScheme = useColorScheme()
    const [goalName, setGoalName] = useState<string>("")
    const [goalDescription, setGoalDescription] = useState<string>("")
    const [timeToComplete, setTimeToComplete] = useState<any>(0)
    
    const { setRefreshGoalsDatabase } = useAppContext()

    const addNewExercise = async () : Promise<void> => {
        
        if (goalName === "") {
            ToastAndroid.show("Please enter a goal title", ToastAndroid.LONG)
            return
        }
        
        else if (timeToComplete === "") {
            ToastAndroid.show("Please enter a time to complete", ToastAndroid.LONG)
            return
        }
        let time_to_complete : string
        try {
            time_to_complete = parseNaturalLanguageDate(timeToComplete).toISOString()
        } catch (error) {
            console.error("unsupported date text provided", error)
            ToastAndroid.show("unsupported date text provided", ToastAndroid.LONG)
            return
        }

        try {
            
            let statement = await progressive_overloading.prepareAsync("INSERT INTO goals (goal_title, description, complete_in, time_to_complete, created, updated, acheived) VALUES (?, ?, ?, ?, ?, ?, ?)")
            await statement.executeAsync([goalName, goalDescription, timeToComplete, time_to_complete, new Date().toISOString(), new Date().toISOString(), 0])
            ToastAndroid.show("goal added", ToastAndroid.LONG)
            setRefreshGoalsDatabase(prev => ! prev)
            if (loaded) interstitialAds.show()
            console.log("ads not loaded")
            
        } catch (error) {
            console.error("error adding new goal", error)
            ToastAndroid.show("error adding new goal", ToastAndroid.LONG)
        } finally {
            toggleModal(false)
        }
    }

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = interstitialAds.addAdEventListener(AdEventType.LOADED, () => {
        setLoaded(true);
        });

        interstitialAds.load();

        return unsubscribe;
    }, []);

    return (
        <KeyboardAvoidingView style={[styles.modalContainer, ]}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <View style={[styles.popup_options_container, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
            
                <View style={[styles.inputs, { marginTop: 50}]}>
                    
                    <TextInput
                        placeholder='Goal Title'
                        value={goalName}
                        onChangeText={text => setGoalName(text)}
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2'}]}
                        
                    />
                </View>
                
                <View style={styles.inputs}>
                    
                    <TextInput
                        placeholder='Goal Descriptoin'
                        value={goalDescription}
                        numberOfLines={3}
                        multiline={true}
                        onChangeText={text => setGoalDescription(text)}
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2', textAlignVertical: "top"}]}
                    />
                </View>

                <View style={[styles.inputs, {flexDirection: 'column'}]}>

                    <ThemedText style={{alignSelf: "flex-start", marginBottom: 10, fontWeight: "bold", marginLeft: 10}}> I will acheive this goal in : </ThemedText>
                    <TextInput
                        value={timeToComplete}
                        onChangeText={text => setTimeToComplete(text)}
                        placeholder='eg : 5 days, one week, one month, one year ...'
                        keyboardType="ascii-capable"
                        style={[styles.inputs, {backgroundColor: colorScheme === "dark" ? 'white' : '#F6F5F2', borderRadius: 4,}]}
                    />
                </View>
            
                {/* <View style={[ {flexDirection: 'row', justifyContent: "flex-start", "alignItems" : "center"}]}>

                    <ThemedText style={{alignSelf: "center", fontWeight: "bold"}}> Remind me : </ThemedText>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={remindMe ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={remindMe}
                        style={{marginTop: 3}}
                    />
                    
                </View> */}

                <ThemedView style={[styles.container, { backgroundColor: colorScheme === "dark" ? 'white' : 'black', borderRadius: 50}]}>
                    <TouchableOpacity onPress={addNewExercise}>
                        <ThemedText style={[styles.text, { color: colorScheme !== "dark" ? 'white' : 'black'}]}>
                            Add Goal
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>

                <Pressable 
                    onPress={() => toggleModal(false)}
                    style={[styles.pressable, { backgroundColor: colorScheme === "dark" ? 'white' : 'black'}]}
                >
                    <Ionicons 
                        name="close-outline" 
                        size={20} 
                        color={colorScheme !== "dark" ? 'white' : 'black'}
                    />
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: "relative",
        
    },

    popup_options_container: {
        
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    inputs: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4,
    },

    exercise_details: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        columnGap: 20
    },

    container: {
        padding: 10,
        borderRadius: 4,
        marginTop: 10,
        width: "70%",
        marginBottom: 10
    },

    text: {
        textAlign: 'center'
    },

    pressable: {
        position: 'absolute',
        zIndex: 1,
        
        padding: 5,
        borderRadius: 50,
        color: "black",
        top: 10,
        right: 10
    },

    weight: {
        width: "80%"
    },

    pickerContainer: {
        flex: 1,
    },

    current_and_future_details: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        columnGap: 20
    },

    current_and_future_text : {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
        marginLeft: "7%",
        marginTop: 10
    }
})