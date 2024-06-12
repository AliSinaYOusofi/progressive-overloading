import React, { useEffect, useState } from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { StyleSheet, Switch, View, useColorScheme, Appearance } from 'react-native'
import { Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons'
import AboutPage from '../about/About'

export type theme = {

}

export default function ChangeTheme() {
    
    const [theme, setTheme] = useState<"light" | "dark" | null>(null)
    const colorScheme = useColorScheme()
    const iconColor = colorScheme === 'dark' ? 'white' : 'black'
    
    useEffect( () => {
        const changeTheme = () => {
            Appearance.setColorScheme(theme)
        }
        changeTheme()
    }, [theme])
    return (
        <>
            <View style={styles.container}>

                <View>
                    <ThemedText style={styles.title}> Theme </ThemedText>
                </View>
                <ThemedView style={styles.icon_and_text_container}>

                    <View style={styles.start_and_far_end}>
                        <View>
                            <View style={styles.icon_and_text}>
                                <FontAwesome6 name="circle-half-stroke" size={24} color={iconColor} />
                                <ThemedText> Automatic</ThemedText>
                            </View>
                        </View>
                        <View>
                            <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={"remindMe" ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                style={{marginTop: 3}}
                                value={theme === null}
                                onChange={() => setTheme(null)}
                            />
                        </View>
                    </View>

                    <View style={styles.start_and_far_end}>
                        <View>
                            <View style={styles.icon_and_text}>
                                <Entypo name="light-down" size={24} color={iconColor} />
                                <ThemedText> Light</ThemedText>
                            </View>
                            
                        </View>
                        <View>
                            <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={"remindMe" ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                value={theme === 'light'}
                                onChange={() => setTheme("light")}
                                style={{marginTop: 3}}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.start_and_far_end}>
                        <View>
                            <View style={styles.icon_and_text}>
                                <Ionicons name="moon-outline" size={24} color={iconColor} />
                                <ThemedText> Dark </ThemedText>
                            </View>
                            
                        </View>
                        <View>
                            <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={"remindMe" ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                value={theme === 'dark'}
                                onChange={() => setTheme("dark")}
                                style={{marginTop: 3}}
                            />
                        </View>
                    </View>
                </ThemedView>

                <ThemedText style={styles.automatic_description}>
                    Automatic is only supported on operating systems that allow you to control the system-wide color scheme.
                </ThemedText>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        marginTop: 80,
        marginHorizontal: "auto",
        
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

    automatic_description: {
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'justify',
        color: "gray",
        marginTop: 10
    }
})
