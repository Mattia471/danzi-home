import { BedDouble, BriefcaseBusiness, CookingPot, House, Snowflake, Sun, Users, Wifi } from 'lucide-react';

export const property = {
  name: "D'Anzi House",
  subtitle: 'Gemelli · San Pietro · Roma',
  address: 'Via Dego 4, 00168 Roma RM',
  phone: '+39 351 7848043',
  guests: 4,
  bedrooms: 1,
  beds: 2,
  bathrooms: 1,
  terraceSqm: 90,
  rating: 4.98,
  reviews: 60,
  airbnbUrl: 'https://www.airbnb.com/rooms/45221077',
};

export const amenities = [
  { icon: Users, label: 'Fino a 4 ospiti' },
  { icon: BedDouble, label: 'Letto king 180×200' },
  { icon: House, label: 'Intero appartamento' },
  { icon: Sun, label: 'Terrazza privata 90 m²' },
  { icon: CookingPot, label: 'Cucina attrezzata' },
  { icon: Wifi, label: 'Wi-Fi' },
  { icon: BriefcaseBusiness, label: 'Postazione di lavoro' },
  { icon: Snowflake, label: 'Climatizzazione' },
];

export const audiences = [
  {
    title: 'Per chi è vicino al Gemelli',
    text: 'Una base tranquilla e autonoma per pazienti, accompagnatori e familiari che devono trascorrere qualche giorno o un periodo più lungo a Roma.',
  },
  {
    title: 'Per professionisti sanitari',
    text: 'Spazi veri in cui rientrare dopo il lavoro, Wi-Fi, cucina, area relax e una posizione comoda per gli spostamenti quotidiani.',
  },
  {
    title: 'Per studio e università',
    text: 'Una casa confortevole per studenti, specializzandi e visiting student che cercano indipendenza, connessione e servizi a portata di mano.',
  },
];

export const gallery = [
  { src: '/images/terrace-demo.webp', alt: "Terrazza di D'Anzi House - immagine demo", label: 'La terrazza' },
  { src: '/images/living-demo.webp', alt: "Soggiorno di D'Anzi House - immagine demo", label: 'Living' },
  { src: '/images/bedroom-demo.webp', alt: "Camera di D'Anzi House - immagine demo", label: 'Camera' },
  { src: '/images/kitchen-demo.webp', alt: "Cucina di D'Anzi House - immagine demo", label: 'Cucina' },
  { src: '/images/bathroom-demo.webp', alt: "Bagno di D'Anzi House - immagine demo", label: 'Bagno' },
];
