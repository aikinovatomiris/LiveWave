import React from 'react';
import Banner from '../components/Banner';
import PopularEvents from '../components/PopularEvents';
import FeaturedEvent from '../components/FeaturedEvent';
import EventsList from '../components/EventsList';

function Home() {
  return (
    <>
      <Banner />
      <div className="container">
        <PopularEvents />
        <FeaturedEvent />
        <EventsList />
      </div>
    </>
  );
}

export default Home;