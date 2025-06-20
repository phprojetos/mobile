import { useState, useEffect } from 'react';
import { getData, storeData } from '../services/storageService';

const useFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const STORAGE_KEY = '@funcionarios';

  const loadFuncionarios = async () => {
    const storedFuncionarios = await getData(STORAGE_KEY);
    if (storedFuncionarios) setFuncionarios(storedFuncionarios);
  };

  useEffect(() => {
    loadFuncionarios();
  }, []);

  const addFuncionario = async (funcionario) => {
    const newFuncionarios = [...funcionarios, { ...funcionario, id: Date.now().toString() }];
    await storeData(STORAGE_KEY, newFuncionarios);
    setFuncionarios(newFuncionarios);
  };

  const updateFuncionario = async (id, updatedFuncionario) => {
    const newFuncionarios = funcionarios.map(f => f.id === id ? { ...updatedFuncionario, id } : f);
    await storeData(STORAGE_KEY, newFuncionarios);
    setFuncionarios(newFuncionarios);
  };

  const deleteFuncionario = async (id) => {
    const newFuncionarios = funcionarios.filter(f => f.id !== id);
    await storeData(STORAGE_KEY, newFuncionarios);
    setFuncionarios(newFuncionarios);
  };

  return { funcionarios, addFuncionario, updateFuncionario, deleteFuncionario };
};

export default useFuncionarios;