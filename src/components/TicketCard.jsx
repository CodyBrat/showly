import { useState, useEffect } from 'react';
import Lanyard from './Lanyard';
import '../styles/TicketCard.css';

export default function TicketCard({ bookingData, onClose }) {
  const [showLanyard, setShowLanyard] = useState(false);
  
  useEffect(() => {
    // Show the lanyard with a slight delay for better visual effect
    const timer = setTimeout(() => {
      setShowLanyard(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) 
      ? date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
      : dateString; // Fallback to the original string if parsing fails
  };

  return (
    <div className="ticket-card-overlay">
      <div className="ticket-card-container">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="lanyard-container">
          {showLanyard && <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} bookingData={bookingData} />}
        </div>
      </div>
    </div>
  );
} 