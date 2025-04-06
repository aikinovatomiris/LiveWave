import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventService from '../services/EventService';
import './EventDetail.css';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketType, setTicketType] = useState('standard');
  const [bookedSeats, setBookedSeats] = useState([]); // Отдельный массив для забронированных мест
  
  // Состояния для модального окна оплаты
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [kaspiNumber, setKaspiNumber] = useState('');
  const [paymentSent, setPaymentSent] = useState(false);
  const [inputError, setInputError] = useState('');
  
  useEffect(() => {
    // Загружаем данные о мероприятии при монтировании компонента
    const eventData = EventService.getEventById(parseInt(id, 10));
    
    if (eventData) {
      setEvent(eventData);
      setLoading(false);
      
      // Инициализируем массив недоступных мест
      if (eventData.venue && eventData.venue.unavailableSeats) {
        const unavailableSeatsArray = eventData.venue.unavailableSeats.map(
          item => `${item.row}-${item.seat}`
        );
        setBookedSeats(unavailableSeatsArray);
      }
    } else {
      // Если мероприятие не найдено, перенаправляем на страницу афиши
      navigate('/afisha');
    }
  }, [id, navigate]);
  
  // Если оплата отправлена, но модальное окно закрыто, обновляем UI
  useEffect(() => {
    if (paymentSent && !showPaymentModal) {
      setSelectedSeats([]);
    }
  }, [paymentSent, showPaymentModal]);
  
  if (loading || !event) {
    return <div className="loading">Загрузка...</div>;
  }
  
  // Получаем категорию места по номеру ряда
  const getSeatCategory = (row) => {
    return EventService.getSeatCategory(event.id, row);
  };
  
  // Получаем цену для определенного места
  const getSeatPrice = (row) => {
    return EventService.getSeatPrice(event.id, row, ticketType);
  };
  
  // Проверяем, доступно ли место
  const isSeatAvailable = (row, seat) => {
    // Проверяем по локальному массиву забронированных мест
    return !bookedSeats.includes(`${row}-${seat}`);
  };
  
  // Проверяем, забронировано ли место после оплаты
  const isBooked = (row, seat) => {
    // Проверяем только недоступные места, исключая выбранные
    return bookedSeats.includes(`${row}-${seat}`) && 
           !selectedSeats.some(s => s.id === `${row}-${seat}`);
  };
  
  // Получаем цвет для категории места
  const getCategoryColor = (row) => {
    const category = getSeatCategory(row);
    if (category === 'vip') return '#8e44ad';
    if (category === 'premium') return '#3498db';
    return '#2ecc71';
  };
  
  const handleDateSelection = (dateId) => {
    setSelectedDate(dateId);
    setSelectedSeats([]);
  };

  const handleSeatClick = (row, seat) => {
    if (!isSeatAvailable(row, seat)) return;
    
    const seatId = `${row}-${seat}`;
    const isSeatSelected = selectedSeats.some(s => s.id === seatId);
    
    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
    } else {
      const category = getSeatCategory(row);
      const price = getSeatPrice(row);
      setSelectedSeats([...selectedSeats, { 
        id: seatId, 
        row, 
        seat, 
        category,
        price
      }]);
    }
  };
  
  const handleTicketTypeChange = (type) => {
    setTicketType(type);
    // Обновляем цены для выбранных мест
    setSelectedSeats(selectedSeats.map(seat => ({
      ...seat,
      price: EventService.getSeatPrice(event.id, seat.row, type)
    })));
  };
  
  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };
  
  // Функция для отмены выбора всех мест
  const handleCancelSelection = () => {
    setSelectedSeats([]);
  };
  
  // Обработчики для модального окна оплаты
  const openPaymentModal = () => {
    setShowPaymentModal(true);
    setPaymentSent(false);
    setKaspiNumber('');
    setInputError('');
  };
  
  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };
  
  const handleKaspiNumberChange = (e) => {
    const value = e.target.value;
    // Проверяем, что вводятся только цифры
    if (value === '' || /^[0-9]+$/.test(value)) {
      setKaspiNumber(value);
      setInputError('');
    }
  };
  
  const sendPaymentRequest = () => {
    // Проверка валидности номера Kaspi
    if (!kaspiNumber || kaspiNumber.length !== 10) {
      setInputError('Введите корректный номер телефона (10 цифр)');
      return;
    }
    
    // Симуляция отправки платежа
    setTimeout(() => {
      // Создаем новый массив забронированных мест, добавляя выбранные
      const newBookedSeats = [...bookedSeats];
      
      // Добавляем выбранные места в список забронированных
      selectedSeats.forEach(seat => {
        if (!newBookedSeats.includes(seat.id)) {
          newBookedSeats.push(seat.id);
        }
      });
      
      // Обновляем список забронированных мест
      setBookedSeats(newBookedSeats);
      
      // Обновляем данные события для сохранения изменений
      const updatedUnavailableSeats = [...event.venue.unavailableSeats];
      
      // Добавляем выбранные места в массив недоступных мест событий
      selectedSeats.forEach(seat => {
        updatedUnavailableSeats.push({
          row: seat.row,
          seat: seat.seat
        });
      });
      
      // Обновляем данные события
      const updatedEvent = {
        ...event,
        venue: {
          ...event.venue,
          unavailableSeats: updatedUnavailableSeats
        }
      };
      
      setEvent(updatedEvent);
      setPaymentSent(true);
    }, 1000);
  };

  return (
    <div className="event-page">
      <div className="event-header" style={{ backgroundImage: `url(${event.image.detail})` }}>
        <div className="event-header-overlay">
          <div className="container">
            <div className="event-header-content">
              <h1>{event.title}</h1>
              <h2>{event.subtitle}</h2>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="event-content">
          <div className="event-info">
            <div className="event-info-item">
              <h3>Стоимость билета</h3>
              <p>{event.priceDisplay}</p>
            </div>
            <div className="event-info-item">
              <h3>Ограничение</h3>
              <p>{event.restriction}</p>
            </div>
          </div>
          
          <div className="event-description">
            <h3>Описание</h3>
            <div className="description-divider"></div>
            {event.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="event-booking">
            <div className="date-selection">
              <h3>Выберите дату мероприятия</h3>
              <div className="date-buttons">
                {event.dates.map(date => (
                  <button 
                    key={date.id} 
                    className={`date-button ${selectedDate === date.id ? 'selected' : ''}`}
                    onClick={() => handleDateSelection(date.id)}
                  >
                    {date.date}, {date.time}
                  </button>
                ))}
              </div>
            </div>
            
            {selectedDate && (
              <>
                <div className="ticket-type-selection">
                  <h3>Выберите тип билета</h3>
                  <div className="ticket-type-buttons">
                    <button 
                      className={`ticket-type-button ${ticketType === 'standard' ? 'selected' : ''}`}
                      onClick={() => handleTicketTypeChange('standard')}
                    >
                      Обычный
                    </button>
                    <button
                      className={`ticket-type-button ${ticketType === 'student' ? 'selected' : ''}`}
                      onClick={() => handleTicketTypeChange('student')}
                    >
                      Студенческий
                    </button>
                  </div>
                </div>

                <div className="seating-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#8e44ad' }}></div>
                    <span>VIP ({event.prices[ticketType].vip}тг)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#3498db' }}></div>
                    <span>Премиум ({event.prices[ticketType].premium}тг)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#2ecc71' }}></div>
                    <span>Стандарт ({event.prices[ticketType].standard}тг)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color selected"></div>
                    <span>Выбранные места</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#95a5a6' }}></div>
                    <span>Занятые места</span>
                  </div>
                </div>
                <div className="seating-layout">
                  <div className="hall-schema">
                    <h3>Схема зала</h3>
                    <div className="stage">СЦЕНА</div>
                    <div className="seating-chart">
                      {[...Array(event.venue.seatLayout.rows)].map((_, rowIndex) => {
                        const row = rowIndex + 1;
                        const seatsInRow = event.venue.seatLayout.seatsInRow[rowIndex];
                        return (
                          <div key={row} className="seat-row">
                            <div className="row-number">{row}</div>
                            {[...Array(seatsInRow)].map((_, seatIndex) => {
                              const seat = seatIndex + 1;
                              const available = isSeatAvailable(row, seat);
                              const selected = selectedSeats.some(s => s.id === `${row}-${seat}`);
                              const booked = isBooked(row, seat);
                              
                              let backgroundColor;
                              if (selected) {
                                backgroundColor = '#e74c3c'; // красный для выбранных
                              } else if (booked) {
                                backgroundColor = '#95a5a6'; // серый для забронированных
                              } else if (!available) {
                                backgroundColor = '#95a5a6'; // серый для недоступных
                              } else {
                                backgroundColor = getCategoryColor(row); // цвет категории для доступных
                              }
                              
                              return (
                                <div
                                  key={seat}
                                  className={`seat ${available ? 'available' : 'unavailable'} ${selected ? 'selected' : ''} ${booked ? 'booked' : ''}`}
                                  style={{ backgroundColor }}
                                  onClick={() => handleSeatClick(row, seat)}
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="selected-seats-summary">
                    <h3>Выбранные места</h3>
                    {selectedSeats.length === 0 ? (
                      <p className="no-seats-message">Выберите места на схеме зала</p>
                    ) : (
                      <>
                        <div className="selected-seats-list">
                          {selectedSeats.map(seat => (
                            <div key={seat.id} className="selected-seat-item">
                              <div className="seats">
                                <span className="seat-label">Ряд {seat.row}, Место {seat.seat}</span>
                                <span className="seat-category">
                                  {seat.category === 'vip' ? 'VIP' : 
                                   seat.category === 'premium' ? 'Премиум' : 'Стандарт'}
                                </span>
                              </div>
                              <div className="seat-price">{seat.price} тг</div>
                            </div>
                          ))}
                        </div>
                        <div className="total-price">
                          <div className="total-label">Итого:</div>
                          <div className="total-amount">{getTotalPrice()} тг</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="booking-notice">
                  <p>
                    Внимание! Выбранные вами билеты должны быть оплачены банковской картой в течение 30 минут. Обязательно распечатайте приобретенный вами электронный билет. Его необходимо предъявить при входе в театр.
                  </p>
                </div>
                <div className="booking-actions">
                  <button
                    className={`pay-button ${selectedSeats.length === 0 ? 'disabled' : ''}`}
                    disabled={selectedSeats.length === 0}
                    onClick={openPaymentModal}
                  >
                    Оплатить билет
                  </button>
                  <button 
                    className="cancel-button"
                    onClick={handleCancelSelection}
                  >
                    Отменить
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Модальное окно оплаты */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <h3>{paymentSent ? 'Оплата отправлена' : 'Оплата билета'}</h3>
              <button className="close-modal" onClick={closePaymentModal}>&times;</button>
            </div>
            
            <div className="modal-content">
              {!paymentSent ? (
                <>
                  <div className="payment-info">
                    <p>Для оплаты билетов на сумму <strong>{getTotalPrice()} тг</strong> введите номер телефона Kaspi:</p>
                    <div className="input-group">
                      <div className="input-prefix">+7</div>
                      <input 
                        type="text" 
                        className="kaspi-input"
                        placeholder="7XX XXX XXXX" 
                        value={kaspiNumber} 
                        onChange={handleKaspiNumberChange}
                        maxLength={10}
                      />
                    </div>
                    {inputError && <div className="input-error">{inputError}</div>}
                    <div className="selected-event-info">
                      <p><strong>{event.title}</strong> - {event.dates.find(d => d.id === selectedDate)?.date}</p>
                      <p>Выбрано мест: {selectedSeats.length}</p>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button className="send-payment-button" onClick={sendPaymentRequest}>
                      Отправить счет
                    </button>
                  </div>
                </>
              ) : (
                <div className="payment-success">
                  <div className="success-icon">✓</div>
                  <p>Счет на оплату отправлен на ваш указанный номер.</p>
                  <p>После оплаты билет придет в виде СМС.</p>
                  <p className="success-note">Выбранные места забронированы за вами на 30 минут.</p>
                  <button className="close-success-button" onClick={closePaymentModal}>
                    Закрыть
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetail;