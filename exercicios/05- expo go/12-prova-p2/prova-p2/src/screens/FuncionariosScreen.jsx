import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Modal, Portal, Text } from 'react-native-paper';
import useFuncionarios from '../hooks/useFuncionarios';

export default function FuncionariosScreen() {
  const { funcionarios, addFuncionario, updateFuncionario, deleteFuncionario } = useFuncionarios();
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentFuncionario, setCurrentFuncionario] = useState({
    nome: '',
    cargo: '',
    departamento: '',
    salario: '',
    dataAdmissao: ''
  });

  const handleInputChange = (field, value) => {
    setCurrentFuncionario({ ...currentFuncionario, [field]: value });
  };

  const handleSubmit = () => {
    if (!currentFuncionario.nome || !currentFuncionario.cargo) {
      Alert.alert('Erro', 'Nome e cargo são campos obrigatórios');
      return;
    }

    if (editing) {
      updateFuncionario(currentFuncionario.id, currentFuncionario);
    } else {
      addFuncionario(currentFuncionario);
    }
    setVisible(false);
    resetForm();
  };

  const handleEdit = (funcionario) => {
    setCurrentFuncionario(funcionario);
    setEditing(true);
    setVisible(true);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este funcionário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteFuncionario(id) }
      ]
    );
  };

  const resetForm = () => {
    setCurrentFuncionario({
      nome: '',
      cargo: '',
      departamento: '',
      salario: '',
      dataAdmissao: ''
    });
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => setVisible(true)} style={styles.addButton}>
        Adicionar Funcionário
      </Button>

      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.nome}</Title>
              <Paragraph>Cargo: {item.cargo}</Paragraph>
              <Paragraph>Departamento: {item.departamento}</Paragraph>
              <Paragraph>Salário: {item.salario}</Paragraph>
              <Paragraph>Data de admissão: {item.dataAdmissao}</Paragraph>
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
            <Card.Title title={editing ? 'Editar Funcionário' : 'Novo Funcionário'} />
            <Card.Content>
              <TextInput
                label="Nome *"
                value={currentFuncionario.nome}
                onChangeText={(text) => handleInputChange('nome', text)}
                style={styles.input}
              />
              <TextInput
                label="Cargo *"
                value={currentFuncionario.cargo}
                onChangeText={(text) => handleInputChange('cargo', text)}
                style={styles.input}
              />
              <TextInput
                label="Departamento"
                value={currentFuncionario.departamento}
                onChangeText={(text) => handleInputChange('departamento', text)}
                style={styles.input}
              />
              <TextInput
                label="Salário"
                value={currentFuncionario.salario}
                onChangeText={(text) => handleInputChange('salario', text)}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                label="Data de admissão"
                value={currentFuncionario.dataAdmissao}
                onChangeText={(text) => handleInputChange('dataAdmissao', text)}
                placeholder="DD/MM/AAAA"
                style={styles.input}
              />
              <Text style={styles.obrigatorio}>* Campos obrigatórios</Text>
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
  input: { marginBottom: 10 },
  obrigatorio: { fontSize: 12, color: 'gray', marginTop: 5 }
});