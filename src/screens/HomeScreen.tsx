import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function HomeScreen({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [curso, setCurso] = useState('');

  const guardar = async () => {
    if (!nombre.trim() || !edad.trim() || !curso.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const edadNumero = Number(edad);

    if (edadNumero < 18) {
      Alert.alert('Error', 'No se permiten estudiantes menores de edad');
      return;
    }

    const guardarEstudiante = async () => {
      try {
        await addDoc(collection(db, 'estudiantes'), {
          nombre: nombre.trim(),
          edad: edadNumero,
          curso: curso.trim(),
          fechaRegistro: new Date(),
        });

        Alert.alert('Éxito', 'Estudiante registrado correctamente');

        setNombre('');
        setEdad('');
        setCurso('');
      } catch (error) {
        Alert.alert('Error', 'No se pudo registrar el estudiante');
      }
    };

    if (curso.trim().toLowerCase() === 'angular') {
      Alert.alert(
        'Requisito del curso',
        'Para tomar el curso de Angular es necesario conocer desarrollo web. ¿Desea continuar?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Sí',
            onPress: guardarEstudiante,
          },
        ]
      );

      return;
    }

    await guardarEstudiante();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Inscripción de estudiantes</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del estudiante"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Edad"
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Curso</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Angular"
          value={curso}
          onChangeText={setCurso}
        />

        <TouchableOpacity style={styles.button} onPress={guardar}>
          <Text style={styles.buttonText}>Guardar estudiante</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('Historial')}
          >
          <Text style={styles.historyButtonText}>Ver historial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.historyButtonText}>Mi perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 7,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#1E3A5F',
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
  historyButton: {
  padding: 16,
  marginTop: 15,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#1E3A5F',
},
historyButtonText: {
  color: '#1E3A5F',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
},
});