import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import MapView, { Region, Marker, Callout } from 'react-native-maps';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from 'expo-location';

import { NavigationStackProp } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../services/api';

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 3
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    elevation: 3
  }
});

export interface MainProps {
  navigation: NavigationStackProp;
}

const Main: FunctionComponent<MainProps> = ({ navigation }: MainProps) => {
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [devs, setDevs] = useState<any[]>([]);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function loadInitialLocation() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          latitudeDelta: 0.07,
          longitude,
          longitudeDelta: 0.07
        });
      }
    }

    loadInitialLocation();
  }, []);

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data);
  }

  function handleRegionChanged(region: Region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChanged}
      >
        {devs.map(dev => (
          <Marker
            // eslint-disable-next-line no-underscore-dangle
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0]
            }}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: dev.avatar_url
              }}
            />

            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  github_username: dev.github_username
                });
              }}
            >
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity style={styles.loadButton} onPress={() => loadDevs()}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Main;
