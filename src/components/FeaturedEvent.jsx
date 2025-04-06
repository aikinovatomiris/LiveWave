import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import EventService from '../services/EventService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeaturedEvent.css';

function FeaturedEvent() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const featuredEvents = EventService.getFeaturedEvents();
    setEvents(featuredEvents);
  }, []);

  return (
    <section className="featured-event">
      <h2>Интересное</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        {events.map(event => (
          <SwiperSlide key={event.id}>
            <div className="featured-slide" style={{ backgroundImage: `url(${event.image.detail})` }}>
              <div className="featured-content">
                <h3>{event.title}</h3>
                <p>{event.subtitle}</p>
                <Link to={`/event/${event.id}`}>
                  <button className="buy-ticket-btn">Купить билет</button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default FeaturedEvent;