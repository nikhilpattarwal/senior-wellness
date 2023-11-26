// ContactDoctorPage.js

import React, { useState, useEffect, useRef } from 'react';
import styles from "./doctor.module.css"; 
import {  MdCheckCircle, MdCancel } from 'react-icons/md';
import { IoCallSharp } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
const doctorsData = [
  { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', available: true },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Pediatrician', available: false },
  { id: 4, name: 'Dr. Emily Davis', specialty: 'Orthopedic Surgeon', available: false },
  { id: 5, name: 'Dr. William Wilson', specialty: 'Neurologist', available: true },
  { id: 6, name: 'Dr. Olivia Brown', specialty: 'Ophthalmologist', available: false },
  { id: 7, name: 'Dr. Benjamin Miller', specialty: 'Gastroenterologist', available: true },
  { id: 8, name: 'Dr. Sophia Anderson', specialty: 'Psychiatrist', available: false },
  { id: 9, name: 'Dr. Ethan Taylor', specialty: 'Endocrinologist', available: true },
];

const ContactDoctorPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [contactOptionsVisible, setContactOptionsVisible] = useState(false);
  const contactOptionsRef = useRef(null);

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
    setContactOptionsVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactOptionsRef.current && !contactOptionsRef.current.contains(event.target)) {
        setContactOptionsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h2>Contact Doctor</h2>
      <div className={styles.doctorList}>
        {doctorsData.map((doctor) => (
          <div
            key={doctor.id}
            className={`${styles.doctor} ${
              selectedDoctor && selectedDoctor.id === doctor.id ? styles.selected : ''
            }`}
            onClick={() => handleDoctorSelection(doctor)}
          >
            <span>{doctor.name}</span>
            <span>{doctor.specialty}</span>
            {doctor.available ? (
             <MdCheckCircle style={{ color: 'green', fontSize: '1.5rem' }} />
            ) : (
                <MdCancel style={{ color: '#f44336', fontSize: '1.5rem' }} />
            )}
          </div>
        ))}
      </div>
      {selectedDoctor && contactOptionsVisible && (
        <div className={styles.contactOptions} ref={contactOptionsRef}>
          <div className={styles.optionContainer}>
            <IoCallSharp className={styles.icon} />
            <span>Call {selectedDoctor.name}</span>
          </div>
          <div className={styles.optionContainer}>
            <FaMessage className={styles.icon} />
            <span>Message {selectedDoctor.name}</span>
          </div>
          <div className={styles.optionContainer}>
            <span>Email {selectedDoctor.name}</span>
          </div>
          <div className={styles.optionContainer}>
            <span>Book Appointment</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDoctorPage;
