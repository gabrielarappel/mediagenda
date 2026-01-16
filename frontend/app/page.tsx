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
  const [nome, setNome] = useState('');
  const [crm, setCrm] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false);

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

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const response = await fetch('http://localhost:3001/medicos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome,
      crm,
      especialidade,
    }),
  });

  const medicoCriado = await response.json();

  setMedicos(prev => [...prev, medicoCriado]);

  setNome('');
  setCrm('');
  setEspecialidade('');
}

  return (
    <main style={{ padding: 20 }}>
      <h1>MediAgenda</h1>

    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      <input
        placeholder="CRM"
        value={crm}
        onChange={e => setCrm(e.target.value)}
      />

      <input
        placeholder="Especialidade"
        value={especialidade}
        onChange={e => setEspecialidade(e.target.value)}
      />

      <button type="submit">Cadastrar médico</button>
    </form>

    <button onClick={() => setMostrarAgendamento(true)}>
      Novo Agendamento
    </button>

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
      {mostrarAgendamento && (
        <form style={{ marginTop: 20 }}>
          <h3>Novo Agendamento</h3>

          <input placeholder="Paciente" />

          <select>
            <option value="">Selecione um médico</option>
            {medicos.map(medico => (
              <option key={medico.id} value={medico.id}>
                {medico.nome} — {medico.especialidade}
              </option>
            ))}
          </select>

          <input type="datetime-local" />

          <button type="submit">Agendar</button>
        </form>
      )}

    </main>
  );
}
