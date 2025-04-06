import eventsData from '../data/events';

class EventService {
  /**
   * Получить все мероприятия
   * @param {Object} filters - объект с фильтрами
   * @returns {Array} отфильтрованный список мероприятий
   */
  getAllEvents(filters = {}) {
    let filteredEvents = [...eventsData];
    
    // Применяем фильтры
    if (filters.city && filters.city !== 'all') {
      filteredEvents = filteredEvents.filter(
        event => event.location.city === filters.city
      );
    }
    
    if (filters.category && filters.category !== 'all') {
      filteredEvents = filteredEvents.filter(
        event => event.category === filters.category
      );
    }
    
    if (filters.date && filters.date !== 'all') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Получаем дату конца текущей недели
      const endOfWeek = new Date(today);
      const daysToWeekend = 6 - today.getDay(); // Суббота - 6й день недели (0-воскресенье)
      endOfWeek.setDate(today.getDate() + daysToWeekend);
      
      // Получаем дату конца текущего месяца
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      filteredEvents = filteredEvents.filter(event => {
        // Получаем первую дату мероприятия
        const eventDateParts = event.dates[0].date.split(', ')[0].split(' ');
        const eventDay = parseInt(eventDateParts[0]);
        const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 
                            'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        const eventMonth = monthNames.indexOf(eventDateParts[1]);
        const eventYear = parseInt(eventDateParts[2] || new Date().getFullYear());
        const eventDate = new Date(eventYear, eventMonth, eventDay);
        
        switch (filters.date) {
          case 'today':
            return eventDate.toDateString() === today.toDateString();
          case 'tomorrow':
            return eventDate.toDateString() === tomorrow.toDateString();
          case 'weekend':
            // Проверяем, что дата мероприятия приходится на субботу или воскресенье
            return eventDate >= today && eventDate <= endOfWeek && 
                  (eventDate.getDay() === 0 || eventDate.getDay() === 6);
          case 'week':
            return eventDate >= today && eventDate <= endOfWeek;
          case 'month':
            return eventDate >= today && eventDate <= endOfMonth;
          default:
            return true;
        }
      });
    }
    
    // Фильтрация по ценовому диапазону (если указан)
    if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
      const [minPrice, maxPrice] = filters.priceRange;
      filteredEvents = filteredEvents.filter(event => {
        // Цена стандартного места как базовая для фильтрации
        const basePrice = event.prices.standard.standard;
        return basePrice >= minPrice && basePrice <= maxPrice;
      });
    }
    
    return filteredEvents;
  }

  /**
   * Получить популярные мероприятия
   * @param {number} limit - максимальное количество мероприятий
   * @returns {Array} список популярных мероприятий
   */
  getPopularEvents(limit = 4) {
    return eventsData
      .filter(event => event.popular)
      .slice(0, limit);
  }

  /**
   * Получить избранные мероприятия для главной страницы
   * @param {number} limit - максимальное количество мероприятий
   * @returns {Array} список избранных мероприятий
   */
  getFeaturedEvents(limit = 2) {
    return eventsData
      .filter(event => event.featured)
      .slice(0, limit);
  }

  /**
   * Получить мероприятие по ID
   * @param {number} id - ID мероприятия
   * @returns {Object|null} данные мероприятия или null, если не найдено
   */
  getEventById(id) {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    return eventsData.find(event => event.id === numId) || null;
  }

  /**
   * Получить категории мест и их цены для мероприятия
   * @param {number} eventId - ID мероприятия
   * @param {string} ticketType - тип билета ('standard' или 'student')
   * @returns {Object|null} данные о категориях и ценах или null, если мероприятие не найдено
   */
  getSeatPricesByEventId(eventId, ticketType = 'standard') {
    const event = this.getEventById(eventId);
    if (!event) return null;
    
    // Формируем данные для отображения на схеме мест
    const seatCategories = event.seatCategories;
    const prices = event.prices[ticketType];
    
    return { seatCategories, prices };
  }

  /**
   * Определить категорию места по номеру ряда для мероприятия
   * @param {number} eventId - ID мероприятия
   * @param {number} row - номер ряда
   * @returns {string|null} категория места или null, если мероприятие не найдено
   */
  getSeatCategory(eventId, row) {
    const event = this.getEventById(eventId);
    if (!event) return null;
    
    if (event.seatCategories.vip.includes(row)) return 'vip';
    if (event.seatCategories.premium.includes(row)) return 'premium';
    return 'standard';
  }

  /**
   * Проверить, доступно ли место для бронирования
   * @param {number} eventId - ID мероприятия
   * @param {number} row - номер ряда
   * @param {number} seat - номер места
   * @returns {boolean} true если место доступно, false если занято или мероприятие не найдено
   */
  isSeatAvailable(eventId, row, seat) {
    const event = this.getEventById(eventId);
    if (!event) return false;
    
    // Проверяем, нет ли этого места среди недоступных
    return !event.venue.unavailableSeats.some(
      unavailableSeat => unavailableSeat.row === row && unavailableSeat.seat === seat
    );
  }

  /**
   * Получить цену места
   * @param {number} eventId - ID мероприятия
   * @param {number} row - номер ряда
   * @param {string} ticketType - тип билета
   * @returns {number|null} цена места или null
   */
  getSeatPrice(eventId, row, ticketType = 'standard') {
    const event = this.getEventById(eventId);
    if (!event) return null;
    
    const category = this.getSeatCategory(eventId, row);
    return event.prices[ticketType][category];
  }

  /**
   * Получить ближайшие мероприятия
   * @param {number} limit - максимальное количество
   * @returns {Array} список мероприятий
   */
  getUpcomingEvents(limit = 6) {
    const today = new Date();
    
    // Фильтруем события, у которых есть будущие даты
    const upcomingEvents = eventsData.filter(event => {
      return event.dates.some(dateObj => {
        const eventDateParts = dateObj.date.split(', ')[0].split(' ');
        const eventDay = parseInt(eventDateParts[0]);
        const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 
                           'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        const eventMonth = monthNames.indexOf(eventDateParts[1]);
        const eventYear = parseInt(eventDateParts[2] || new Date().getFullYear());
        const eventDate = new Date(eventYear, eventMonth, eventDay);
        
        return eventDate >= today;
      });
    });
    
    // Сортируем по ближайшей дате
    upcomingEvents.sort((a, b) => {
      const getFirstDate = (event) => {
        const dateObj = event.dates[0];
        const eventDateParts = dateObj.date.split(', ')[0].split(' ');
        const eventDay = parseInt(eventDateParts[0]);
        const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 
                           'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        const eventMonth = monthNames.indexOf(eventDateParts[1]);
        const eventYear = parseInt(eventDateParts[2] || new Date().getFullYear());
        return new Date(eventYear, eventMonth, eventDay);
      };
      
      return getFirstDate(a) - getFirstDate(b);
    });
    
    return upcomingEvents.slice(0, limit);
  }
}

export default new EventService();