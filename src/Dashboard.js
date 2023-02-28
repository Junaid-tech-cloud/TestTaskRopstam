// Dashboard.js

import React, { useState } from 'react';
import { View, StyleSheet, Text, useEffect } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = (props) => {
    const [carCount, setCarCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Dashboard</Text>
            <Text style={styles.carCount}>{`Number of Registered Cars: ${props.route.params.cars.length}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    carCount: {
        fontSize: 18,
    },
});

export default Dashboard;
