import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VagasScreen = () => {
  const [vagas, setVagas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [salario, setSalario] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadVagas();
  }, []);

  const loadVagas = async () => {
    const storedVagas = await AsyncStorage.getItem('vagas');
    if (storedVagas) setVagas(JSON.parse(storedVagas));
  };

  const saveVagas = async (newVagas) => {
    await AsyncStorage.setItem('vagas', JSON.stringify(newVagas));
    setVagas(newVagas);
  };

  const validateFields = () => {
    const newErrors = {};
    
    if (!titulo.trim()) newErrors.titulo = 'Título é obrigatório';
    if (!empresa.trim()) newErrors.empresa = 'Empresa é obrigatória';
    if (!salario.trim()) newErrors.salario = 'Salário é obrigatório';
    if (!/^\d+$/.test(salario)) newErrors.salario = 'Apenas números são permitidos';
    if (!local.trim()) newErrors.local = 'Local é obrigatório';
    if (!descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSalarioChange = (text) => {
    setSalario(text.replace(/[^\d]/g, ''));
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    const novaVaga = {
      id: editingId || Date.now().toString(),
      titulo,
      empresa,
      salario,
      local,
      descricao
    };

    const updatedVagas = editingId
      ? vagas.map(v => v.id === editingId ? novaVaga : v)
      : [...vagas, novaVaga];

    saveVagas(updatedVagas);
    resetForm();
    Alert.alert('Sucesso', editingId ? 'Vaga atualizada!' : 'Vaga cadastrada!');
  };

  const handleEdit = (vaga) => {
    setTitulo(vaga.titulo);
    setEmpresa(vaga.empresa);
    setSalario(vaga.salario);
    setLocal(vaga.local);
    setDescricao(vaga.descricao);
    setEditingId(vaga.id);
    setErrors({});
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja excluir esta vaga?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => {
          const filteredVagas = vagas.filter(v => v.id !== id);
          saveVagas(filteredVagas);
          Alert.alert('Sucesso', 'Vaga excluída!');
        }}
      ]
    );
  };

  const resetForm = () => {
    setTitulo('');
    setEmpresa('');
    setSalario('');
    setLocal('');
    setDescricao('');
    setEditingId(null);
    setErrors({});
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <TextInput
        placeholder="Título da vaga*"
        value={titulo}
        onChangeText={setTitulo}
        style={[styles.input, errors.titulo && styles.inputError]}
      />
      {errors.titulo && <Text style={styles.errorText}>{errors.titulo}</Text>}

      <TextInput
        placeholder="Empresa*"
        value={empresa}
        onChangeText={setEmpresa}
        style={[styles.input, errors.empresa && styles.inputError]}
      />
      {errors.empresa && <Text style={styles.errorText}>{errors.empresa}</Text>}

      <TextInput
        placeholder="Salário* (apenas números)"
        value={salario}
        onChangeText={handleSalarioChange}
        keyboardType="numeric"
        style={[styles.input, errors.salario && styles.inputError]}
      />
      {errors.salario && <Text style={styles.errorText}>{errors.salario}</Text>}

      <TextInput
        placeholder="Local*"
        value={local}
        onChangeText={setLocal}
        style={[styles.input, errors.local && styles.inputError]}
      />
      {errors.local && <Text style={styles.errorText}>{errors.local}</Text>}

      <TextInput
        placeholder="Descrição*"
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, errors.descricao && styles.inputError, { minHeight: 80 }]}
        multiline
      />
      {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}
      
      <Button 
        title={editingId ? "Atualizar Vaga" : "Cadastrar Vaga"} 
        onPress={handleSubmit} 
      />
      
      <View style={{ marginTop: 20 }}>
        {vagas.map(vaga => (
          <View key={vaga.id} style={styles.vagaItem}>
            <Text style={{ fontWeight: 'bold' }}>{vaga.titulo}</Text>
            <Text>Empresa: {vaga.empresa}</Text>
            <Text>Salário: R$ {vaga.salario}</Text>
            <Text>Local: {vaga.local}</Text>
            <Text>Descrição: {vaga.descricao}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Editar" onPress={() => handleEdit(vaga)} color="#1bcbff"/>
              <Button title="Excluir" onPress={() => handleDelete(vaga.id)} color="#ec2300" />
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
  vagaItem: {
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

export default VagasScreen;