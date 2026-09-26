import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
} from 'react-native';

import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import EstudianteItem from '../components/EstudianteItem';

export default function HistorialScreen() {
  const [estudiantes, setEstudiantes] = useState<any[]>([]);
  const [seleccionado, setSeleccionado] = useState<any>(null);
  const [editando, setEditando] = useState<any>(null);
  const [nombreEdit, setNombreEdit] = useState('');
  const [edadEdit, setEdadEdit] = useState('');
  const [cursoEdit, setCursoEdit] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'estudiantes'),
      snapshot => {
        const datos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEstudiantes(datos);
      }
    );

    return unsubscribe;
  }, []);
  const eliminarEstudiante = (id: string) => {
    Alert.alert(
      'Eliminar estudiante',
      '¿Está seguro de eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteDoc(doc(db, 'estudiantes', id));
            Alert.alert('Éxito', 'Estudiante eliminado correctamente');
          },
        },
      ]
    );
  };
  const abrirEditar = (estudiante: any) => {
    setEditando(estudiante);
    setNombreEdit(estudiante.nombre);
    setEdadEdit(String(estudiante.edad));
    setCursoEdit(estudiante.curso);
  };

  const guardarEdicion = async () => {
    if (!nombreEdit.trim() || !edadEdit.trim() || !cursoEdit.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (Number(edadEdit) < 18) {
      Alert.alert('Error', 'No se permiten estudiantes menores de edad');
      return;
    }

    await updateDoc(doc(db, 'estudiantes', editando.id), {
      nombre: nombreEdit,
      edad: Number(edadEdit),
      curso: cursoEdit,
    });

    setEditando(null);
    Alert.alert('Éxito', 'Estudiante actualizado correctamente');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Historial</Text>

      <FlatList
        data={estudiantes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <EstudianteItem
            estudiante={item}
            onPress={() => setSeleccionado(item)}
            onEditar={() => abrirEditar(item)}
            onEliminar={() => eliminarEstudiante(item.id)}
          />
        )}
      />

      <Modal
        visible={seleccionado !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSeleccionado(null)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Estudiante</Text>

            <Text style={styles.info}>
              Nombre: {seleccionado?.nombre}
            </Text>

            <Text style={styles.info}>
              Edad: {seleccionado?.edad}
            </Text>

            <Text style={styles.info}>
              Curso: {seleccionado?.curso}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setSeleccionado(null)}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
  visible={editando !== null}
  transparent
  animationType="slide"
  onRequestClose={() => setEditando(null)}
>
  <View style={styles.overlay}>
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>Editar estudiante</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombreEdit}
        onChangeText={setNombreEdit}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edadEdit}
        onChangeText={setEdadEdit}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Curso"
        value={cursoEdit}
        onChangeText={setCursoEdit}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={guardarEdicion}
      >
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setEditando(null)}
      >
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 20,
  },
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 30,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 30,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 20,
  },
  info: {
    fontSize: 17,
    marginBottom: 12,
    color: '#374151',
  },
  button: {
    backgroundColor: '#1E3A5F',
    padding: 14,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
  borderWidth: 1,
  borderColor: '#D1D5DB',
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  fontSize: 16,
  backgroundColor: '#FFFFFF',
},

cancelButton: {
  padding: 14,
  marginTop: 8,
},

cancelText: {
  textAlign: 'center',
  color: '#6B7280',
  fontWeight: 'bold',
},
});