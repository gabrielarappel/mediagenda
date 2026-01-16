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
  const [paciente, setPaciente] = useState(''); 
  const [medicoId, setMedicoId] = useState(''); 
  const [dataHora, setDataHora] = useState(''); 
  const [consultas, setConsultas] = useState([]); 
  const [loadingConsultas, setLoadingConsultas] = useState(true); 


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

  fetch('http://localhost:3001/consultas')
    .then(res => res.json())
    .then(data => {
      setConsultas(data);
      setLoadingConsultas(false);
    })
    .catch(err => {
      console.error(err);
      setLoadingConsultas(false);
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

async function handleAgendamentoSubmit(e: React.FormEvent) { 
  e.preventDefault();

  if (!paciente || !medicoId || !dataHora) return alert('Preencha todos os campos!');

  const response = await fetch('http://localhost:3001/consultas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paciente, medicoId: Number(medicoId), dataHora }),
  });

  const novaConsulta = await response.json();
  setPaciente('');
  setMedicoId('');
  setDataHora('');
  setMostrarAgendamento(false);
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
        <form onSubmit={handleAgendamentoSubmit} style={{ marginTop: 20 }}>
          <h3>Novo Agendamento</h3>

          <input
            placeholder="Paciente"
            value={paciente}
            onChange={e => setPaciente(e.target.value)}
          />

          <select
            value={medicoId}
            onChange={e => setMedicoId(e.target.value)}
          >
            <option value="">Selecione um médico</option>
            {medicos.map(medico => (
              <option key={medico.id} value={medico.id}>
                {medico.nome} — {medico.especialidade}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            value={dataHora}
            onChange={e => setDataHora(e.target.value)}
          />

          <button type="submit">Agendar</button>
        </form>
      )}

    </main>
  );
}
