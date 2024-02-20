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
                <View style={stylesSupport.container}>
                    <Text style={stylesSupport.sectionTitle}>Customer Support</Text>

                    <Text style={stylesSupport.subTitle}>Contact Information:</Text>
                    <Text style={stylesSupport.contactItem}>Email: Ashwal200@gmail.com</Text>
                    <Text style={stylesSupport.contactItem}>Phone: +972 53 281 7248</Text>
                    <Text style={stylesSupport.contactItem}>Email: Maor199724@gmail.com</Text>
                    <Text style={stylesSupport.contactItem}>Phone: +972 50 535 4288</Text>
                    <Text style={stylesSupport.contactItem}>Email: AviyaArusi@gmail.com</Text>
                    <Text style={stylesSupport.contactItem}>Phone: +972 54 739 5526</Text>
                    <Text style={stylesSupport.contactItem}>Email: Aviv@gmail.com</Text>
                    <Text style={stylesSupport.contactItem}>Phone: +972 52 588 8675</Text>
                    <Text style={stylesSupport.contactItem}>Email: Matan@gmail.com</Text>
                    <Text style={stylesSupport.contactItem}>Phone: +972 52 660 6438</Text>

                    <Text style={stylesSupport.subTitle}>Frequently Asked Questions</Text>
                    <Text style={stylesSupport.contactItem}>Feel free to ask here:</Text>
                    <Text style={stylesSupport.editURL} onPress={handleFQAPress}>supportFQA</Text>

                    <Text style={stylesSupport.subTitle}>Feedback Form:</Text>
                    <Text style={stylesSupport.contactItem}>We would love to get a feedback:</Text>
                    <Text style={stylesSupport.editURL} onPress={handleFeedbackPress}>FeedbackForm</Text>

                </View>
                <View>
                    <Text style={stylesSupport.subTitleEnd} onPress={handleCommunityPress}>Community Forums:</Text>
                    <Text style={stylesSupport.contactItemEnd}>Join our community forums to interact                       with other users, ask questions, and share                    tips and advice related to sports activities.</Text>

                    <Text style={stylesSupport.editURLEnd} onPress={handleFeedbackPress}>OurCommunity</Text>
                    <Text style={stylesSupport.subEnd}>Support Hours:</Text>
                    {/* <Text></Text> */}
                    <Text style={stylesSupport.textEnd}>Sonday to Thursday: 9:00 AM - 5:00 PM</Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default CostumerSupportScreen;
