// path: data/rooms.ts
import { HotelRoom } from "./data"; 

export const roomsData: HotelRoom[] = [
  {
    id: 1,
    image: [
      "/images/Rooms/IMG_9872.JPG",
      "/images/Rooms/IMG_9891.JPG",
      "/images/Rooms/IMG_9887.JPG",
    ],
    name: "Deluxe Double Room",
    price: "72",
    beds: "1 Twin Bed",
    size: "190 sq ft",
    capacity: 2,
    features: [ 
      "Air Conditioning", 
      "Ensuite Bathroom",
      "Balcony",
      "Garden View",
      "Work Desk", 
      "Private Balcony", 
      "Drying Rack for Clothes", 
      "Tea/Coffee Maker"
    ],
    description: "Experience the ultimate comfort in our Deluxe Double Room. Surrounded by nature, this room features a spacious twin bed, modern amenities, and a private balcony overlooking the lush greenery.",
  },
  {
    id: 2,
    image: [
      "/images/Rooms/IMG_9916.JPG",
      "/images/Rooms/IMG_9911.JPG",
      "/images/Rooms/IMG_9934.JPG",
    ],
    name: "Deluxe Triple Room",
    price: "85",
    beds: "1 King Bed & 1 Queen Bed",
    size: "250 sq ft",
    capacity: 3,
    features: [
      "Air Conditioning",
      "Ensuite Bathroom",
      "Balcony", 
      "TV",
      "Dining Area", 
      "Seating Area", 
      "Ironing Facilities", 
      "Tea/Coffee Maker"
    ],
    description: "Perfect for small families or friends, the Triple Room offers ample space and comfort. Enjoy your morning coffee on the private balcony while listening to the birds of Sigiriya.",
  },
  {
    id: 3,
    image: [
      "/images/Rooms/IMG_9896.JPG",
      "/images/Rooms/IMG_9898.JPG",
      "/images/Rooms/IMG_9899.JPG",
    ],
    name: "Deluxe Family Room",
    price: "95",
    beds: "2 King Beds",
    size: "220 sq ft",
    capacity: 4,
    features: [
      "Air Conditioning", 
      "Ensuite Bathroom", 
      "Dining Area",
      "Blackout Curtains", 
      "Bathtub", 
      "Dying Rack for Clothes", 
      "TV",
      "Tea/Coffee Maker"
    ],
    description: "Our spacious Family Room is designed for togetherness. With two king sized beds and a cozy seating area, it's the perfect base for your family adventures in the cultural triangle.",
  },
  {
    id: 4,
    image: [
      "/images/Rooms/IMG_9985.JPG",
      "/images/Rooms/IMG_9976.JPG",
      "/images/Rooms/IMG_9978.JPG",
    ],
    name: "Triple Room with Garden View",
    price: "68",
    beds: "1 Twin Bed & 1 Queen Bed",
    size: "240 sq ft",
    capacity: 3,
    features: [
      "Air Conditioning", 
      "Ensuite Bathroom",
      "Garden View",
      "Seating Area",
      "Drying Rack for Clothes",
      "Wake-up Service",
      "TV",
      "Tea/Coffee Maker"
    ],
    description: "Wake up to the sight of our beautifully landscaped gardens. This room offers individual beds for travelers who value their own space, along with easy access to the pool.",
  },
  {
    id: 5,
    image: [
      "/images/Rooms/IMG_9964.JPG",
      "/images/Rooms/R2.png",
      "/images/Rooms/R3.png",
    ],
    name: "Double Room with Garden View",
    price: "68",
    beds: "1 Queen Bed",
    size: "240 sq ft",
    capacity: 2,
    features: [
      "Air Conditioning", 
      "Ensuite Bathroom",
      "Garden View",
      "Seating Area",
      "Drying Rack for Clothes",
      "Wake-up Service",
      "TV",
      "Tea/Coffee Maker"
    ],
    description: "A cozy retreat for couples. This ground-floor room opens directly onto the garden, offering a seamless blend of indoor luxury and outdoor serenity.",
  },
];