import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import EventService from '../services/EventService';
import './EventsList.css';

function EventsList({ limit = 3 }) {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    // Получаем ближайшие события при монтировании компонента
    const upcomingEvents = EventService.getUpcomingEvents(limit);
    setEvents(upcomingEvents);
  }, [limit]);

  return (
    <section className="events-list">
      <div className="events-header">
        <h2>Афиша событий</h2>
        <Link to="/afisha" className="see-all">Показать все</Link>
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
    </section>
  );
}

export default EventsList;