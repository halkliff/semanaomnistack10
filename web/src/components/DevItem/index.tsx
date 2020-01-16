/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import './styles.scss';

const DevItem: FunctionComponent<any> = ({ dev }) => {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a
        href={`https://github.com/${dev.github_username}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Acessar Perfil no Github
      </a>
    </li>
  );
};

export default DevItem;
