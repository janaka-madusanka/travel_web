// path: data/serviceImageGrid.ts

export const serviceGridData = [
  {
    id: 1,
    image: "/images/Services/IMG_9962.jpg", 
    alt: "Comfortable Accomadation",
    span: "col-span-1 md:col-span-2 row-span-2", 
  },
  {
    id: 2,
    image: "/images/Services/scenic cottage entrance.jpg",
    alt: "Entrance to Our Haven",
    span: "col-span-1", 
  },
  {
    id: 3,
    image: "/images/Services/IMG_9928.jpg",
    alt: "Ensuite Bathrooms",
    span: "col-span-1 row-span-2", 
  },
  // ✅ NEW TEXT ITEM (Placed here to likely fall into Col 3, Row 2)
  {
    id: 7,
    type: "text", // Mark this as text
    text: "Visit us, create a Scenic moment that lasts a lifetime.",
    span: "col-span-1", 
    bgColor: "bg-orange-500", // Optional: specific color
  },
  {
    id: 4,
    image: "/images/Services/IMG_0015.jpg",
    alt: "Dining Area",
    span: "col-span-1 md:col-span-2", 
  },
  {
    id: 5,
    image: "/images/Services/scenic cottage pic1.jpg",
    alt: "Greenary Surroundings",
    span: "col-span-1", 
  },
  {
    id: 6,
    image: "/images/Services/IMG_9890.jpg",
    alt: "Perfect Coffee Moments",
    span: "col-span-1", 
  },
];