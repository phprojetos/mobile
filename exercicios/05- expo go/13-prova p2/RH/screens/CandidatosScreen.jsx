import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CandidatosScreen = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [vagas, setVagas] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [vagaSelecionada, setVagaSelecionada] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const storedVagas = await AsyncStorage.getItem('vagas');
    const storedCandidatos = await AsyncStorage.getItem('candidatos');
    
    if (storedVagas) setVagas(JSON.parse(storedVagas));
    if (storedCandidatos) setCandidatos(JSON.parse(storedCandidatos));
  };

  const saveCandidatos = async (newCandidatos) => {
    await AsyncStorage.setItem('candidatos', JSON.stringify(newCandidatos));
    setCandidatos(newCandidatos);
  };

  // Validação dos campos
  const validateFields = () => {
    const newErrors = {};
    
    if (!nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) newErrors.nome = 'Apenas letras são permitidas';
    
    if (!email.trim()) newErrors.email = 'Email é obrigatório';
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Email inválido';
    
    if (!telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!/^\d+$/.test(telefone)) newErrors.telefone = 'Apenas números são permitidos';
    if (telefone.length < 10) newErrors.telefone = 'Telefone deve ter pelo menos 10 dígitos';
    
    if (!experiencia.trim()) newErrors.experiencia = 'Experiência é obrigatória';
    if (!vagaSelecionada) newErrors.vaga = 'Selecione uma vaga';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNomeChange = (text) => {
    setNome(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''));
  };

  // Máscara para telefone (permite apenas números)
  const handleTelefoneChange = (text) => {
    setTelefone(text.replace(/[^\d]/g, ''));
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    const novoCandidato = {
      id: editingId || Date.now().toString(),
      nome,
      email,
      telefone,
      experiencia,
      vagaId: vagaSelecionada,
      vagaTitulo: vagas.find(v => v.id === vagaSelecionada)?.titulo || ''
    };

    const updatedCandidatos = editingId
      ? candidatos.map(c => c.id === editingId ? novoCandidato : c)
      : [...candidatos, novoCandidato];

    saveCandidatos(updatedCandidatos);
    resetForm();
    Alert.alert('Sucesso', editingId ? 'Candidato atualizado!' : 'Candidato cadastrado!');
  };

  const handleEdit = (candidato) => {
    setNome(candidato.nome);
    setEmail(candidato.email);
    setTelefone(candidato.telefone);
    setExperiencia(candidato.experiencia);
    setVagaSelecionada(candidato.vagaId);
    setEditingId(candidato.id);
    setErrors({});
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja excluir este candidato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => {
          const filteredCandidatos = candidatos.filter(c => c.id !== id);
          saveCandidatos(filteredCandidatos);
          Alert.alert('Sucesso', 'Candidato excluído!');
        }}
      ]
    );
  };

  const resetForm = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setExperiencia('');
    setVagaSelecionada('');
    setEditingId(null);
    setErrors({});
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <TextInput
        placeholder="Nome completo*"
        value={nome}
        onChangeText={handleNomeChange}
        style={[styles.input, errors.nome && styles.inputError]}
      />
      {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

      <TextInput
        placeholder="Email*"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={[styles.input, errors.email && styles.inputError]}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="Telefone* (apenas números)"
        value={telefone}
        onChangeText={handleTelefoneChange}
        keyboardType="phone-pad"
        style={[styles.input, errors.telefone && styles.inputError]}
      />
      {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}

      <TextInput
        placeholder="Experiência profissional*"
        value={experiencia}
        onChangeText={setExperiencia}
        style={[styles.input, errors.experiencia && styles.inputError, { minHeight: 80 }]}
        multiline
      />
      {errors.experiencia && <Text style={styles.errorText}>{errors.experiencia}</Text>}
      
      <Picker
        selectedValue={vagaSelecionada}
        onValueChange={setVagaSelecionada}
        style={[styles.picker, errors.vaga && styles.inputError]}
      >
        <Picker.Item label="Selecione uma vaga*" value="" />
        {vagas.map(vaga => (
          <Picker.Item key={vaga.id} label={vaga.titulo} value={vaga.id} />
        ))}
      </Picker>
      {errors.vaga && <Text style={styles.errorText}>{errors.vaga}</Text>}
      
      <Button 
        title={editingId ? "Atualizar Candidato" : "Cadastrar Candidato"} 
        onPress={handleSubmit} 
      />
      
      <View style={{ marginTop: 20 }}>
        {candidatos.map(candidato => (
          <View key={candidato.id} style={styles.candidatoItem}>
            <Text style={{ fontWeight: 'bold' }}>{candidato.nome}</Text>
            <Text>Email: {candidato.email}</Text>
            <Text>Telefone: {candidato.telefone}</Text>
            <Text>Experiência: {candidato.experiencia}</Text>
            <Text>Vaga: {candidato.vagaTitulo}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Editar" onPress={() => handleEdit(candidato)} color="#1bcbff" />
              <Button title="Excluir" onPress={() => handleDelete(candidato.id)} color="#ec2300" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = {
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 8,
    borderRadius: 4
  },
  inputError: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -5
  },
  picker: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 4
  },
  candidatoItem: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around'
  }
};

export default CandidatosScreen;