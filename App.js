import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Linking, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [dato, setDato] = useState('');

  const handleLinking = (dato) => {
      Linking.openURL(dato);
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      ` Código tipo: ${type} leido`,
      `¿Desea abrir: ${data}?`,
      [
        {text: 'Cancelar', onPress: () => setScanned(false), style: 'cancel'},
        {text: 'Abrir', onPress: () => handleLinking(data)},
      ]
    );
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // setDato(data);
    // console.log('dato',dato);
  
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  
});
