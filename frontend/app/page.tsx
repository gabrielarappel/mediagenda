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
  const [mostrarCadastro, setMostrarCadastro] = useState(false);



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

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button
            onClick={() => setMostrarAgendamento(true)}
            style={{
              padding: '10px 20px',
              borderRadius: 4,
              backgroundColor: '#FF9800', // laranja chamativo
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              alignSelf: 'center', // se estiver dentro de flex, centraliza verticalmente
              transition: 'background-color 0.3s', // efeito hover
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#FB8C00')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#FF9800')}
          >
            Novo Agendamento
          </button>

          {!mostrarCadastro && (
          <button
            onClick={() => setMostrarCadastro(true)}
            style={{
              padding: '10px 20px',
              borderRadius: 4,
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#45A049')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#4CAF50')}
          >
            Cadastrar Médico
          </button>
        )}
        </div>


      <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
          {mostrarAgendamento && (
        <form onSubmit={handleAgendamentoSubmit} style={{ marginTop: 20, padding: 20, border: '1px solid #ccc', borderRadius: 8, maxWidth: 350, display: 'flex', flexDirection: 'column', gap: 10, backgroundColor: '#f9f9f9'  }}>
          <h3>Novo Agendamento</h3>

          <input placeholder="Paciente" value={paciente} onChange={e => setPaciente(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          <select value={medicoId} onChange={e => setMedicoId(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
            <option value="">Selecione um médico</option>
            {medicos.map(medico => (
              <option key={medico.id} value={medico.id}>{medico.nome} — {medico.especialidade}</option>
            ))}
          </select>
          <input type="datetime-local" value={dataHora} onChange={e => setDataHora(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: 10, borderRadius: 4, backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>Agendar</button>
        </form>
      )}

        {mostrarCadastro && (
          <form onSubmit={handleSubmit} style={{ flex: '0 0 350px', display: 'flex', flexDirection: 'column', gap: 10, padding: 20, border: '1px solid #ccc', borderRadius: 8, backgroundColor: '#f9f9f9'  }}>
          <h3>Cadastrar médico</h3>
          <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          <input placeholder="CRM" value={crm} onChange={e => setCrm(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          <input placeholder="Especialidade" value={especialidade} onChange={e => setEspecialidade(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: 10, borderRadius: 4, backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Cadastrar</button>
        </form>
        )}
      </div>
      

    </main>
  );
}
