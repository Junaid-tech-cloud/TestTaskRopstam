import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const CarList = (props) => {
  const navigation = useNavigation();
  const [cars, setCars] = useState([
    { id: 1, make: 'Toyota', model: 'Camry' },
    { id: 2, make: 'Honda', model: 'Civic' },
    { id: 3, make: 'Nissan', model: 'Altima' },
    { id: 4, make: 'Ford', model: 'Mustang' },
    { id: 5, make: 'Chevrolet', model: 'Corvette' },
    { id: 6, make: 'BMW', model: 'M3' },
    { id: 7, make: 'Mercedes-Benz', model: 'C-Class' },
    { id: 8, make: 'Audi', model: 'A4' },
    { id: 9, make: 'Lexus', model: 'IS' },
    { id: 10, make: 'Tesla', model: 'Model S' },
  ]);

  const handleAddCar = () => {
    navigation.navigate('CarForm', {cars});
  };

  const renderItem = ({ item }) => (
    <View style={styles.carContainer}>
      <Text style={styles.carText}>{item.make} - {item.model}</Text>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
        if(props.route.params && props.route.params.carData){
          // storing newData from props to state array
          setCars(prevState => [...prevState, props.route.params.carData ]);
        }
    }, [props.route.params]),
);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Registered Cars</Text>
        <Button
          onPress={handleAddCar}
          title= {'ADD Car'}
          buttonStyle={styles.addButton}
          titleStyle= {{fontSize: 15}}
        />
      </View>
      <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Total Registered Cars"
        onPress={() => navigation.navigate('Dashboard', {cars})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4285F4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: 'black',
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 40,

  },
  carContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 20,
  },
  carText: {
    fontSize: 18,
    color: '#333',
  },
});

export default CarList;
