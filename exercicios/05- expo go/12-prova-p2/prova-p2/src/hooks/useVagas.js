import { useState, useEffect } from 'react';
import { getData, storeData } from '../services/storageService';

const useVagas = () => {
  const [vagas, setVagas] = useState([]);
  const STORAGE_KEY = '@vagas';

  const loadVagas = async () => {
    const storedVagas = await getData(STORAGE_KEY);
    if (storedVagas) setVagas(storedVagas);
  };

  useEffect(() => {
    loadVagas();
  }, []);

  const addVaga = async (vaga) => {
    const newVagas = [...vagas, { ...vaga, id: Date.now().toString() }];
    await storeData(STORAGE_KEY, newVagas);
    setVagas(newVagas);
  };

  const updateVaga = async (id, updatedVaga) => {
    const newVagas = vagas.map(v => v.id === id ? { ...updatedVaga, id } : v);
    await storeData(STORAGE_KEY, newVagas);
    setVagas(newVagas);
  };

  const deleteVaga = async (id) => {
    const newVagas = vagas.filter(v => v.id !== id);
    await storeData(STORAGE_KEY, newVagas);
    setVagas(newVagas);
  };

  return { vagas, addVaga, updateVaga, deleteVaga };
};

export default useVagas;