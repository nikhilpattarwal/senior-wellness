
import { useEffect, useState,useCallback } from "react";
import styles from "./medication.module.css"
import { medicationSelectors, mediactionActions } from "../../redux/reducer/medicationReducer";
import {useDispatch, useSelector} from "react-redux";
import { ImCross } from "react-icons/im";

const Medication =()=>{

    const dispatch = useDispatch();
    const {medication} = useSelector(medicationSelectors);

    const currentDate = new Date();
    const options = { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(currentDate);

    const [data, setData] = useState({
        id:"",
        date:"",
        medicine:"",
        duration:"",
        problem:"",
        daysLeft:""
    });

    const handleChange =(e)=>{ 
      const {name, value} = e.target;
      setData({...data, [name]: value, id:new Date().getTime(), date:formattedDate});
    }
      const handleSubmit = (e) => {
       e.preventDefault();
        
        if (data.medicine.trim() === "" || data.duration <= 0) {
            return;
        }
       dispatch(mediactionActions.ADD(data));
      
     };



     const calculateDaysLeft = useCallback((startDate, daysToAdd) => {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const end = new Date(new Date(startDate).getTime() + daysToAdd * oneDay);
        const currentDate = new Date();
        const timeDiff = end.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(timeDiff / oneDay);
        return daysLeft;
      }, []);



useEffect(() => {
  const daysLeft = calculateDaysLeft(data.date, data.duration);
  const containsId = medication.some(item => item.id === data.id);
  if (daysLeft !== "" && daysLeft !== 0 && containsId === true) {
    dispatch(mediactionActions.UPDATE({ daysLeft, id: data.id }));
  }
}, [calculateDaysLeft, dispatch, data.id, data.date, data.duration,medication]);


useEffect(() => {
    setData({
      id:"",
      date:"",
      medicine:"",
      duration:"",
      problem:"",
      daysLeft:""
    });
  }, [medication]);





    return(
        <>
        <div className={styles.mainCont}>
            <div className={styles.innerCont}>
                <div className={styles.form}>
                    <form action="" onSubmit={handleSubmit}>
                        <h2>Give Details and get reminders</h2>
                        <input type="text" name="medicine" value={data.medicine} onChange={handleChange} placeholder="Name of medicine"/>
                        <input type="number" name="duration" value={data.duration} onChange={handleChange} placeholder="Duration"/>
                        <input type ="text" name="problem" value={data.problem} onChange={handleChange} placeholder="What was the Problem?"/>
                        <button className={styles.button}>Submit</button>
                    </form>
                </div>
                <div className={styles.medremCont}>
                    <div className={styles.innercont}>
                        {medication.map((detail,i)=>(
                        <div key={i} className={styles.details}>
                          <ImCross className={styles.crossIcon} onClick={()=>dispatch(mediactionActions.Delete(detail.id))} />
                            <h2 className={styles.dayLeft}>{detail.daysLeft? detail.daysLeft: "0"} Days Left</h2>
                            <h3>{detail.duration} Days</h3>
                            <h3>{detail.medicine}</h3>
                            <h3>{detail.problem}</h3>
                            <h2>{detail.date}</h2>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Medication;