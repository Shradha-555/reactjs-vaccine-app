import {IonHeader, IonContent} from '@ionic/react';
import { IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton,IonRow,IonCol,IonGrid } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
type MyModalProps = {
   data: Object,
}
const CenterDetails=(MyModalProps)=> {
console.log('props.text=',MyModalProps.data)
    return <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader> 
       <IonCard>
          <IonCardHeader>
            <IonCardTitle>{MyModalProps.data.name}</IonCardTitle>
            <IonCardSubtitle>{MyModalProps.data.address}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
       <IonGrid>
       <IonRow>
        <IonCol><b>{MyModalProps.data.state_name},{MyModalProps.data.district_name}</b></IonCol>
      </IonRow>
       <IonRow>
        <IonCol><b>From:</b> {MyModalProps.data.from} <b>to:</b> {MyModalProps.data.to}</IonCol>
      </IonRow>
       <IonRow>
       <IonCol><b>Slots</b>:
        {MyModalProps?.data?.slots?.map((item,i)=>(<div key={i}>{item}</div>))}
       </IonCol>
      </IonRow>
      <IonRow>
        <IonCol><b>Age:</b> {MyModalProps.data.min_age_limit}+</IonCol>
      </IonRow>

      <IonRow>
       <IonCol><b>Date</b>: {MyModalProps.data.date}</IonCol>
      </IonRow>
      <IonRow>
       <IonCol><b>Pin Code</b>: {MyModalProps.data.pincode}</IonCol>
      </IonRow>
      <IonRow>
        <IonCol>Vaccine:{MyModalProps.data.vaccine}</IonCol>
      </IonRow>

      <IonRow>
        <IonCol><b>Fee Type</b>: {MyModalProps.data.fee_type}</IonCol>
        </IonRow>

      <IonRow>
       <IonCol><b>Fee</b>: {MyModalProps.data.fee}</IonCol>
      </IonRow>

     
 </IonGrid>

      </IonCardContent>
        </IonCard>

        

     
    </>
  }



export default ({data, text}: { data: Object, text: string }) => (
  <CenterDetails data={data} text={text}>
  </CenterDetails>
)