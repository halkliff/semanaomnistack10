import React, { FunctionComponent, useEffect, useState } from 'react';
import api from './services/api';

import './App.scss';
import './Sidebar.scss';
import './Main.scss';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

const App: FunctionComponent = () => {
  const [devs, setDevs] = useState<any[]>([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data: any) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>

        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            // eslint-disable-next-line no-underscore-dangle
            <DevItem dev={dev} key={dev._id} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
