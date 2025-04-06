import React from 'react';
import './EventCard.css';

function EventCard({ title, subtitle, date, time, location, image, price, restriction }) {
  return (
    <div className="event-card">
      <div className="event-image" style={{ backgroundImage: `url(${image})` }}>
        <div className="event-date-label">{date}, {time}</div>
        {price && <div className="event-price-label">{price}</div>}
        {restriction && <div className="event-restriction">{restriction}</div>}
      </div>
      <div className="events">
        <h3 className="event-title">{title}</h3>
        {subtitle && <div className="event-subtitle">{subtitle}</div>}
        <div className="event-location">{location}</div>
      </div>
    </div>
  );
}

export default EventCard;