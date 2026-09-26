import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../services/firebase';

export default function ProfileScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    if (!auth.currentUser) return;

    const referencia = doc(db, 'usuarios', auth.currentUser.uid);
    const documento = await getDoc(referencia);

    if (documento.exists()) {
      setUsuario(documento.data());
    }
  };

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información personal</Text>

        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{usuario?.nombre || 'Cargando...'}</Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.value}>
          {usuario?.email || auth.currentUser?.email}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>

        <Text style={styles.label}>Rol</Text>
        <Text style={styles.value}>{usuario?.rol || 'Profesor'}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={cerrarSesion}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 25,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 17,
    color: '#111827',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#B91C1C',
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});