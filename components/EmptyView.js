import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

const EmptyView = ({ loadingMore, text }) => {
  return (
    <View style={styles.emptyContainer}>
      {!loadingMore && (
        <Text style={styles.emptyText}>{text ? text : 'No data available'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
})
export default EmptyView;
