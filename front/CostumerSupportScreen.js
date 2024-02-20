import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Linking,
} from "react-native";
import { stylesSupport } from "../components/StylesSheets"
import { AntDesign } from "@expo/vector-icons";
import myLogoPic from "../assets/default.png";



const CostumerSupportScreen = () => {


    const navigation = useNavigation();
    const backButton = () => {
        try {
            navigation.replace("Home");
        } catch (error) {
            alert(error.message);
        }
    };
    const handleFQAPress = () => {
        Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSe6p-m67lHhtZOpM5n8Wsjxqhlt8bBRnL59Krf4ngeutIZLQQ/viewform?usp=sf_link');
    };

    const handleFeedbackPress = () => {
        Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSe2vRvSn6Qitkmu348Xaj2ogZfvMhdogOBePlOmjx81hID5jw/viewform?usp=sf_link');
    };

    const handleCommunityPress = () => {
        // Navigate to the community forums screen
    };
    return (
        <ImageBackground source={myLogoPic} style={stylesSupport.backgroundImage}>
            <ScrollView>
                <TouchableOpacity onPress={backButton} style={stylesSupport.backButton}>
                    <AntDesign name="back" size={30} color="black" />
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>Customer Support</Text>

                    <Text style={styles.subTitle}>Contact Information:</Text>
                    <Text style={styles.contactItem}>Email: Ashwal200@gmail.com</Text>
                    <Text style={styles.contactItem}>Phone: +972 53 281 7248</Text>
                    <Text style={styles.contactItem}>Email: Maor199724@gmail.com</Text>
                    <Text style={styles.contactItem}>Phone: +972 50 535 4288</Text>
                    <Text style={styles.contactItem}>Email: AviyaArusi@gmail.com</Text>
                    <Text style={styles.contactItem}>Phone: +972 54 739 5526</Text>
                    <Text style={styles.contactItem}>Email: Aviv@gmail.com</Text>
                    <Text style={styles.contactItem}>Phone: +972 52 588 8675</Text>
                    <Text style={styles.contactItem}>Email: Matan@gmail.com</Text>
                    <Text style={styles.contactItem}>Phone: +972 52 660 6438</Text>

                    <Text style={styles.subTitle}>Frequently Asked Questions</Text>
                    <Text style={styles.contactItem}>Feel free to ask here:</Text>
                    <Text style={styles.editURL} onPress={handleFQAPress}>supportFQA</Text>

                    <Text style={styles.subTitle}>Feedback Form:</Text>
                    <Text style={styles.contactItem}>We would love to get a feedback:</Text>
                    <Text style={styles.editURL} onPress={handleFeedbackPress}>FeedbackForm</Text>

                </View>
                <View>
                    <Text style={styles.subTitleEnd} onPress={handleCommunityPress}>Community Forums:</Text>
                    <Text style={styles.contactItemEnd}>Join our community forums to interact                       with other users, ask questions, and share                    tips and advice related to sports activities.</Text>

                    <Text style={styles.editURLEnd} onPress={handleFeedbackPress}>OurCommunity</Text>
                    <Text style={styles.subEnd}>Support Hours:</Text>
                    {/* <Text></Text> */}
                    <Text style={styles.textEnd}>Sonday to Thursday: 9:00 AM - 5:00 PM</Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default CostumerSupportScreen;
const styles = StyleSheet.create({
    container: {
        top: 80,
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 24,
        left: 100,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 16,
        left: 40,
        bottom: 10,
    },
    subTitleEnd: {
        top: 60,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 16,
        left: 50,
        bottom: 100,

    },
    contactItemEnd: {
        left: 75,
        top: 70,
        fontSize: 16,
        marginBottom: 8,
        color: '#404040',
        marginBottom: 80,
    },
    contactItem: {
        left: 60,
        fontSize: 16,
        marginBottom: 8,
        color: '#404040',
    },
    textEnd:{
        left: 75,
        fontSize: 16,
        marginBottom: 15,
        color: '#404040',
    },
    editURL: {
        left: 60,
        fontSize: 16,
        marginBottom: 8,
        color: '#0F376D',
    },
    editURLEnd: {
        left: 75,
        fontSize: 16,
        marginBottom: 8,
        color: '#0F376D',
    },
    subEnd:{
        fontSize: 20,
        fontWeight: 'bold',
        left: 50,
        marginBottom: 15,
    },
    link: {
        color: 'black',
    },
});
