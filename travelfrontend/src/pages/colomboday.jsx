import React, { useState } from "react";
import colombo1 from "../images/colombo1.jpg"; // Adjust the path based on your project structure
import c1 from "../images/c1.jpg";
import colombomap from "../images/colombomap.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios"; 

const ColomboDay = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    contactNo: "", // This is still used for the input field
    contactNumber: "", // Add this for backend compatibility
    arrivalDate: "",
    departureDate: "",
    comment: "",
});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, contactNo, arrivalDate, departureDate } = formData;
    if (!name || !email || !contactNo || !arrivalDate || !departureDate) {
        setMessage("Please fill in all required fields.");
        return;
    }

    const submissionData = {
        ...formData,
        contactNumber: formData.contactNo, // Map frontend field to backend schema
    };

    setIsSubmitting(true);
    setMessage(""); // Reset message

    try {
        console.log("Sending data:", submissionData); // Check the data being sent
        const response = await axios.post("http://localhost:8081/Booking/add", submissionData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Response from backend:", response.data); // Log the response from backend

        if (response.status === 201) {
          setMessage(response.data.message || "Booking submitted successfully.");
          setFormData({
            name: "",
            email: "",
            country: "",
            contactNo: "",
            arrivalDate: "",
            departureDate: "",
            comment: "",
          });
        } else {
          setMessage(response.data.message || "An error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error while submitting:", error); // Debugging: Log any error in the request
        setMessage("An error occurred while submitting the form. Please try again.");
      } finally {
        setIsSubmitting(false); // Reset submitting state
      }
    };
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      padding: "20px",
    },
    header: {
      backgroundImage: `url(${colombo1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      textAlign: "center",
      padding: "100px 20px",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    breadcrumb: {
      color: "#f1c40f",
      fontSize: "1rem",
    },
    mainContent: {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
      marginTop: "20px",
    },
    description: {
      flex: 2,
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    section: {
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    sectionText: {
      lineHeight: "1.6",
    },
    formContainer: {
      flex: 1,
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    formTitle: {
      textAlign: "center",
      fontSize: "1.5rem",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <Header/>
      <header style={styles.header}>
        <h1 style={styles.title}>TOUR PACKAGES</h1>
        <p style={styles.breadcrumb}>HOME / TOUR PACKAGES</p>
      </header>

      <div style={styles.mainContent}>
        <section style={styles.description}>
          <h2 style={styles.sectionTitle}>Colombo Day Tour</h2>
          <img
            src={c1}
            alt="Colombo"
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          />
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Description</h3>
            <p style={styles.sectionText}>
              Meet your guide on arrival at the Colombo Bandaranaike International Airport or
              hotel in the morning or afternoon. The tour will begin in the Fort area of
              Colombo, known for its history during the Portuguese and Dutch times. Later,
              visit the Colombo National Museum, explore Pettah, Cinnamon Gardens, Independence
              Square, and more.
            </p>
          </div>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Included</h3>
            <ul>
              <li>Meet and Assist on Arrival & Departure</li>
              <li>Accommodation & Breakfast at Mentioned Hotels</li>
              <li>Transportation by Air-Conditioned Private Vehicle</li>
              <li>English-Speaking Chauffeur Driver</li>
              <li>Government Taxes & Service Charges</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Excluded</h3>
            <ul>
              <li>Entrance Fees at Visiting Sites</li>
              <li>Air Tickets & Visa</li>
              <li>Lunch & Dinner</li>
              <li>Items of Personal Nature (Laundry, Tipping, etc.)</li>
            </ul>
          </div>

          <div style={styles.section}>
          <h3 style={{ ...styles.sectionTitle, color: "red" }}>Special Offers</h3>
            <ul>
              <li>Welcome Drink After Arrival</li>
              <li>Free WiFi in the Vehicle</li>
              <li>Free Water Bottle in the Vehicle</li>
              <li>Valuable Gift at the End of the Tour</li>
              <li>Free SIM Card</li>
            </ul>
          </div>
        </section>

        <aside style={styles.formContainer}>
          <h3 style={styles.formTitle}>Book This Tour</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter your name"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter your country"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Contact No</label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter contact number"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Arrival Date</label>
              <input
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Comments</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                style={{ ...styles.input, height: "100px", resize: "none" }}
                placeholder="Enter your comments"
              ></textarea>
            </div>
            <button
              type="submit"
              style={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {message && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  borderRadius: "5px",
                  textAlign: "center",
                  color: message.includes("successfully")
                    ? "#155724"
                    : "#721c24",
                  backgroundColor: message.includes("successfully")
                    ? "#d4edda"
                    : "#f8d7da",
                  border: message.includes("successfully")
                    ? "1px solid #c3e6cb"
                    : "1px solid #f5c6cb",
                }}
              >
                {message}
              </div>           
 )}


 
<section style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
}}>
  <img
    src={require("../images/colombomap.png")}
    alt="Colombo Map"
    style={{
      width: "100%",
      maxWidth: "600px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    }}
  />
</section>
           
          </form>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default ColomboDay;
