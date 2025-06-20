import { useState, useEffect } from 'react';
import { getData, storeData } from '../services/storageService';

const useCandidatos = () => {
  const [candidatos, setCandidatos] = useState([]);
  const STORAGE_KEY = '@candidatos';

  const loadCandidatos = async () => {
    const storedCandidatos = await getData(STORAGE_KEY);
    if (storedCandidatos) setCandidatos(storedCandidatos);
  };

  useEffect(() => {
    loadCandidatos();
  }, []);

  const addCandidato = async (candidato) => {
    const newCandidatos = [...candidatos, { ...candidato, id: Date.now().toString() }];
    await storeData(STORAGE_KEY, newCandidatos);
    setCandidatos(newCandidatos);
  };

  const updateCandidato = async (id, updatedCandidato) => {
    const newCandidatos = candidatos.map(c => c.id === id ? { ...updatedCandidato, id } : c);
    await storeData(STORAGE_KEY, newCandidatos);
    setCandidatos(newCandidatos);
  };

  const deleteCandidato = async (id) => {
    const newCandidatos = candidatos.filter(c => c.id !== id);
    await storeData(STORAGE_KEY, newCandidatos);
    setCandidatos(newCandidatos);
  };

  return { candidatos, addCandidato, updateCandidato, deleteCandidato };
};

export default useCandidatos;