import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import EventService from '../services/EventService';
import './Afisha.css';

function Afisha() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    city: 'all',
    category: 'all',
    date: 'all',
    priceRange: [0, 50000]
  });
  
  useEffect(() => {
    // Загружаем события при монтировании компонента
    const initialEvents = EventService.getAllEvents();
    setEvents(initialEvents);
  }, []);
  
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };
  
  const applyFilters = () => {
    const filteredEvents = EventService.getAllEvents(filters);
    setEvents(filteredEvents);
  };

  return (
    <div className="afisha-page">
      <div className="container">
        <h1 className="afisha-title">Афиша событий</h1>
        
        <div className="filter-bar">
          <div className="filter-group">
            <select 
              className="filter-select"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            >
              <option value="all">Все города</option>
              <option value="astana">Астана</option>
              <option value="almaty">Алматы</option>
              <option value="karaganda">Караганда</option>
              <option value="shymkent">Шымкент</option>
            </select>
          </div>
          <div className="filter-group">
            <select 
              className="filter-select"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="all">Все категории</option>
              <option value="concerts">Концерты</option>
              <option value="theatre">Театр</option>
              <option value="festivals">Фестивали</option>
              <option value="children">Детям</option>
              <option value="sports">Спорт</option>
              <option value="standup">Стендап</option>
            </select>
          </div>
          <div className="filter-group">
            <select 
              className="filter-select"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
            >
              <option value="all">Любая дата</option>
              <option value="today">Сегодня</option>
              <option value="tomorrow">Завтра</option>
              <option value="weekend">На выходных</option>
              <option value="week">На этой неделе</option>
              <option value="month">В этом месяце</option>
            </select>
          </div>
          <button className="filter-button" onClick={applyFilters}>
            Найти
          </button>
        </div>
        
        <div className="events-grid">
          {events.map(event => (
            <Link to={`/event/${event.id}`} key={event.id} className="event-link">
              <EventCard 
                title={event.title}
                subtitle={event.subtitle}
                date={event.dates[0].date}
                time={event.dates[0].time}
                location={event.location.name}
                image={event.image.card}
                price={event.priceDisplay}
                restriction={event.restriction}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Afisha;