import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { stylesAboutUs } from "../components/StylesSheets"
import { AntDesign } from "@expo/vector-icons";
import myLogoPic from "../assets/default.png";



const AboutUsScreen = () => {

    const navigation = useNavigation();
    const backButton = () => {
        try {
            navigation.replace("Home");
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <ImageBackground source={myLogoPic} style={stylesAboutUs.backgroundImage}>
            <ScrollView>
                <TouchableOpacity onPress={backButton} style={stylesAboutUs.backButton}>
                    <AntDesign name="back" size={30} color="black" />
                </TouchableOpacity>
                <View style={stylesAboutUs.container}>

                    <Text style={stylesAboutUs.topTextEdit}>About Us</Text>
                    <Text style={stylesAboutUs.defualtTextEdit}>
                        Welcome to 2Better, the ultimate destination for sports enthusiasts to connect, compete, and thrive together.

                        At 2Better, we believe in the power of sports to bring people together, forge lasting friendships, and promote a healthy lifestyle. Whether you're a seasoned athlete or just starting your fitness journey, our platform is designed to cater to all levels and interests.

                        Our mission is to create a vibrant community where individuals from diverse backgrounds unite through their shared passion for sports. Whether you're into basketball, baseball, soccer, swimming, or any other sport imaginable, you'll find like-minded individuals and exciting opportunities to engage in your
                        favorite activities.                                      Here's what sets us apart:
                    </Text>
                </View>
                <View style={stylesAboutUs.container1}>
                    <Text style={stylesAboutUs.defualtTopTextEdit}>Diverse Community</Text>
                    <Text style={stylesAboutUs.defualtTextEdit1}>
                        Our community is comprised of individuals from all walks of life, united by their love for sports.
                        Whether you're a professional athlete, amateur enthusiast, or someone simply looking to stay active, you'll find your place here.
                    </Text>
                </View>
                <View style={stylesAboutUs.container2}>
                    <Text style={stylesAboutUs.defualtTopTextEdit}>Seamless Connections</Text>
                    <Text style={stylesAboutUs.defualtTextEdit2}>
                        With our intuitive matching system,
                        finding sports partners, teammates, or opponents has never been easier. Simply search, match, and start connecting with fellow sports enthusiasts in your area.
                    </Text>
                </View>
                <View style={stylesAboutUs.container3}>
                    <Text style={stylesAboutUs.defualtTopTextEdit3}>Safe and Inclusive Environment</Text>
                    <Text style={stylesAboutUs.defualtTextEdit3}>

                        We prioritize creating a safe and inclusive environment where everyone feels welcome and respected. Discrimination, harassment, and unsportsmanlike behavior are not tolerated, and we're committed to fostering a positive and supportive community for
                        all.Join us today and become a part of the 2Better family. Let's celebrate the joy of sports and embark on this exciting journey together!
                    </Text>
                </View>
                <View style={stylesAboutUs.containerEnd}>
                    <Text style={stylesAboutUs.endTextEdit}>
                    Let's celebrate the joy of sports                                           and embark on this exciting journey together!   
                    </Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default AboutUsScreen;
