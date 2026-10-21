export const media = {
  heroImage:
    'https://vl-prod-static.b-cdn.net/system/images/000/906/464/2b2fb4e833a4d02e052890cd3eb843d0/original/IMG_4182.jpg?width=2000',
  heroVideo:
    'https://videos.pexels.com/video-files/8747384/8747384-uhd_2732_1440_30fps.mp4',
};

export const gallery = [
  {
    title: 'Chandratal Lake',
    image:
      'https://vl-prod-static.b-cdn.net/system/images/000/888/608/fb82d0e1f6367af28ec8daf9a4e44d01/original/Traviator_Backpacking_Bikexpedition_tours61.jpg',
    alt: 'Traviator journey beside the high-altitude waters of Chandratal Lake',
    shape: 'tall',
  },
  {
    title: 'Jaisalmer, together',
    image:
      'https://vl-prod-static.b-cdn.net/system/images/000/888/604/896fc4fe4eb9e8e42d0ec943cb7cac13/original/Traviator_Backpacking_Bikexpedition_tours65.jpg',
    alt: 'A moment from a Traviator journey in Jaisalmer',
    shape: 'wide',
  },
  {
    title: 'Bali, off the map',
    image:
      'https://vl-prod-static.b-cdn.net/system/images/000/888/610/4b036fa49ae298130654c3bbd91cfad3/1200gt/Traviator_Backpacking_Bikexpedition_tours52.jpg',
    alt: 'Travellers discovering Bali with Traviator',
    shape: 'standard',
  },
  {
    title: 'Ladakh, by the long road',
    image:
      'https://vl-prod-static.b-cdn.net/system/images/000/888/915/6b364cfb9a1765685f1d4d959004a0be/1200gt/Traviator_Backpacking_Bikexpedition_tours19.jpg',
    alt: 'A Traviator bike and backpacking expedition in Ladakh',
    shape: 'standard',
  },
  {
    title: 'Somewhere in Spiti',
    image:
      'https://vl-prod-static.b-cdn.net/system/images/000/888/756/e45ca7eebd985ad3da9870fb19282441/1200gt/Traviator_Backpacking_Bikexpedition_tours4.jpg',
    alt: 'A mountain road through Spiti Valley',
    shape: 'wide',
  },
  {
    title: 'A slower Bali morning',
    image:
      'https://vl-prod-static.b-cdn.net/system/images/000/888/612/063eb37fdca554ac3d5a6027d3e5598d/x800gt/Traviator_Backpacking_Bikexpedition_tours50.jpg',
    alt: 'A quiet moment on a Traviator Bali backpacking trip',
    shape: 'tall',
  },
];

export const tours = [
  {
    id: 'ladakh',
    name: 'Ladakh Bike & Backpacking Expedition Tour',
    location: 'Ladakh, India',
    duration: '7 nights · 8 days',
    price: '₹24,999',
    category: 'india',
    mode: 'bike',
    image: gallery[3].image,
    alt: gallery[3].alt,
    href: 'https://www.traviator.in/tours/ladakh-bike-backpacking-expedition-tour-7-nights-8-days-170184',
    description: 'A high-altitude ride through the landscapes and quiet roads of Ladakh.',
  },
  {
    id: 'spiti',
    name: 'Spiti Backpacking Expedition',
    location: 'Himachal Pradesh, India',
    duration: '7 nights · 8 days',
    price: '₹22,999',
    category: 'india',
    mode: 'backpacking',
    image: gallery[4].image,
    alt: gallery[4].alt,
    href: 'https://www.traviator.in/tours/spiti-backpacking-expedition-7-nights-8-days-chandigarh-to-chandigarh-167637',
    description: 'A road-and-trail expedition into the stark beauty of the Trans-Himalaya.',
  },
  {
    id: 'bhutan',
    name: 'Bhutan Bike & Backpacking Trip',
    location: 'Bhutan',
    duration: '7 nights · 8 days',
    price: '₹43,999',
    category: 'international',
    mode: 'bike',
    image: gallery[0].image,
    alt: 'Mountain landscape from a Traviator Himalayan expedition',
    href: 'https://www.traviator.in/tours/bhutan-bike-backpacking-trip-7-nights-8-days',
    description: 'Cross into the Himalaya for a journey shaped by mountain roads and local life.',
  },
  {
    id: 'sikkim',
    name: 'Sikkim Mountain Expedition',
    location: 'Sikkim, India',
    duration: '7 nights · 8 days',
    price: '₹44,999',
    category: 'india',
    mode: 'bike',
    image: gallery[2].image,
    alt: 'A Traviator traveller taking in a remote mountain landscape',
    href: 'https://www.traviator.in/tours/sikkim-mountain-expedition-bike-backpacking-edition-7-nights-8-days',
    description: 'A mountain expedition combining the freedom of the ride with time on foot.',
  },
  {
    id: 'nagaland',
    name: 'Hornbill Festival Nagaland',
    location: 'Nagaland, India',
    duration: '6 nights · 7 days',
    price: '₹55,000',
    category: 'india',
    mode: 'culture',
    image: gallery[1].image,
    alt: 'A shared moment from a Traviator journey in India',
    href: 'https://www.traviator.in/tours/nagaland-bike-and-backpacking-expedition-6n-7d-170286',
    description: 'A festival-season journey into Nagaland and its living cultural traditions.',
  },
  {
    id: 'vietnam',
    name: 'Vietnam Escapades',
    location: 'Vietnam',
    duration: '7 nights · 8 days',
    price: 'Enquire',
    category: 'international',
    mode: 'backpacking',
    image: gallery[5].image,
    alt: 'A Traviator group exploring a destination together',
    href: 'https://www.traviator.in/tours/vietnam-escapades-6-nights-7-days',
    description: 'An international escape made for curious travellers and unhurried discovery.',
  },
  {
    id: 'bali',
    name: 'The Bali Adventure',
    location: 'Bali, Indonesia',
    duration: '7 nights · 8 days',
    price: 'Enquire',
    category: 'international',
    mode: 'backpacking',
    image: gallery[2].image,
    alt: gallery[2].alt,
    href: 'https://www.traviator.in/tours/the-bali-adventure-7-nights-8-days',
    description: 'A week of island discovery, from the well-loved coast to quieter corners.',
  },
  {
    id: 'tawang',
    name: 'Tawang Bike Trip & Backpacking Expedition',
    location: 'Tawang, India',
    duration: '8 nights · 9 days',
    price: '₹37,999',
    category: 'india',
    mode: 'bike',
    image: gallery[0].image,
    alt: 'A remote Himalayan landscape on a Traviator expedition',
    href: 'https://www.traviator.in/tours/tawang-bike-trip-and-backpacking-expedition',
    description: 'A long-road expedition through the dramatic landscapes of Arunachal Pradesh.',
  },
];

