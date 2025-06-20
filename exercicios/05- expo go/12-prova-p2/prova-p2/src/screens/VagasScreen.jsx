import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Modal, Portal, Text } from 'react-native-paper';
import useVagas from '../hooks/useVagas';

export default function VagasScreen() {
  const { vagas, addVaga, updateVaga, deleteVaga } = useVagas();
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentVaga, setCurrentVaga] = useState({
    titulo: '',
    departamento: '',
    salario: '',
    descricao: '',
    requisitos: ''
  });

  const handleInputChange = (field, value) => {
    setCurrentVaga({ ...currentVaga, [field]: value });
  };

  const handleSubmit = () => {
    if (editing) {
      updateVaga(currentVaga.id, currentVaga);
    } else {
      addVaga(currentVaga);
    }
    setVisible(false);
    resetForm();
  };

  const handleEdit = (vaga) => {
    setCurrentVaga(vaga);
    setEditing(true);
    setVisible(true);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta vaga?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteVaga(id) }
      ]
    );
  };

  const resetForm = () => {
    setCurrentVaga({
      titulo: '',
      departamento: '',
      salario: '',
      descricao: '',
      requisitos: ''
    });
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => setVisible(true)} style={styles.addButton}>
        Adicionar Vaga
      </Button>

      <FlatList
        data={vagas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.titulo}</Title>
              <Paragraph>Departamento: {item.departamento}</Paragraph>
              <Paragraph>Salário: {item.salario}</Paragraph>
              <Paragraph>Descrição: {item.descricao}</Paragraph>
              <Paragraph>Requisitos: {item.requisitos}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleEdit(item)}>Editar</Button>
              <Button onPress={() => handleDelete(item.id)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Portal>
        <Modal visible={visible} onDismiss={() => { setVisible(false); resetForm(); }}>
          <Card style={styles.modal}>
            <Card.Title title={editing ? 'Editar Vaga' : 'Nova Vaga'} />
            <Card.Content>
              <TextInput
                label="Título"
                value={currentVaga.titulo}
                onChangeText={(text) => handleInputChange('titulo', text)}
                style={styles.input}
              />
              <TextInput
                label="Departamento"
                value={currentVaga.departamento}
                onChangeText={(text) => handleInputChange('departamento', text)}
                style={styles.input}
              />
              <TextInput
                label="Salário"
                value={currentVaga.salario}
                onChangeText={(text) => handleInputChange('salario', text)}
                style={styles.input}
              />
              <TextInput
                label="Descrição"
                value={currentVaga.descricao}
                onChangeText={(text) => handleInputChange('descricao', text)}
                multiline
                style={styles.input}
              />
              <TextInput
                label="Requisitos"
                value={currentVaga.requisitos}
                onChangeText={(text) => handleInputChange('requisitos', text)}
                multiline
                style={styles.input}
              />
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => { setVisible(false); resetForm(); }}>Cancelar</Button>
              <Button onPress={handleSubmit}>Salvar</Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { margin: 10 },
  addButton: { margin: 10 },
  modal: { margin: 20, padding: 10 },
  input: { marginBottom: 10 }
});