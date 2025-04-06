const eventsData = [
    {
      id: 1,
      title: 'NCT 127 TOUR',
      subtitle: 'The momentum',
      image: {
        card: '/images/nct127.png',
        detail: '/images/nct127.png'
      },
      dates: [
        { id: 101, date: '24 Мая, 2025', time: '18:30', available: true },
        { id: 102, date: '22 Июня, 2025', time: '18:30', available: true }
      ],
      location: {
        name: 'Барыс Арена',
        city: 'astana',
        address: 'пр. Туран, 57'
      },
      category: 'concerts',
      subcategory: 'kpop',
      restriction: '16+',
      featured: true,
      popular: true,
      description: [
        'Премьера состоялась 15 апреля 2021 года.',
        'По киносценариям фильмов "Иваново детство" и "Зеркало".',
        'Иван – это ребёнок, снедаемый страстью взрослого. Он потерял детство на войне и погиб, потому что жил как взрослый. Картина должна строиться на характере мальчика, но должны быть эпизоды, где выясняются его детские черты. В рассказе найдена точная деталь – игра в войну – что может быть страшнее! Здесь всё очень глубоко, страшно и правдиво, здесь нет места приключенческой романтике...',
        'Иван видит сны. Ему снится та жизнь, которой он лишён, обыкновенное детство. В снах должно быть обыкновенное счастливое детство. В жизни – та страшная нелепость, которая происходит, когда ребёнок вынужден воевать.'
      ],
      prices: {
        standard: {
          vip: 45000,
          premium: 38000,
          standard: 30000
        },
        student: {
          vip: 38000,
          premium: 32000,
          standard: 25000
        }
      },
      priceDisplay: 'От 30000тг',
      seatCategories: {
        vip: [1, 2, 3],
        premium: [4, 5, 6, 7],
        standard: [8, 9, 10, 11, 12, 13, 14]
      },
      venue: {
        totalSeats: 5000,
        mapImage: '/images/venues/barys-arena-map.jpg',
        seatLayout: {
          // Данные о конкретной схеме мест для этого события
          // В реальном приложении здесь может быть ссылка на отдельный файл схемы
          rows: 14,
          seatsInRow: [15, 18, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 15]
        },
        // Массив заранее занятых (недоступных) мест
        unavailableSeats: [
          { row: 1, seat: 3 },
          { row: 1, seat: 4 },
          { row: 2, seat: 10 },
          { row: 3, seat: 15 },
          { row: 4, seat: 7 },
          { row: 5, seat: 8 }
        ]
      },
      additionalInfo: {
        duration: '2 часа 30 минут',
        breaks: '1 антракт',
        organizer: 'LiveWave Events',
        contact: 'info@livewave.kz'
      },
      gallery: [
        '/images/gallery/nct127_1.jpg',
        '/images/gallery/nct127_2.jpg',
        '/images/gallery/nct127_3.jpg'
      ],
      tags: ['k-pop', 'концерт', 'музыка']
    },
    {
      id: 2,
      title: 'Jose Carreras',
      subtitle: 'Прощальный тур',
      image: {
        card: '/images/JoseCarreras.jpg',
        detail: '/images/JoseCarreras.jpg'
      },
      dates: [
        { id: 201, date: '1 Июня, 2025', time: '16:00', available: true }
      ],
      location: {
        name: 'QAZAQCONCERT',
        city: 'astana',
        address: 'пр. Мәңгілік Ел, 10/1'
      },
      category: 'concerts',
      subcategory: 'classic',
      restriction: '12+',
      featured: false,
      popular: true,
      description: [
        'Хосе Каррерас – всемирно известный тенор, один из легендарных «Трех теноров» наряду с Пласидо Доминго и Лучано Паваротти.',
        'В рамках своего прощального турне маэстро посетит Казахстан с эксклюзивной программой, в которую войдут самые знаменитые оперные арии и классические композиции.',
        'За свою карьеру, насчитывающую более 60 лет на сцене, Хосе Каррерас выступал на лучших площадках мира, включая Метрополитен-Опера, Ла Скала и Королевский оперный театр Ковент-Гарден.',
        'Не упустите возможность насладиться великолепным голосом и мастерством этой легенды оперного искусства в рамках его последнего турне.'
      ],
      prices: {
        standard: {
          vip: 50000,
          premium: 40000,
          standard: 25000
        },
        student: {
          vip: 45000,
          premium: 35000,
          standard: 20000
        }
      },
      priceDisplay: 'От 25000тг',
      seatCategories: {
        vip: [1, 2, 3, 4],
        premium: [5, 6, 7, 8, 9],
        standard: [10, 11, 12, 13, 14, 15, 16, 17]
      },
      venue: {
        totalSeats: 3500,
        mapImage: '/images/venues/qazaqconcert-map.jpg',
        seatLayout: {
          rows: 17,
          seatsInRow: [16, 18, 20, 20, 22, 24, 24, 24, 24, 24, 24, 22, 22, 20, 18, 16, 14]
        },
        unavailableSeats: [
          { row: 2, seat: 5 },
          { row: 3, seat: 10 },
          { row: 7, seat: 15 }
        ]
      },
      additionalInfo: {
        duration: '2 часа',
        breaks: 'Без антракта',
        organizer: 'Classic Music Group',
        contact: 'classic@livewave.kz'
      },
      gallery: [
        '/images/gallery/carreras_1.jpg',
        '/images/gallery/carreras_2.jpg'
      ],
      tags: ['опера', 'классическая музыка', 'концерт']
    },
    {
      id: 3,
      title: 'EXO CHEN',
      subtitle: 'Last Scene',
      image: {
        card: '/images/exochen.jpg',
        detail: '/images/exochen.jpg'
      },
      dates: [
        { id: 301, date: '6 Апреля, 2025', time: '18:00', available: true },
        { id: 302, date: '7 Апреля, 2025', time: '18:00', available: true }
      ],
      location: {
        name: 'Алматы Арена',
        city: 'almaty',
        address: 'пр. Абая, 44'
      },
      category: 'concerts',
      subcategory: 'kpop',
      restriction: '12+',
      featured: false,
      popular: true,
      description: [
        'EXO-CBX — официальный саб-юнит южнокорейско-китайского бойз-бенда EXO, сформированный SM Entertainment в 2016 году.',
        'В состав входят три участника EXO: Чен, Бэкхён и Сиумин. Название происходит от первых букв сценических псевдонимов участников: C для Chen (Чен), B для Baekhyun (Бэкхён) и X для Xiumin (Сиумин).',
        'Чен (настоящее имя Ким Чондэ) — южнокорейский певец, автор песен и актёр. Является главным вокалистом k-pop группы EXO, её подгруппы EXO-K, а также подгруппы EXO-CBX.',
        'Не пропустите уникальную возможность увидеть его сольное выступление в рамках мирового тура!'
      ],
      prices: {
        standard: {
          vip: 40000,
          premium: 35000,
          standard: 28000
        },
        student: {
          vip: 35000,
          premium: 30000,
          standard: 24000
        }
      },
      priceDisplay: 'От 28000тг',
      seatCategories: {
        vip: [1, 2, 3],
        premium: [4, 5, 6, 7, 8],
        standard: [9, 10, 11, 12, 13, 14, 15]
      },
      venue: {
        totalSeats: 5000,
        mapImage: '/images/venues/almaty-arena-map.jpg',
        seatLayout: {
          rows: 15,
          seatsInRow: [20, 22, 24, 24, 26, 26, 26, 26, 26, 26, 24, 22, 20, 18, 16]
        },
        unavailableSeats: [
          { row: 1, seat: 5 },
          { row: 1, seat: 6 },
          { row: 2, seat: 10 },
          { row: 3, seat: 15 },
          { row: 4, seat: 20 }
        ]
      },
      additionalInfo: {
        duration: '2 часа 15 минут',
        breaks: '1 антракт',
        organizer: 'K-Pop Entertainment',
        contact: 'kpop@livewave.kz'
      },
      gallery: [
        '/images/gallery/chen_1.jpg',
        '/images/gallery/chen_2.jpg',
        '/images/gallery/chen_3.jpg'
      ],
      tags: ['k-pop', 'EXO', 'концерт', 'музыка']
    },
    {
      id: 4,
      title: 'EXO PLANET',
      subtitle: 'EXO PLANET #5',
      image: {
        card: '/images/exoplanet.jpg',
        detail: '/images/exoplanet.jpg'
      },
      dates: [
        { id: 401, date: '15 Января, 2025', time: '17:00', available: true },
        { id: 402, date: '16 Января, 2025', time: '17:00', available: true }
      ],
      location: {
        name: 'Барыс Арена',
        city: 'astana',
        address: 'пр. Туран, 57'
      },
      category: 'concerts',
      subcategory: 'kpop',
      restriction: '12+',
      featured: true,
      popular: true,
      description: [
        'EXO (кор. 엑소) — южнокорейско-китайский бойбенд, сформированный в 2011 году компанией SM Entertainment. Коллектив дебютировал в 2012 году в составе двенадцати человек, позднее разделившись на две саб-группы: EXO-K и EXO-M.',
        'EXO является одной из самых популярных K-pop групп в мире, известной своими впечатляющими живыми выступлениями, сильным вокалом и захватывающей хореографией.',
        'Концертный тур EXO PLANET #5 представляет собой грандиозное шоу с использованием новейших технологий, спецэффектов и световых инсталляций, которые создают незабываемую атмосферу и полное погружение в мир EXO.',
        'Группа исполнит как свои самые известные хиты, так и новые композиции, подготовленные специально для этого тура.'
      ],
      prices: {
        standard: {
          vip: 42000,
          premium: 36000,
          standard: 32000
        },
        student: {
          vip: 38000,
          premium: 32000,
          standard: 28000
        }
      },
      priceDisplay: 'От 32000тг',
      seatCategories: {
        vip: [1, 2, 3],
        premium: [4, 5, 6, 7],
        standard: [8, 9, 10, 11, 12, 13, 14]
      },
      venue: {
        totalSeats: 5000,
        mapImage: '/images/venues/barys-arena-map.jpg',
        seatLayout: {
          rows: 14,
          seatsInRow: [15, 18, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 15]
        },
        unavailableSeats: [
          { row: 2, seat: 3 },
          { row: 2, seat: 4 },
          { row: 3, seat: 10 },
          { row: 4, seat: 15 },
          { row: 5, seat: 7 }
        ]
      },
      additionalInfo: {
        duration: '2 часа 30 минут',
        breaks: '1 антракт',
        organizer: 'LiveWave Events',
        contact: 'info@livewave.kz'
      },
      gallery: [
        '/images/gallery/exoplanet_1.jpg',
        '/images/gallery/exoplanet_2.jpg',
        '/images/gallery/exoplanet_3.jpg'
      ],
      tags: ['k-pop', 'EXO', 'концерт', 'музыка']
    },
    {
      id: 5,
      title: 'BLACKPINK WORLD TOUR',
      subtitle: 'BORN PINK',
      image: {
        card: '/images/blackpink.jpg',
        detail: '/images/blackpink.jpg'
      },
      dates: [
        { id: 501, date: '29 Июня, 2025', time: '19:00', available: true }
      ],
      location: {
        name: 'Астана Арена',
        city: 'astana',
        address: 'пр. Кабанбай батыра, 45/1'
      },
      category: 'concerts',
      subcategory: 'kpop',
      restriction: '12+',
      featured: true,
      popular: false,
      description: [
        'BLACKPINK — южнокорейская гёрл-группа, сформированная в 2016 году компанией YG Entertainment. Коллектив состоит из четырёх участниц: Джису, Дженни, Розэ и Лисы.',
        'BLACKPINK является одной из самых успешных и влиятельных K-pop групп в мире, известной своими хитами, уникальным стилем и мощной энергетикой на сцене.',
        'Мировой тур BORN PINK представляет собой грандиозное шоу, которое включает в себя как всемирно известные хиты группы, так и сольные выступления каждой участницы.',
        'Концерт BLACKPINK — это не просто музыкальное событие, это впечатляющее шоу с потрясающими визуальными эффектами, хореографией и взаимодействием с фанатами.'
      ],
      prices: {
        standard: {
          vip: 45000,
          premium: 38000,
          standard: 35000
        },
        student: {
          vip: 40000,
          premium: 35000,
          standard: 30000
        }
      },
      priceDisplay: 'От 35000тг',
      seatCategories: {
        vip: [1, 2, 3, 4],
        premium: [5, 6, 7, 8, 9],
        standard: [10, 11, 12, 13, 14, 15, 16, 17, 18]
      },
      venue: {
        totalSeats: 30000,
        mapImage: '/images/venues/astana-arena-map.jpg',
        seatLayout: {
          rows: 18,
          seatsInRow: [20, 24, 28, 30, 32, 34, 36, 38, 40, 40, 38, 36, 34, 32, 30, 28, 24, 20]
        },
        unavailableSeats: [
          { row: 1, seat: 5 },
          { row: 1, seat: 6 },
          { row: 2, seat: 10 },
          { row: 3, seat: 15 }
        ]
      },
      additionalInfo: {
        duration: '2 часа 30 минут',
        breaks: '1 антракт',
        organizer: 'K-Pop Entertainment',
        contact: 'kpop@livewave.kz'
      },
      gallery: [
        '/images/gallery/blackpink_1.jpg',
        '/images/gallery/blackpink_2.jpg',
        '/images/gallery/blackpink_3.jpg'
      ],
      tags: ['k-pop', 'blackpink', 'концерт', 'музыка']
    },
    {
      id: 6,
      title: 'TWICE 5TH WORLD TOUR',
      subtitle: 'READY TO BE',
      image: {
        card: '/images/twice.jpeg',
        detail: '/images/twice.jpeg'
      },
      dates: [
        { id: 601, date: '10 Июля, 2025', time: '18:30', available: true },
        { id: 602, date: '11 Июля, 2025', time: '18:30', available: true }
      ],
      location: {
        name: 'Барыс Арена',
        city: 'astana',
        address: 'пр. Туран, 57'
      },
      category: 'concerts',
      subcategory: 'kpop',
      restriction: '12+',
      featured: false,
      popular: false,
      description: [
        'TWICE — южнокорейская гёрл-группа, сформированная компанией JYP Entertainment через реалити-шоу Sixteen в 2015 году. Коллектив состоит из девяти участниц: Наён, Чонён, Момо, Саны, Джихё, Мины, Дахён, Чэён и Цзыюй.',
        'TWICE известны своими яркими и запоминающимися песнями, а также энергичными и синхронными танцевальными номерами, которые сделали их одной из самых популярных K-pop групп в мире.',
        'Мировой тур READY TO BE — это пятый концертный тур группы, который включает в себя выступления на крупнейших площадках мира, в том числе в Азии, Северной Америке, Европе и теперь в Казахстане.',
        'На концерте TWICE исполнят свои главные хиты, включая "What is Love?", "Feel Special", "Fancy", "I Can\'t Stop Me", "Alcohol-Free", "Talk that Talk" и многие другие любимые фанатами песни.'
      ],
      prices: {
        standard: {
          vip: 39000,
          premium: 34000,
          standard: 29000
        },
        student: {
          vip: 35000,
          premium: 30000,
          standard: 25000
        }
      },
      priceDisplay: 'От 29000тг',
      seatCategories: {
        vip: [1, 2, 3],
        premium: [4, 5, 6, 7],
        standard: [8, 9, 10, 11, 12, 13, 14]
      },
      venue: {
        totalSeats: 5000,
        mapImage: '/images/venues/barys-arena-map.jpg',
        seatLayout: {
          rows: 14,
          seatsInRow: [15, 18, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 15]
        },
        unavailableSeats: [
          { row: 1, seat: 5 },
          { row: 2, seat: 10 },
          { row: 3, seat: 15 }
        ]
      },
      additionalInfo: {
        duration: '2 часа 30 минут',
        breaks: '1 антракт',
        organizer: 'LiveWave Events',
        contact: 'info@livewave.kz'
      },
      gallery: [
        '/images/twice.jpeg',
        '/images/gallery/twice_2.jpg',
        '/images/gallery/twice_3.jpg'
      ],
      tags: ['k-pop', 'twice', 'концерт', 'музыка']
    }
  ];
  export default eventsData;