export const destinations = [
  {
    name: 'Ladakh',
    region: 'India · Himalaya',
    image: gallery[3].image,
    alt: gallery[3].alt,
    tourId: 'ladakh',
    note: 'High roads. Wide skies. The kind of silence that stays with you.',
  },
  {
    name: 'Spiti Valley',
    region: 'India · Himachal Pradesh',
    image: gallery[4].image,
    alt: gallery[4].alt,
    tourId: 'spiti',
    note: 'A raw, open landscape best met slowly, one mountain pass at a time.',
  },
  {
    name: 'Bali',
    region: 'Indonesia · Island journeys',
    image: gallery[2].image,
    alt: gallery[2].alt,
    tourId: 'bali',
    note: 'Find the quieter island beyond the familiar postcard.',
  },
  {
    name: 'Sikkim',
    region: 'India · Eastern Himalaya',
    image: gallery[0].image,
    alt: 'A mountain scene from Traviator’s published expedition gallery',
    tourId: 'sikkim',
    note: 'Green valleys, high passes and a new horizon around every bend.',
  },
  {
    name: 'Bhutan',
    region: 'Himalaya · International',
    image: gallery[1].image,
    alt: 'A moment from a Traviator journey across India and the Himalaya',
    tourId: 'bhutan',
    note: 'A mountain kingdom made for taking the scenic route.',
  },
];

export const stories = [
  {
    date: '04 July, 2026',
    title: "Backpacker's Guide to Spiti Valley",
    href: 'https://www.traviator.in/bike-or-backpacking-expedition',
  },
  {
    date: '19 June, 2026',
    title: 'Best Time to Plan a Bike & Backpacking Expedition for Ladakh',
    href: 'https://www.traviator.in/bike-or-backpacking-expedition',
  },
  {
    date: '16 June, 2026',
    title: 'Best Time to Plan a Spiti Valley Bike & Backpacking Expedition',
    href: 'https://www.traviator.in/bike-or-backpacking-expedition',
  },
];

export const testimonials = [
  {
    quote:
      'Our Bali trip with Traviator was truly exceptional. Every detail was perfectly planned, and the itinerary curated by Akanksh gave us the best of Bali: from stunning beaches to hidden cultural gems.',
    trip: 'Bali · 2022',
  },
  {
    quote:
      'Traviator exceeded my expectations with their Spiti Valley bike expedition. Akanksh’s expertise and deep understanding of the region made the journey memorable.',
    trip: 'Spiti Valley Bike Expedition · 2018',
  },
  {
    quote:
      'From jumping out of a plane to exploring the streets and night life of Bangkok and the beauty of Chiang Rai, this trip customized by Traviator was one of the most thrilling and memorable trips I’ve ever taken.',
    trip: 'Thailand · 2024',
  },
];