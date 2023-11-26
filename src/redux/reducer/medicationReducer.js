
import {createSlice} from "@reduxjs/toolkit";
import {auth} from "../../firebase"
import { doc, setDoc,updateDoc, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebase";



const initialState={
    medication:[]
}

const medicationSlice = createSlice({
  name:"medication",
  initialState,
  reducers:{
      ADD:(state,action)=>{
        auth.onAuthStateChanged(async(user) => {
          if (user) {
          await  setDoc(doc(db, "medication", user.uid, "data", String(action.payload.id)), action.payload);
          } 
        });
        state.medication.unshift(action.payload);
        
      },
      Delete:(state,action)=>{
       const ind = state.medication.findIndex((item)=>item.id === action.payload);
       state.medication.splice(ind,1);
       auth.onAuthStateChanged(async(user) => {
        if (user) {
          deleteDoc(doc(db, "medication", user.uid, "data", String(action.payload)));
        } 
      });
      },
      UPDATE:(state,action)=>{
        // debugger;
         const ind = state.medication.findIndex((index)=>index.id === action.payload.id);
         if(ind!==-1){
            state.medication[ind].daysLeft = action.payload.daysLeft;

            auth.onAuthStateChanged((user)=>{
              const washingtonRef = doc(db, "medication", user.uid, "data", String(action.payload.id));
              updateDoc(washingtonRef, {
                daysLeft:action.payload.daysLeft
                });
            })
         }
         
      },
      GET_DATA:(state, action)=>{
        state.medication= action.payload;
     }
  }
})

export const medicationReducer = medicationSlice.reducer;
export const mediactionActions = medicationSlice.actions;
export const medicationSelectors = (state) => state.medicationReducer;