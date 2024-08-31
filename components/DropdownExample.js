import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function DropdownExample() {
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');

  const currencyOptions = [
    { label: 'Bitcoin', value: 'BTC', displayValue: '$100' },
    { label: 'ETH', value: 'ETH', displayValue: '$24' },
    { label: 'USDT', value: 'USDT', displayValue: '$37' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select cryptocurrency</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedCurrency(value)}
        items={currencyOptions}
        style={pickerSelectStyles}
        value={selectedCurrency}
        useNativeAndroidPickerStyle={false}
      />
      <View style={styles.currencyDisplay}>
        <Text style={styles.currencyValue}>{currencyOptions.find(option => option.value === selectedCurrency)?.displayValue || 'N/A'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  currencyDisplay: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
  },
  currencyValue: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: 8,
    color: '#FFFFFF',
    backgroundColor: '#2C2C2E',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: 8,
    color: '#FFFFFF',
    backgroundColor: '#2C2C2E',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
