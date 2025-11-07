// ✅ Define Place Type
export interface Place {
  id: number;
  name: string;
  image: string;
  lat: number;
  lng: number;
}

// ✅ Destination Data
export const destinationData = [
  {
    id: 1,
    image: "/images/D1.jpg",
    country: "France",
    travelers: "150,000",
  },
  {
    id: 2,
    image: "/images/D2.jpg",
    country: "USA",
    travelers: "250,000",
  },
  {
    id: 3,
    image: "/images/D3.jpg",
    country: "Italy",
    travelers: "180,000",
  },
  {
    id: 4,
    image: "/images/D4.jpg",
    country: "Japan",
    travelers: "200,000",
  },
  {
    id: 5,
    image: "/images/D5.jpg",
    country: "Australia",
    travelers: "120,000",
  },
  {
    id: 6,
    image: "/images/D6.jpg",
    country: "Canada",
    travelers: "175,000",
  },
  {
    id: 7,
    image: "/images/D7.jpg",
    country: "Germany",
    travelers: "160,000",
  },
];

// ✅ Room Data
export const hotelsData = [
  {
    id: 1,
    image: "/images/Rooms/R1.png",
    name: "The Grand London Resort and Spa",
    location: "Westminster, London",
    rating: 4.6,
    reviews: "2,345",
    price: "72",
  },
  {
    id: 2,
    image: "/images/Rooms/R2.png",
    name: "Barcelona City Suites Deluxe Room",
    location: "Ciutat Vella, Barcelona",
    rating: 4.7,
    reviews: "1,912",
    price: "85",
  },
  {
    id: 3,
    image: "/images/Rooms/R3.png",
    name: "Times Square Premium Stay Hotel",
    location: "Manhattan, New York",
    rating: 4.9,
    reviews: "3,420",
    price: "95",
  },
  {
    id: 4,
    image: "/images/Rooms/R4.png",
    name: "Hilton Roma Luxury Hotel Palace",
    location: "Vaticano Prati, Rome",
    rating: 4.5,
    reviews: "2,876",
    price: "68",
  },
  {
    id: 5,
    image: "/images/Rooms/R5.png",
    name: "Hilton Roma Luxury Hotel Palace",
    location: "Vaticano Prati, Rome",
    rating: 4.5,
    reviews: "2,876",
    price: "68",
  },
];

// ✅ Places to Visit 
export const placesToVisit: Place[] = [
  {
    id: 1,
    name: "Pidurangala Rock",
    image: "/images/Places/pidurangala.jpg",
    lat: 7.85,
    lng: 80.75,
  },
  {
    id: 2,
    name: "Minneriya National Park",
    image: "/images/Places/minneriya.jpg",
    lat: 8.033,
    lng: 80.819,
  },
  {
    id: 3,
    name: "Dambulla Cave Temple",
    image: "/images/Places/dambulla.jpg",
    lat: 7.85,
    lng: 80.65,
  },
  {
    id: 4,
    name: "Polonnaruwa Ancient City",
    image: "/images/Places/polonnaruwa.jpg",
    lat: 7.95,
    lng: 81.003,
  },
  {
    id: 5,
    name: "Kaudulla National Park",
    image: "/images/Places/kaudulla.jpg",
    lat: 8.1,
    lng: 80.95,
  },
  {
    id: 6,
    name: "Ritigala Forest Monastery",
    image: "/images/Places/ritigala.jpg",
    lat: 8.133,
    lng: 80.667,
  },
];


// ✅ About Section Image Grid Data
export const aboutImages = [
  { 
    id: 1, 
    image: "/images/About/Sigiriya.jpeg" 
  },
  { 
    id: 2, 
    image: "/images/About/dambulla.jpg "  
  },
  { 
    id: 3, 
    image: "/images/About/pidurangala.jpg"  
  },
  { 
    id: 4, 
    image: "/images/About/kaudulla.jpg"  
  },
  { 
    id: 5, 
    image: "/images/About/Lion.jpg" 
  },
  { 
    id: 6, 
    image: "/images/About/minneriya.jpg"  
  },
  { 
    id: 7, 
    image: "/images/About/polonnaruwa.jpg" 
  },
  { 
    id: 8, 
    image: "/images/About/ritigala.jpg" 
  },
];

export const NewslwtterSignup = [
  { 
    id: 1, 
    image: "/images/scenic.png" 
  },];