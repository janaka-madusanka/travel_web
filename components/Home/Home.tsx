import React from 'react'
import Head from 'next/head'
import Hero from './Hero/Hero'
import RoomCarousel from './RoomCarousel/RoomCarousel'
import PlacesYouCantMiss from './PlaceYouCantMiss/PlacesYouCantMiss'
import CoveredSection from './CoverwsSection/CoveredSection'
import AboutSection from './AboutSection/AboutSection'
import NewsletterSignup from './NewsletterSignup/NewsletterSignup'

const Home = () => {
  return (
    <div className='overflow-hidden'>
      {/* SEO Meta Tags */}
      <Head>
        <title>Scenic Cottage Sigiriya - Best Hotel Near Sigiriya Rock & Dambulla</title>
        <meta 
          name="description" 
          content="Scenic Cottage Sigiriya – your perfect getaway near Sigiriya Rock and Dambulla. Low-budget and luxury rooms, scenic views, local guides, safe and comfortable stays, and exclusive offers for your Sri Lanka trip." 
        />
        <meta 
          name="keywords" 
          content="
          Sigiriya hotel, best hotel Sigiriya, Sigiriya Dambulla accommodation, hotel near Sigiriya Rock, hotel near Dambulla, Sri Lanka hotel, 
          low budget hotel Sri Lanka, cheap hotels Sigiriya, affordable hotel Sigiriya, budget stay Sigiriya, 
          luxury hotel Sri Lanka, 5 star hotel Sri Lanka, hotel with scenic view Sigiriya, top rated hotel Sigiriya,
          hotel booking Sri Lanka, book hotel Sigiriya, online hotel booking Sri Lanka, Agoda Sri Lanka, Expedia Sri Lanka, Booking.com Sri Lanka,
          Shangri-La Sri Lanka, Cinnamon Grand, Cinnamon Lakeside, hotel deals Sigiriya, last minute hotel Sigiriya,
          best cabana Sigiriya, Sigiriya family hotel, hotel near Sigiriya Rock entrance, hotels near Pidurangala Rock, Sigiriya tourism stay, 
          hotels near Dambulla Cave Temple, Sigiriya nature hotel, boutique hotel Sigiriya, stay in Sigiriya, 
          romantic hotel Sigiriya, honeymoon hotel Sri Lanka, hotel with breakfast Sigiriya, pet friendly hotel Sigiriya
          " 
        />
        <link rel="canonical" href="https://www.sceniccottage.com/" />

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              "name": "Scenic Cottage Sigiriya",
              "image": [
                "https://www.sceniccottage.com/logo.png",
                "https://www.sceniccottage.com/rooms/deluxe-room.jpg",
                "https://www.sceniccottage.com/rooms/family-room.jpg"
              ],
              "description": "Scenic Cottage Sigiriya – peaceful cabana hotel near Sigiriya Rock and Dambulla, offering comfort, warm Sri Lankan hospitality, low-budget and luxury rooms, and local experiences.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Sigiriya Road, Inamaluwa",
                "addressLocality": "Sigiriya",
                "postalCode": "21124",
                "addressCountry": "LK"
              },
              "telephone": "+94740558858",
              "url": "https://www.sceniccottage.com",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 7.9569,
                "longitude": 80.7608
              },
              "priceRange": "$$",
              "checkinTime": "14:00",
              "checkoutTime": "12:00",
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Breakfast included", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Guide support", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Vehicle rental support", "value": true }
              ]
            })
          }}
        />
      </Head>

      {/* Page Content */}
      <Hero />
      <RoomCarousel />
      <PlacesYouCantMiss />
      <CoveredSection />
      <AboutSection />
      <NewsletterSignup />
    </div>
  )
}

export default Home
