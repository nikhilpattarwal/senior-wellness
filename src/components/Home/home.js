import React from 'react'
import styles from "./home.module.css"
import elderlyImage from "../../assets/—Pngtree—medical scene seeing elderly hospital_4045886.png"
import { FaHandsHelping } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { SiGooglemessages } from "react-icons/si";
import { GoPlus } from "react-icons/go";
import { MdVolunteerActivism } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import people from "../../assets/people.png"
import Footer from '../footer/footer';
import { useSelector } from 'react-redux';
import { medicationSelectors } from '../../redux/reducer/medicationReducer';
import { Link } from 'react-router-dom';

const Home = ({value}) => {
  const [name, isAuthenticated] = value;
  const {medication} = useSelector(medicationSelectors);

  const  filteredMedications = medication.filter((item)=>(item?.daysLeft <=5))
  return (
    <>
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.headingAndImage}>
          <div className={styles.nameAndHeading}>
            <h3>welcome <span>{name}</span> </h3>
            <h3>"Empowering Elders: Nurturing Connections, Enriching Lives with Compassionate Support."</h3>
            <div className={styles.appointmentCont}>
              <div className={styles.appoint}>
               <FaHandsHelping className={styles.icon1} />
               <IoCall className={styles.icon2} />
               <SiGooglemessages className={styles.icon3} />
               <h3>Need Help Contact now!</h3>
              </div>
              <div className={styles.people}>
                <img src={people} alt="people" />
                <p>1,600 people requested access a visit in last 24 hours</p>
              </div>
            </div>
          </div>
          <img src={elderlyImage} alt="clinic"/>
        </div>
        <div className={styles.docAndVoln}>
        {isAuthenticated && (
  <div  className={styles.bookVolenContrem}>
    <Link to="/medication" >
    <h3>Medicine Reminder</h3>
    </Link>
    {filteredMedications.length > 0 ? (
      filteredMedications.map((item, i) => (
        <div className={styles.volenrem} key={i}>
          <div className={styles.nameAndNum}>
            <>
              <h3>{item.medicine} - </h3>
              <h4> {item.daysLeft} days Left</h4>
            </>
          </div>
        </div>
      ))
    ) : (
      <div className={styles.nothing}>Nothing to show</div>
    )}
  </div>
)}

          <Link to="/volunteer">
          <div className={styles.bookVolenCont}>
            <div className={styles.volen}>
              <h3>Contact volunteer</h3>
              
              <MdVolunteerActivism className={styles.docandvolIcon} />
              <GoPlus className={styles.addIcon} />
            </div>
          </div>
          </Link>
          <Link to="/doctor">
          <div className={styles.bookVolenCont}>
            <div className={styles.volen}>
              <h3>Contact doctor for consultation</h3>
              <FaUserDoctor className={styles.docandvolIcon}/>
              <GoPlus className={styles.addIcon} />
            </div>
          </div>
          </Link>
        </div>
        <Footer/>
      </div>
    </div>
    </>
  )
}

export default Home