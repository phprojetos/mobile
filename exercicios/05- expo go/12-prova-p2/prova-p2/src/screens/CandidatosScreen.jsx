import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Modal, Portal, Text } from 'react-native-paper';
import useCandidatos from '../hooks/useCandidatos';

export default function CandidatosScreen() {
  const { candidatos, addCandidato, updateCandidato, deleteCandidato } = useCandidatos();
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentCandidato, setCurrentCandidato] = useState({
    nome: '',
    email: '',
    telefone: '',
    vagaDesejada: '',
    experiencia: ''
  });

  const handleInputChange = (field, value) => {
    setCurrentCandidato({ ...currentCandidato, [field]: value });
  };

  const handleSubmit = () => {
    if (!currentCandidato.nome || !currentCandidato.email) {
      Alert.alert('Erro', 'Nome e e-mail são campos obrigatórios');
      return;
    }

    if (editing) {
      updateCandidato(currentCandidato.id, currentCandidato);
    } else {
      addCandidato(currentCandidato);
    }
    setVisible(false);
    resetForm();
  };

  const handleEdit = (candidato) => {
    setCurrentCandidato(candidato);
    setEditing(true);
    setVisible(true);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este candidato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteCandidato(id) }
      ]
    );
  };

  const resetForm = () => {
    setCurrentCandidato({
      nome: '',
      email: '',
      telefone: '',
      vagaDesejada: '',
      experiencia: ''
    });
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => setVisible(true)} style={styles.addButton}>
        Adicionar Candidato
      </Button>

      <FlatList
        data={candidatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.nome}</Title>
              <Paragraph>E-mail: {item.email}</Paragraph>
              <Paragraph>Telefone: {item.telefone}</Paragraph>
              <Paragraph>Vaga desejada: {item.vagaDesejada}</Paragraph>
              <Paragraph>Experiência: {item.experiencia}</Paragraph>
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
            <Card.Title title={editing ? 'Editar Candidato' : 'Novo Candidato'} />
            <Card.Content>
              <TextInput
                label="Nome *"
                value={currentCandidato.nome}
                onChangeText={(text) => handleInputChange('nome', text)}
                style={styles.input}
              />
              <TextInput
                label="E-mail *"
                value={currentCandidato.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                style={styles.input}
              />
              <TextInput
                label="Telefone"
                value={currentCandidato.telefone}
                onChangeText={(text) => handleInputChange('telefone', text)}
                keyboardType="phone-pad"
                style={styles.input}
              />
              <TextInput
                label="Vaga desejada"
                value={currentCandidato.vagaDesejada}
                onChangeText={(text) => handleInputChange('vagaDesejada', text)}
                style={styles.input}
              />
              <TextInput
                label="Experiência"
                value={currentCandidato.experiencia}
                onChangeText={(text) => handleInputChange('experiencia', text)}
                multiline
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