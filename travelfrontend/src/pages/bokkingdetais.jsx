import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dt from "../images/dt.jpg";

const BookingDetailsPage = () => {
  const [bookings, setBookings] = useState([]); // State to hold the list of bookings
  const [bookingStatus, setBookingStatus] = useState(""); // State to store booking update/delete status
  const [isConfirmDelete, setIsConfirmDelete] = useState(false); // State for delete confirmation
  const [updatedBooking, setUpdatedBooking] = useState(null); // For storing the updated booking details
  const [showPopup, setShowPopup] = useState(false); // State to control pop-up visibility
  const navigate = useNavigate();

  // Fetch all bookings
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch("http://localhost:8081/Guide/");
        if (!response.ok) {
          throw new Error("Error fetching bookings");
        }
        const data = await response.json();
        setBookings(data); // Set the list of bookings
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookingStatus("An error occurred while fetching bookings.");
      }
    };

    fetchBookingDetails();
  }, []);

  // Handle the update form submission
  const handleUpdateSubmit = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/Guide/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBooking),
      });

      if (response.ok) {
        setBookingStatus("Booking updated successfully!");
        setTimeout(() => setBookingStatus(""), 3000);
        setUpdatedBooking(null);
        setShowPopup(true);
      } else {
        setBookingStatus("Failed to update booking.");
      }
    } catch (error) {
      setBookingStatus("An error occurred while updating the booking.");
      console.error("Error:", error);
    }
  };

  // Delete booking
  const handleDeleteBooking = async (id) => {
    if (!isConfirmDelete) {
      setIsConfirmDelete(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/Guide/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBookingStatus("Booking deleted successfully!");
        setBookings(bookings.filter((booking) => booking._id !== id));
        setIsConfirmDelete(false);
        setShowPopup(true);
      } else {
        setBookingStatus("Failed to delete booking.");
      }
    } catch (error) {
      setBookingStatus("An error occurred while deleting the booking.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
         <Header/>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <p style={{ margin: 0 }}>{bookingStatus || "Operation completed successfully!"}</p>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              marginTop: "10px",
              background: "#007bff",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
      {bookings.length > 0 ? (
        <div>
        <h2
  style={{
    marginBottom: "20px",
    color: "#fff", // Adjust text color for contrast
    textAlign: "center", // Center-align the text
    padding: "50px 20px", // Add padding for better spacing
    borderRadius: "8px", // Optional: Add rounded corners
    backgroundImage: `url(${dt})`, // Set the background image
    backgroundSize: "cover", // Ensure the image covers the element
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat", // Prevent the image from repeating
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for depth
    width: "100%", // Occupy the full width of the parent container
    height: "300px", // Set the height to make it visually prominent
    display: "flex", // Align the text within the container
    alignItems: "center", // Vertically center the text
    justifyContent: "center", // Horizontally center the text
  }}
>
  Booking Details
</h2>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              {updatedBooking && updatedBooking._id === booking._id ? (
                <div>
                  <p><strong>Party Size:</strong></p>
                  <input
                    type="number"
                    value={updatedBooking.partysize}
                    onChange={(e) =>
                      setUpdatedBooking({ ...updatedBooking, partysize: e.target.value })
                    }
                    style={{
                      padding: "5px",
                      marginBottom: "10px",
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <p><strong>Tour Date:</strong></p>
                  <input
                    type="date"
                    value={updatedBooking.tourdate}
                    onChange={(e) =>
                      setUpdatedBooking({ ...updatedBooking, tourdate: e.target.value })
                    }
                    style={{
                      padding: "5px",
                      marginBottom: "10px",
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <p><strong>Start Time:</strong></p>
                  <input
                    type="time"
                    value={updatedBooking.time}
                    onChange={(e) =>
                      setUpdatedBooking({ ...updatedBooking, time: e.target.value })
                    }
                    style={{
                      padding: "5px",
                      marginBottom: "10px",
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <button
                    onClick={() => handleUpdateSubmit(booking._id)}
                    style={{
                      background: "#007bff",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Submit Update
                  </button>
                  <button
                    onClick={() => setUpdatedBooking(null)}
                    style={{
                      background: "#dc3545",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p><strong>Party Size:</strong> {booking.partysize}</p>
                  <p><strong>Tour Date:</strong> {booking.tourdate}</p>
                  <p><strong>Start Time:</strong> {booking.time}</p>
                  <button
                    onClick={() => setUpdatedBooking(booking)}
                    style={{
                      background: "#007bff",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Update Booking
                  </button>
                  <button
                    onClick={() => handleDeleteBooking(booking._id)}
                    style={{
                      background: "#dc3545",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "4px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {isConfirmDelete ? "Are you sure?" : "Delete Booking"}
                  </button>
                  <button
                    onClick={() => setShowPopup(true)}
                    style={{
                      background: "#28a745",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "4px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={() => navigate("/")}
            style={{
              background: "#28a745",
              color: "#fff",
              padding: "10px",
              borderRadius: "4px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          >
            Confirm My Details
          </button>
        </div>
      ) : (
        <p>Loading bookings...</p>
      )}
        <Footer />
    </div>
    
  );
};

export default BookingDetailsPage;
