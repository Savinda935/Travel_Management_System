import React from "react";
import { Link } from "react-router-dom";
import colombo from "../images/colombo.jpg";
import yala2 from "../images/yala2.jpg";
import pinnawala from "../images/pinnawala.jpeg";
import carousel from "../images/carousel.jpg";
import galla from "../images/galla.jpeg";
import kandy from "../images/kandy.jpg";
import nuwaraealiya from "../images/nuwaraealiya.jpeg";
import wilpaththu from "../images/wilpaththu.jpeg";
import anuradhapura from "../images/anuradhapura.jpg";
import ealla from "../images/ealla.jpg";
import culturalcard from "../images/culturalcard.jpg";
import arugambe from "../images/arugambe.jpeg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import guidebc from "../images/guidebc.jpg";



const GuideCard = ({ guide }) => {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    margin: "16px",
    maxWidth: "300px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    borderRadius: "8px",
    objectFit: "cover",
  };

  const profileContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
  };

  const profileImageStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "8px",
    objectFit: "cover",
  };

  const nameStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0",
    display: "inline-block",
  };

  const descriptionStyle = {
    color: "#555",
    fontSize: "14px",
    margin: "8px 0",
  };

  const priceStyle = {
    fontWeight: "bold",
    color: "#333",
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "8px",
  };

  // Conditional wrapper: If the guide has a link, wrap the card with <Link> without underlining
  const Wrapper = guide.link
    ? ({ children }) => <Link to={guide.link} style={{ textDecoration: 'none' }}>{children}</Link>
    : ({ children }) => <>{children}</>;

  return (
    <Wrapper>
      <div style={cardStyle}>
        <img src={guide.image} alt={guide.name} style={imageStyle} />
        <div style={profileContainerStyle}>
          <img src={guide.profileImage} alt="profile" style={profileImageStyle} />
          <div style={nameStyle}>{guide.name}</div>
        </div>
        <div style={descriptionStyle}>{guide.description}</div>
        <div style={priceStyle}>Guide Rate: ${guide.rate} (USD)</div>
        <button style={buttonStyle}>Book Now</button>
      </div>
    </Wrapper>
  );
};


const GuideBookingPage = () => {
  const guides = [
    {
      name: "Nimal D.",
      description: "Shore Excursion to Pinnawala Elephant's Orphanage - 6 hours.",
      image: pinnawala,
      profileImage: "https://via.placeholder.com/50",
      rate: 100,
      link: "/pinnawalaboking", // Pinnawala link added
      
    },
    {
      name: "Saman",
      description: "Private Tour of Colombo City - Modern history in 8 hours.",
      image: colombo,
      profileImage: "https://via.placeholder.com/50",
      rate: 120,
    },
    {
      name: "Kumara",
      description: "Yala National Park Safari - Wild safari adventure.",
      image: yala2,
      profileImage: "https://via.placeholder.com/50",
      rate: 110,
    },
    {
      name: "Perera D.",
      description: "Sigiriya Rock Fortress Tour - Discover the ancient fortress.",
      image: carousel,
      profileImage: "https://via.placeholder.com/50",
      rate: 130,
    },
    {
      name: "Prageeth",
      description: "Galle Fort and Beach Tour - Explore historic Galle Fort.",
      image: galla,
      profileImage: "https://via.placeholder.com/50",
      rate: 140,
    },
    {
      name: "Nimesha",
      description: "Kandy City Highlights Tour - Temple of the Tooth and more.",
      image: kandy,
      profileImage: "https://via.placeholder.com/50",
      rate: 90,
    },
    {
      name: "Silruwan",
      description: "Nuwara Eliya Tea Plantation Tour - Visit lush tea estates.",
      image: nuwaraealiya,
      profileImage: "https://via.placeholder.com/50",
      rate: 100,
    },
    {
      name: "Dinuwan",
      description: "Wilpattu National Park Safari - Discover the diverse wildlife and serene nature.",
      image: wilpaththu,
      profileImage: "https://via.placeholder.com/50",
      rate: 150,
    },
    {
      name: "Prasad",
      description: "Explore Anuradhapura's ancient city and witness its cultural landmarks.",
      image: anuradhapura,
      profileImage: "https://via.placeholder.com/50",
      rate: 140,
    },
    {
      name: "Nelum",
      description: "Dambulla Cave Temple tour - A cultural journey into Sri Lanka's ancient heritage.",
      image: culturalcard,
      profileImage: "https://via.placeholder.com/50",
      rate: 120,
    },
    {
      name: "Nawarathna",
      description: "Ella Adventure Tour - Hike Little Adam's Peak and visit Nine Arches Bridge.",
      image: ealla,
      profileImage: "https://via.placeholder.com/50",
      rate: 170,
    },
    {
      name: "Peeris",
      description: "Arugam Bay Surf Tour - Perfect waves and serene beaches for surf lovers.",
      image: arugambe,
      profileImage: "https://via.placeholder.com/50",
      rate: 200,
    },
  ];

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "16px",
  };

  return (
    <div>
      <Header />
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          backgroundImage: `url(${guidebc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          padding: "40px",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Guide Booking Page
      </h1>
      <div style={containerStyle}>
        {guides.map((guide, index) => (
          <GuideCard key={index} guide={guide} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default GuideBookingPage;
