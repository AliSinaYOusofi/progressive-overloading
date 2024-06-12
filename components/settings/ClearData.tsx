import React, { useState } from 'react'
import { View, StyleSheet, Switch, Modal, TouchableOpacity } from 'react-native'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { useColorScheme } from 'react-native'
import { Entypo, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons'
import DeleteTablesPopup from './DeleteTablesPopup'

export default function ClearData() {
    const colorScheme = useColorScheme()
    const iconColor = colorScheme === 'dark' ? 'white' : 'black'

    const [clearProgressive, setClearProgressive] = useState(false)
    const [clearGoals, setClearGoals] = useState(false)
    const [clearNotes, setClearNotes] = useState(false)
    const [popup, setPopup] = useState(false)

    const handleClearData = () => {
        setPopup(true)
    }

    return (
        <>
            <View style={styles.container}>
                <View>
                    <ThemedText style={styles.title}>Clear Data</ThemedText>
                </View>
                
                <ThemedText style={styles.automatic_description}>
                    * Warning: This will permanently delete all data in the selected tables.
                </ThemedText>
                
                <ThemedView style={styles.icon_and_text_container}>
                    <View style={styles.start_and_far_end}>
                        <View>
                            <View style={styles.icon_and_text}>
                                <Entypo name="bar-graph" size={24} color={iconColor} />
                                <ThemedText>Progressive Overloading</ThemedText>
                            </View>
                        </View>
                        <View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={clearProgressive ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                value={clearProgressive}
                                onValueChange={setClearProgressive}
                                style={{ marginTop: 3 }}
                            />
                        </View>
                    </View>

                    <View style={styles.start_and_far_end}>
                        <View>
                            <View style={styles.icon_and_text}>
                                <FontAwesome6 name="bullseye" size={24} color={iconColor} />
                                <ThemedText>Goals</ThemedText>
                            </View>
                        </View>
                        <View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={clearGoals ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                value={clearGoals}
                                onValueChange={setClearGoals}
                                style={{ marginTop: 3 }}
                            />
                        </View>
                    </View>

                    <View style={styles.start_and_far_end}>
                        <View>
                            <View style={styles.icon_and_text}>
                                <Ionicons name="clipboard" size={24} color={iconColor} />
                                <ThemedText>Notes</ThemedText>
                            </View>
                        </View>
                        <View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={clearNotes ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                value={clearNotes}
                                onValueChange={setClearNotes}
                                style={{ marginTop: 3 }}
                            />
                        </View>
                    </View>
                </ThemedView>

                {
                    (clearProgressive || clearGoals || clearNotes) &&
                    <View style={styles.clearButtonContainer}>
                        <TouchableOpacity style={styles.clearButton} onPress={handleClearData}>
                            <MaterialIcons name="delete-outline" size={24} color="white" />
                            <ThemedText style={styles.clearButtonText}>Clear Data</ThemedText>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <Modal
                visible={popup}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setPopup(false)}
            >
                <DeleteTablesPopup 
                    toggleModal={setPopup} 
                    tables={{clearGoals, clearNotes , clearProgressive}}
                    clearGoals={setClearGoals}
                    clearNotes={setClearNotes}
                    clearProgressive={setClearProgressive} 
                />
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        marginTop: 30,
        marginHorizontal: "auto"
    },

    icon_and_text: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        columnGap: 10,
    },

    icon_and_text_container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        columnGap: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: "#ddd",
        rowGap: 20
    },

    start_and_far_end: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        columnGap: 10,
        width: "100%",
        
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },

    clearButtonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },

    clearButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    clearButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },

    automatic_description: {
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'justify',
        color: "gray",
        marginBottom: 15
    }
})
