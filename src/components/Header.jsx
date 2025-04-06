import React, { useState } from 'react';
import './Header.css';
import events from '../data/events'; // путь подкорректируй, если другой
import { Link } from 'react-router-dom';

function Header() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setSuggestions(filtered);
    }
  };

  const handleSelectSuggestion = () => {
    setSearch('');
    setSuggestions([]);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-text">
            <img src="/images/logo.svg" alt="LiveWave" className="logo-lw" />
          </span>
        </div>

        <nav className="navigation">
          <ul>
            <li><Link to="/" className={window.location.pathname === '/' ? 'active' : ''}>Главная</Link></li>
            <li><Link to="/afisha" className={window.location.pathname === '/afisha' ? 'active' : ''}>Афиша</Link></li>
          </ul>
        </nav>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Поиск по артистам и концертам"
          value={search}
          onChange={handleSearchChange}
        />

        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((event) => (
               <Link to={`/event/${event.id}`} onClick={handleSelectSuggestion}>
              <li key={event.id}>
                  <img src={event.image.card} alt={event.title} />
                  <div>
                    <strong>{event.title}</strong>
                    <p>{event.subtitle}</p>
                  </div>
              </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
