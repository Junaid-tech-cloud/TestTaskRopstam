import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Yup from 'yup';

const Cars = (props) => {
    const navigation = useNavigation()
    const [opendropdown, setopendropdown] = useState(false);

    const [categoryList, setCategoryList] = useState([
        { label: 'Sedan', value: 'sedan' },
        { label: 'SUV', value: 'suv' },
        { label: 'Hatchback', value: 'hatchback' }
    ]);
    const [categorySelected, setCategorySelected] = useState(null);
    const [color, setColor] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [registrationNo, setRegistrationNo] = useState('');

    const schema = Yup.object().shape({
        categorySelected: Yup.string().required('please Select a Category is required'),
        color: Yup.string().required('Please enter a  color'),
        make: Yup.string().required('Please enter a  make'),
        model: Yup.string().required('Please enter a  model'),
        registrationNo: Yup.number('Please enter a valid number').required('Please enter a  registration number').positive('please enter a positive number'),
    });

    const handleSave = async () => {
        try {
            // Validate form data
            await schema.validate({ categorySelected, color, make, model, registrationNo }, { abortEarly: false });

            // Simulate API call to save data
            const carData = { id: props.route.params.cars + 1, categorySelected, color, make, model, registrationNo };
            Alert.alert('', 'Car data saved successfully', [
                {
                    text: 'Car Listing',
                    onPress: () => navigation.navigate("CarList", { carData })
                },
            ]);

            // Clear form fields
            setCategorySelected('');
            setColor('');
            setMake('');
            setModel('');
            setRegistrationNo('');
        } catch (error) {
            // Display validation errors
            const errorMessage = error.inner.map(e => e.message).join('\n');
            alert(errorMessage);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Category</Text>
            <DropDownPicker
                // items={categoryList}
                items={categoryList}
                placeholder={ "Select a category"}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                itemStyle={styles.dropdownItem}
                dropDownStyle={styles.dropdownMenu}

                onChangeText= {(item) => {}}
                // mode={'SIMPLE'}
                // listMode="FLATLIST"
                open={opendropdown}
                setOpen={setopendropdown}
                value= {categorySelected}
                setValue= {setCategorySelected}

            />
            <Text style={styles.label}>Color</Text>
            <TextInput
                style={styles.input}
                value={color}
                onChangeText={setColor}
            />
            <Text style={styles.label}>Make</Text>
            <TextInput
                style={styles.input}
                value={make}
                onChangeText={setMake}
            />
            <Text style={styles.label}>Model</Text>
            <TextInput
                style={styles.input}
                value={model}
                onChangeText={setModel}
            />
            <Text style={styles.label}>Registration No</Text>
            <TextInput
                style={styles.input}
                value={registrationNo}
                onChangeText={setRegistrationNo}
            />
            <Button
                title="Save"
                onPress={handleSave}
            />
        </View>
    );
};
export default Cars
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    },
    dropdownContainer: {
        marginBottom: 100
    },
    dropdownItem: {
        height: 80,
        backgroundColor: 'yellow'
    }

})