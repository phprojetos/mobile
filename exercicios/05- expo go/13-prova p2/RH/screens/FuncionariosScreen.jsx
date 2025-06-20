import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FuncionariosScreen = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState('');
  const [funcao, setFuncao] = useState('');
  const [salario, setSalario] = useState('');
  const [dataContratacao, setDataContratacao] = useState('');
  const [beneficios, setBeneficios] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const storedFuncionarios = await AsyncStorage.getItem('funcionarios');
    const storedCandidatos = await AsyncStorage.getItem('candidatos');
    
    if (storedFuncionarios) setFuncionarios(JSON.parse(storedFuncionarios));
    if (storedCandidatos) setCandidatos(JSON.parse(storedCandidatos));
  };

  const saveFuncionarios = async (newFuncionarios) => {
    await AsyncStorage.setItem('funcionarios', JSON.stringify(newFuncionarios));
    setFuncionarios(newFuncionarios);
  };

  // Máscara para data (DD/MM/AAAA)
  const handleDataChange = (text) => {
    let formattedText = text.replace(/[^\d]/g, '');
    
    if (formattedText.length > 2) {
      formattedText = formattedText.substring(0, 2) + '/' + formattedText.substring(2);
    }
    if (formattedText.length > 5) {
      formattedText = formattedText.substring(0, 5) + '/' + formattedText.substring(5, 9);
    }
    
    setDataContratacao(formattedText.substring(0, 10));
  };

  // Máscara para salário (apenas números)
  const handleSalarioChange = (text) => {
    setSalario(text.replace(/[^\d]/g, ''));
  };

  const validateFields = () => {
    const newErrors = {};
    
    if (!candidatoSelecionado) newErrors.candidato = 'Selecione um candidato';
    if (!funcao.trim()) newErrors.funcao = 'Função é obrigatória';
    if (!salario.trim()) newErrors.salario = 'Salário é obrigatório';
    if (!/^\d+$/.test(salario)) newErrors.salario = 'Apenas números são permitidos';
    if (!dataContratacao.trim()) newErrors.dataContratacao = 'Data é obrigatória';
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataContratacao)) {
      newErrors.dataContratacao = 'Use o formato DD/MM/AAAA';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    const candidato = candidatos.find(c => c.id === candidatoSelecionado);
    
    const novoFuncionario = {
      id: editingId || Date.now().toString(),
      candidatoId: candidatoSelecionado,
      nome: candidato.nome,
      email: candidato.email,
      telefone: candidato.telefone,
      funcao,
      salario,
      dataContratacao,
      beneficios,
      experiencia: candidato.experiencia
    };

    const updatedFuncionarios = editingId
      ? funcionarios.map(f => f.id === editingId ? novoFuncionario : f)
      : [...funcionarios, novoFuncionario];

    saveFuncionarios(updatedFuncionarios);
    resetForm();
    Alert.alert('Sucesso', editingId ? 'Funcionário atualizado!' : 'Funcionário contratado!');
  };

  const handleEdit = (funcionario) => {
    setCandidatoSelecionado(funcionario.candidatoId);
    setFuncao(funcionario.funcao);
    setSalario(funcionario.salario);
    setDataContratacao(funcionario.dataContratacao);
    setBeneficios(funcionario.beneficios);
    setEditingId(funcionario.id);
    setErrors({});
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja excluir este funcionário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => {
          const filteredFuncionarios = funcionarios.filter(f => f.id !== id);
          saveFuncionarios(filteredFuncionarios);
          Alert.alert('Sucesso', 'Funcionário removido!');
        }}
      ]
    );
  };

  const resetForm = () => {
    setCandidatoSelecionado('');
    setFuncao('');
    setSalario('');
    setDataContratacao('');
    setBeneficios('');
    setEditingId(null);
    setErrors({});
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Picker
        selectedValue={candidatoSelecionado}
        onValueChange={setCandidatoSelecionado}
        style={[styles.picker, errors.candidato && styles.inputError]}
      >
        <Picker.Item label="Selecione um candidato*" value="" />
        {candidatos.map(candidato => (
          <Picker.Item 
            key={candidato.id} 
            label={`${candidato.nome} - ${candidato.vagaTitulo}`} 
            value={candidato.id} 
          />
        ))}
      </Picker>
      {errors.candidato && <Text style={styles.errorText}>{errors.candidato}</Text>}

      <TextInput
        placeholder="Função*"
        value={funcao}
        onChangeText={setFuncao}
        style={[styles.input, errors.funcao && styles.inputError]}
      />
      {errors.funcao && <Text style={styles.errorText}>{errors.funcao}</Text>}

      <TextInput
        placeholder="Salário* (apenas números)"
        value={salario}
        onChangeText={handleSalarioChange}
        keyboardType="numeric"
        style={[styles.input, errors.salario && styles.inputError]}
      />
      {errors.salario && <Text style={styles.errorText}>{errors.salario}</Text>}

      <TextInput
        placeholder="Data de contratação* (DD/MM/AAAA)"
        value={dataContratacao}
        onChangeText={handleDataChange}
        keyboardType="numeric"
        maxLength={10}
        style={[styles.input, errors.dataContratacao && styles.inputError]}
      />
      {errors.dataContratacao && <Text style={styles.errorText}>{errors.dataContratacao}</Text>}

      <TextInput
        placeholder="Benefícios"
        value={beneficios}
        onChangeText={setBeneficios}
        style={styles.input}
        multiline
      />
      
      <Button 
        title={editingId ? "Atualizar Funcionário" : "Contratar Funcionário"} 
        onPress={handleSubmit} 
      />
      
      <View style={{ marginTop: 20 }}>
        {funcionarios.map(funcionario => (
          <View key={funcionario.id} style={styles.funcionarioItem}>
            <Text style={{ fontWeight: 'bold' }}>{funcionario.nome}</Text>
            <Text>Função: {funcionario.funcao}</Text>
            <Text>Salário: R$ {funcionario.salario}</Text>
            <Text>Contratado em: {funcionario.dataContratacao}</Text>
            <Text>Benefícios: {funcionario.beneficios || 'Nenhum'}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Editar" onPress={() => handleEdit(funcionario)} color="#1bcbff"/>
              <Button title="Excluir" onPress={() => handleDelete(funcionario.id)} color="#ec2300" />
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
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  inputError: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -5,
    fontSize: 12
  },
  picker: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  funcionarioItem: {
    padding: 15,
    borderBottomWidth: 1,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: '#ddd'
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around'
  }
};

export default FuncionariosScreen;