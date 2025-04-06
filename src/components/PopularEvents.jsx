import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import EventCard from './EventCard';
import EventService from '../services/EventService';
import 'swiper/css';
import 'swiper/css/navigation';
import './PopularEvents.css';

function PopularEvents() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const popularEvents = EventService.getPopularEvents();
    setEvents(popularEvents);
  }, []);

  return (
    <section className="popular-events">
      <h2>Популярное</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {events.map(event => (
          <SwiperSlide key={event.id}>
            <Link to={`/event/${event.id}`} className="event-link">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default PopularEvents;
