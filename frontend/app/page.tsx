'use client';

import { useEffect, useState } from 'react';

type Medico = {
  id: number;
  nome: string;
  crm: string;
  especialidade: string;
};

export default function Home() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/medicos')
      .then(res => res.json())
      .then(data => {
        setMedicos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>MediAgenda</h1>
      <h2>Médicos</h2>

      {loading && <p>Carregando...</p>}

      {!loading && medicos.length === 0 && (
        <p>Nenhum médico cadastrado.</p>
      )}

      <ul>
        {medicos.map(medico => (
          <li key={medico.id}>
            <strong>{medico.nome}</strong> — {medico.especialidade}
          </li>
        ))}
      </ul>
    </main>
  );
}
