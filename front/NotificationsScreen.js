import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { notificationService } from '../services/NotificationService';

// Screen to display user notifications
const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState([]);

    // Fetch user notifications when the component is mounted
    useEffect(() => {
        const fetchNotifications = async () => {
            const userNotifications = await notificationService.getUserNotifications(userId);
            setNotifications(userNotifications);
        };

        fetchNotifications();
    }, []);

    // Render each notification as a list item
    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.message}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderNotificationItem}
            />
        </View>
    );
};

// Styles for the NotificationsScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notificationItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationText: {
        fontSize: 16,
    },
});

export default NotificationsScreen;
