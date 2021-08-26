import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonToggle, IonPopover} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { IonItem, IonLabel, IonSelect, IonSelectOption,IonButton, IonDatetime, IonGrid,IonRow,IonCol,IonAlert,IonChip,IonIcon,IonModal,IonItemDivider, IonInput, IonLoading, IonNote} from '@ionic/react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { pin, heart, closeCircle, close } from 'ionicons/icons';
import CenterDetails from '../components/CenterDetails';

const Home: React.FC = () => {
let [states, setStates]= useState<any[]>([]);
let [cities, setCities]= useState<any[]>([]);
let [searchByState ,setSearchByState] = useState(false);
let [selectedState, setSelectedState] = useState<any[]>([]);
let [selectedCity, setSelectedCity] = useState<any[]>([]);
let [slots, setSlots] = useState<any[]>([]);
let [filteredSlots, setFilteredslots] = useState<any[]>([]);
let [noSlot, setNoSlot] = useState(false);
let [finalDate, setFinalDate] = useState('');
const [showModal, setShowModal] = useState(false);
const [selectedDate, setSelectedDate] = useState<string>('');
const [pincode, setPincode] = useState("");
let [centerInfo, setCenterInfo] = useState({});
const [age ,setAge] = useState<any[]>([18,45]);
const [vaccine ,setVaccine] = useState<any[]>(["SPUTNIK", "COVAXIN", "COVISHIELD"]);
const [showLoading, setShowLoading] = useState(false);
const [showPopover, setShowPopover] = useState(false);

//console.log("states=",states);
//console.log("selectedStateFinal=",selectedState);
//console.log("cities=",cities);
//console.log("selectedCity=",selectedCity);
//console.log("final date=",finalDate);
//console.log("filteredSlots=",filteredSlots);
//console.log("pincode=",pincode.length);
//console.log("AGE Final=",age);
//console.log("vaccine final=",vaccine);

const options = {
  cssClass: 'my-custom-interface'
};

//const accessToken= '3sjOr2rmM52GzhpMHjDEE1kpQeRxwFDr4YcBEimi';
/*axios.interceptors.request.use(
config=>{
  config.headers.authorization = `Bearer ${accessToken}`;
  return config;
},
error => {
  return Promise.reject(error);
})*/

const toggleSearchByState=()=>{
let currentValue= searchByState;
setSearchByState(!currentValue)
setPincode('')
setSlots([])
}

const getStates=()=>{
  axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
      .then(res => {
         setStates( res.data.states);
       })
}
const getCities=()=>{
if(Object.keys(selectedState).length > 0) {
  axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedState[0].state_id}`)
      .then(res => {
         setCities( res.data.districts );
       })}
}

useEffect(()=>{
getStates();
let date = new Date();
if(date.getHours() < 18) {
let formatedDate =((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' 
+ ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
setFinalDate(formatedDate);
 setSelectedDate(date.toISOString());
} else {
let tomorrow;
tomorrow=date.setDate(date.getDate()+1);
let formatedDate =((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' 
+ ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
setFinalDate(formatedDate);
setSelectedDate(date.toISOString());
}
},[]);

useEffect(()=>{
  getCities();
},[selectedState]);

const setDate=(event:any)=>{
setSelectedDate(event.detail.value!);
let date = new Date(event.detail.value);
let formatedDate =((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' 
+ ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
setFinalDate(formatedDate);
}

const stateChange=(event:any)=>{
  const state_id = states.filter(item=>item.state_name === event.target.value);
  setSelectedState(state_id);
  setSelectedCity([]);
  setSlots([])
}

const cityChange=(event:any)=>{
   const district_id = cities.filter(item=>item.district_name === event.target.value);
    setSelectedCity(district_id);
}
const getCenterDetails=(info:any)=>{
  setCenterInfo(info)
  setShowModal(true)
};

useEffect(()=>{ 
   let newArray=[];
        slots.map(item=>{
        if(age.includes(item.min_age_limit) && vaccine.includes(item.vaccine)) {
        newArray.push(item);
        }
        });
setFilteredslots(newArray);
},[age]);
 

 useEffect(()=>{
   let newArray=[];
        slots.map(item=>{
        if(vaccine.length === 0) {
        newArray=[];
        } else {
        if(vaccine.includes(item.vaccine) && age.includes(item.min_age_limit))
        newArray.push(item);
        }
        });
        setFilteredslots(newArray);
},[vaccine]);


const toggleAge = (val, e) => {
let tempArray = [...age];
console.log('toggleAge,age',age)
      if (e.currentTarget.checked) {
console.log('here1')

            tempArray.push(val);
        } else {
console.log('here2');

            const index = tempArray.indexOf(val);
            if (index > -1) {
                tempArray.splice(index, 1);
            }
console.log('tempArray=',tempArray)

        }
        setAge(tempArray);
        setShowLoading(true);
setTimeout(() => {
    setShowLoading(false);
  }, 800);
 }

const toggleVaccine = (val, e) => {
let tempArray = [...vaccine];
      if (e.currentTarget.checked) {
            tempArray.push(val);
        } else {
            const index = vaccine.indexOf(val);
            if (index > -1) {
                tempArray.splice(index, 1);
            }
        }
console.log("vaccine=",vaccine);
setVaccine(tempArray);
   setShowLoading(true);
setTimeout(() => {
    setShowLoading(false);
  }, 800);
 }

const findSlots=()=>{
setShowLoading(true);
setTimeout(() => {
    setShowLoading(false);
  }, 500);
 if(!finalDate){
  alert("Please Enter Valid Date");
  return;
} else if(!searchByState && pincode.length<1){
console.log("no pin code")
  alert("Please Enter Valid Pin Code");
  return;
} else{
if(searchByState && pincode.length == 0) {
   axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selectedCity[0].district_id}&date=${finalDate}`)
      .then(res => {
          console.log("Result=",res.data.sessions);
          if(res.data.sessions.length === 0) {
          //alert("No Slots Available, please check again after sometime");
          setNoSlot(true)
          setSlots([])
          } else {
          setSlots(res.data.sessions);
          setFilteredslots(res.data.sessions);
          }
       })
} else {
   axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${finalDate}`)
      .then(res => {
          if(res.data.sessions.length === 0) {
          setNoSlot(true)
          setSlots([])
          } else {
          setSlots(res.data.sessions);
          setFilteredslots(res.data.sessions);
          }
       })
       .catch(error=>{
                console.log(error.response.data.error); 
                alert(error.response.data.error);
       })
       }
}
}
  return (
    <IonPage>
 <IonHeader className="main-header">
        <IonToolbar>
          <IonTitle>Covid Vaccination</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonLoading
        cssClass='my-custom-class'
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
        duration={5000}
      />
        <IonHeader collapse="condense" className="main-header">
          <IonToolbar>
            <IonTitle size="large">Covid Vaccination</IonTitle>
          </IonToolbar>
        </IonHeader>
         <IonAlert
          isOpen={noSlot}
          onDidDismiss={() => setNoSlot(false)}
          cssClass='my-custom-class'
          header={'No Slots Available'}
          message={'Please check after sometime.'}
          buttons={['OK']}
        />
        <IonItem className="date-ion-title">
           <b>Date:&nbsp;</b><IonDatetime displayFormat="DDDD MMM D, YYYY" min="2021" max="2040" value={selectedDate} onIonChange={(event) => setDate(event)}></IonDatetime><div className="small-text">Click to change the date</div> 
        </IonItem> 

          <IonGrid style={{backgroundColor:'teal'}}>
  <IonRow>
    <IonCol col-3>
       <IonItem className="pincode">
        <b>Enter Pincode:</b>
</IonItem>
    </IonCol>
    <IonCol col-3>
       <IonItem className="enter-pincode">
         <IonInput cssClass='my-custom-input' placeholder="Pincode"  value={pincode} type="number"
            onIonInput={(e: any) => setPincode(e.target.value)}
            ></IonInput>
</IonItem>
    </IonCol>
     <IonCol col-3>
       <IonItem onClick={findSlots} className='findSlots'><b>Find slots</b></IonItem>
    </IonCol>
  </IonRow>
</IonGrid>
<IonGrid>
  <IonRow>
    <IonCol>
       <IonItem>
        <IonNote color="dark" className="note">OR</IonNote>

        <IonButton onClick={toggleSearchByState}>Search By State/District</IonButton>
</IonItem>
    </IonCol>
  </IonRow>
</IonGrid>
 { searchByState && pincode.length ==0 &&<IonItem>
          <IonLabel><b>Select State :</b></IonLabel>
          <IonSelect interfaceOptions={options} onIonChange={(event)=> stateChange(event)}>
      {states?.map((item, i) => (
          <IonSelectOption value={item.state_name} key={i}>
            {item.state_name}
          </IonSelectOption>
        ))}
          </IonSelect>
        </IonItem> }
        {cities.length>1 && pincode.length ==0 &&
          <IonItem>
          <IonLabel><b>Select City :</b></IonLabel>
          <IonSelect interfaceOptions={options} onIonChange={(event)=> cityChange(event)}>
      {cities?.map((item, i) => (
          <IonSelectOption value={item.district_name} key={i}>
            {item.district_name}
          </IonSelectOption>
        ))}
          </IonSelect>
        </IonItem>
        }
        {searchByState && pincode.length ==0 && <IonItem className="findSlots" onClick={findSlots}><b>Find Slots</b></IonItem>}
{ slots.length>=1 && <IonItem>
  <IonGrid>
  <IonRow>
    <IonCol col-6>
       <IonLabel><b>Age</b> 18</IonLabel>
        <IonToggle value="18" onIonChange={(e) => toggleAge(18,e)} checked={(age!=45 || age.length==2)&& age.length !=0} />
        </IonCol>
        <IonCol col-6>
       <IonLabel><b>Age</b> 45</IonLabel>
        <IonToggle value="45" onIonChange={(e) => toggleAge(45,e)} checked={(age!=18 || age.length==2) && age.length !=0} />
    </IonCol> 
      </IonRow>
     <IonRow>
    <IonCol col-3>
       <IonLabel><b>Covishield</b></IonLabel>
        <IonToggle value="covishield" onIonChange={(e) => toggleVaccine('COVISHIELD',e)} checked={vaccine.includes("COVISHIELD")}/> 
     </IonCol>
        <IonCol col-3>
       <IonLabel><b>Covaxin</b></IonLabel>
        <IonToggle value="covazxin" onIonChange={(e) => toggleVaccine('COVAXIN',e)} checked={vaccine.includes("COVAXIN")}/>
      </IonCol>
        <IonCol col-3>
       <IonLabel><b>Sputnik</b></IonLabel>
        <IonToggle value="sputnik" onIonChange={(e) => toggleVaccine('SPUTNIK',e)} checked={vaccine.includes("SPUTNIK")}/>
    </IonCol>
  </IonRow>
</IonGrid>
</IonItem> }
{slots.length>=1 &&
<><IonItem>
<IonGrid>

{filteredSlots.length == 0 &&
<IonRow>
<IonCol size='5'><b>No data Found</b></IonCol>
 </IonRow>}
{filteredSlots.length>0 &&
<IonRow>
<IonCol size='5'><b>Name</b></IonCol>
<IonCol><b>PinCode</b></IonCol>
<IonCol><b>Min Age Limit</b></IonCol>
<IonCol><b>Slots</b></IonCol>
 </IonRow>}
        {filteredSlots?.map((item, i) => (
        <IonRow key={i}>
        <IonCol size='5' onClick={()=>getCenterDetails(item)}>
          <u>{item.name}</u><br/>
          <b>{item.vaccine.toLowerCase()}</b>
        </IonCol>
        <IonCol>
          {item.pincode}
        </IonCol>
        <IonCol>
          {item.min_age_limit}
        </IonCol> 
         <IonCol>
          {item.available_capacity}
        </IonCol> 
      </IonRow>
        ))}
    </IonGrid>

    </IonItem>
    <IonItem className="filterTable">
      <span><a href="https://selfregistration.cowin.gov.in/">Click here to book slots</a></span>
   
     <IonChip color="success">
      <IonLabel onClick={() => setShowPopover(true)} class="disclaimer">Disclaimer</IonLabel>
    </IonChip>
     <IonPopover
        isOpen={showPopover} 
        onDidDismiss={e => setShowPopover(false)} className="popover-disclaimer"
      >
        <ul className="info-list">
<li><b>Clicking on 'book slots' will redirect to government website- 
<u>https://selfregistration.cowin.gov.in/</u></b></li></ul>
<IonButton className="close-btn" onClick={() => setShowPopover(false)}>Close</IonButton>
      </IonPopover>
    </IonItem>
    </>
   }

    </IonContent>
     <IonModal isOpen={showModal} cssClass='my-custom-class'>
        <CenterDetails data={centerInfo}></CenterDetails>
        <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
      </IonModal>
    </IonPage>
  );
};

export default Home;
