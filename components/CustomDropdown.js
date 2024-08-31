import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // for the dropdown arrow icon
import { Color, getFontFamily } from '../GlobalStyles';

export default function CustomDropdown() {
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [swapCurrency, setSwapCurrency] = useState(false);

  const currencyOptions = [
    { label: 'Bitcoin', value: 'BTC', tokenValue:'0.02', displayValue: '$100' },
    { label: 'ETH', value: 'ETH', tokenValue:'0.02', displayValue: '$24' },
    { label: 'USDT', value: 'USDT', tokenValue:'0.02', displayValue: '$37' },
    { label: 'BNB', value: 'BNB', tokenValue:'0.02', displayValue: '$37' },
    { label: 'AVAX', value: 'AVAX', tokenValue:'0.02', displayValue: '$37' },
    { label: 'FTM', value: 'FTM', tokenValue:'0.02', displayValue: '$37' },
    { label: 'XRP', value: 'XRP', tokenValue:'0.02', displayValue: '$37' },
    // Add more options as needed
  ];

  const handleSelect = (value) => {
    setSelectedCurrency(value);
    setIsDropdownOpen(false);
  };

  const PrintValue = () => {
    let option = currencyOptions.find(option => option.value === selectedCurrency);
    
    let value = swapCurrency ? (option?.tokenValue +" "+option?.value) : option?.displayValue

    return <>
        {value}
    </>
  }

  const PrintValue2 = () => {
    let option = currencyOptions.find(option => option.value === selectedCurrency);
    
    let value = swapCurrency ? option?.displayValue : (option?.tokenValue +" "+option?.value)

    return <>
        {value}
    </>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select cryptocurrency</Text>
      
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      > 
        <View style={{flex:1, flexDirection:'row', gap:10}}>
        <Image
            style={styles.tokenImg}
            contentFit="cover"
            source={require("../assets/ic_circle_white.png")}
        />
        <Text style={styles.selectedText}>
          {currencyOptions.find(option => option.value === selectedCurrency)?.label || 'Select'}
        </Text>
        </View>
        <Ionicons name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} size={20} color="white" />
      </TouchableOpacity>

      {isDropdownOpen && (
        <View style={styles.dropdownOptions}>
          <FlatList
            data={currencyOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                    styles.option,
                    { backgroundColor: index % 2 === 0 ? Color.colorDarkslategray_100 : Color.colorDarkslategray_400 }
                ]}
                onPress={() => handleSelect(item.value)}
              >
                <View style={{flex:1, flexDirection:"column"}}>
                    <Text style={styles.optionText}>{item.label}</Text>
                    <Text style={styles.optionText}>{item.tokenValue} {item.label}</Text>
                </View>
                <View style={{alignSelf:'center'}}>
                    <Text style={styles.optionValue}>{item.displayValue}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <View>
        <View style={styles.currencyDisplay}>        
            <Text style={styles.currencyValue}>
                <PrintValue/>
            </Text>
        </View>
        <Text style={{textAlign:'center', color:'#fff', marginTop:5}}>
            <PrintValue2/>
        </Text>
        <TouchableOpacity 
            style={{
                    right:0,
                    position:'absolute',
                    bottom: 10,
                    marginRight:-40
                }}
            onPress={() => {
            setSwapCurrency(!swapCurrency);
        }}>
            <Image                
                contentFit="cover"
                source={require("../assets/swap.png")}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  tokenImg: {
    borderRadius: 50,
    width: 20,
    height: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
    textAlign:"center"
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.colorDarkslategray_400,
    padding: 12,
    borderRadius: 8,
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dropdownOptions: {
    marginTop: 8,
    borderRadius: 8,
    maxHeight: 150,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  optionValue: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  currencyDisplay: {
    marginTop: 20,
    padding: 12,
    backgroundColor: Color.colorDimgray_100,
    borderRadius: 8,
  },
  currencyValue: {
    fontWeight:"600",
    fontFamily: getFontFamily("600"),
    color: '#FFFFFF',
    fontSize: 28,
    textAlign: "center"
  },
});
