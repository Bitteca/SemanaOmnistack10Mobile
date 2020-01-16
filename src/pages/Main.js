import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

const Main = () => {
  const [currentRegion, setCurrentRegion] = useState(null);

  //Carrega mapa na tela na regiao
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAsccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        });
      }
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return <MapView initialRegion={currentRegion} style={styles.map} />;
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Main;
