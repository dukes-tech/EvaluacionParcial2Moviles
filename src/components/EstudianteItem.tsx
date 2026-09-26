import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EstudianteItem({
  estudiante,
  onPress,
  onEditar,
  onEliminar,
}: any) {
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.info} onPress={onPress}>
        <Text style={styles.nombre}>{estudiante.nombre}</Text>
        <Text style={styles.curso}>{estudiante.curso}</Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEditar}>
          <Text style={styles.editar}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onEliminar}>
          <Text style={styles.eliminar}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  info: {
    marginBottom: 12,
  },
  nombre: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  curso: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 25,
  },
  editar: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  eliminar: {
    color: '#DC2626',
    fontWeight: 'bold',
  },
});