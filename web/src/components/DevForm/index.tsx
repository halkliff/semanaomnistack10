/* eslint-disable react/prop-types */
import React, { FunctionComponent, useState, useEffect } from 'react';
import './styles.scss';

export interface DevFormProps {
  onSubmit(data: any): void;
}

const DevForm: FunctionComponent<DevFormProps> = ({ onSubmit }) => {
  const [lat, setLatitude] = useState<number>(0);
  const [long, setLongitude] = useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/camelcase
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit({
      // eslint-disable-next-line @typescript-eslint/camelcase
      github_username,
      techs,
      latitude: lat,
      longitude: long
    });

    setGithubUsername('');
    setTechs('');
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => console.warn(err),
      {
        timeout: 30000
      }
    );
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">
          Usuário do Github
          <input
            name="github_username"
            id="github_username"
            required
            // eslint-disable-next-line @typescript-eslint/camelcase
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </label>
      </div>

      <div className="input-block">
        <label htmlFor="techs">
          Tecnologias
          <input
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </label>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">
            Latitude
            <input
              name="latitude"
              id="latitude"
              type="number"
              required
              value={lat}
              onChange={e => setLatitude(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="input-block">
          <label htmlFor="longitude">
            Longitude
            <input
              name="longitude"
              id="longitude"
              type="number"
              required
              value={long}
              onChange={e => setLongitude(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
};

export default DevForm;
