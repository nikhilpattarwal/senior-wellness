
import React, { useState, useEffect, useRef } from 'react';
import styles from './volunteer.module.css'; // Import your stylesheet
import { MdPhone, MdMessage, MdCheckCircle, MdCancel } from 'react-icons/md';
import { IoCallSharp } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";

const volunteersData = [
  { id: 1, name: 'John Doe', available: true },
  { id: 2, name: 'Jane Smith', available: false },
  { id: 3, name: 'Bob Johnson', available: true },
  { id: 4, name: 'Bob Johnson', available: true },
  { id: 5, name: 'Bob Johnson', available: false },
  { id: 6, name: 'Bob Johnson', available: true },
  { id: 7, name: 'Bob Johnson', available: false },
  { id: 8, name: 'Bob Johnson', available: true },
  { id: 9, name: 'Bob Johnson', available: false },
  { id: 10, name: 'Bob Johnson', available: true },
  { id: 11, name: 'Bob Johnson', available: false },
  { id: 12, name: 'Bob Johnson', available: true },
];

const VolunteerContactPage = () => {
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [contactIconsVisible, setContactIconsVisible] = useState(false);
    const contactIconsRef = useRef(null);
  
    const handleVolunteerSelection = (volunteer) => {
      setSelectedVolunteer(volunteer);
      setContactIconsVisible(true);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (contactIconsRef.current && !contactIconsRef.current.contains(event.target)) {
          setContactIconsVisible(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <div className={styles.mainContainer}>
        <h2>Contact Volunteer</h2>
        <div className={styles.volunteerList}>
          {volunteersData.map((volunteer) => (
            <div
              key={volunteer.id}
              className={`${styles.volunteer} ${
                selectedVolunteer && selectedVolunteer.id === volunteer.id ? styles.selected : ''
              }`}
              onClick={() => handleVolunteerSelection(volunteer)}
            >
              <span>{volunteer.name}</span>
              <IoCallSharp className={styles.call} />
              <FaMessage className={styles.message} />
              {volunteer.available ? (
                <MdCheckCircle className={styles.availableIcon} />
              ) : (
                <MdCancel className={styles.unavailableIcon} />
              )}
            </div>
          ))}
        </div>
        {selectedVolunteer && contactIconsVisible && (
          <div className={styles.contactIcons} ref={contactIconsRef}>
            <div className={styles.iconContainer}>
              <MdPhone className={styles.icon} />
              <span>Call {selectedVolunteer.name}</span>
            </div>
            <div className={styles.iconContainer}>
              <MdMessage className={styles.icon} />
              <span>Message {selectedVolunteer.name}</span>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default VolunteerContactPage;