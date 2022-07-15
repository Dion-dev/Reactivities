import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from './features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import { act } from 'react-dom/test-utils';

function App() {
 
const [Activities,setActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity]= useState<Activity | undefined> (undefined);
const [editMode,setEditMode] = useState(false);
useEffect(() =>{
axios.get<Activity[]>('http://localhost:5000/api/activities').then(Response =>{
console.log(Response);
setActivities(Response.data);
})

},[])


function handleSelectActivity(id:String){
  setSelectedActivity(Activities.find(x => x.id == id));
}

function handleCancelSelectActivity(){
  setSelectedActivity(undefined);
}

function handleFormOpen(id?:String){
  id?  handleSelectActivity(id): handleCancelSelectActivity();
  setEditMode(true);
}

function handleFormClose(){
  setEditMode(false);
}
 
function handleCreateorEditActivity(activity:Activity){

  activity.id ? setActivities([...Activities.filter(x => x.id !== activity.id),activity])
  : setActivities([...Activities,{...activity, id: uuid()}]);
  setEditMode(false);
  setSelectedActivity(activity);
}

function handleDeleteActivity(id:string){
  setActivities([...Activities.filter(x => x.id !== id)])
}

  return (
  <>
       <NavBar openForm={handleFormOpen} />  
       <Container style={{marginTop:'7em'}}>
        <ActivityDashboard 
        activities={Activities} 
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createoredit={handleCreateorEditActivity}
        deleteActivity={handleDeleteActivity}
        />  
       </Container>
  </>
  );
}

export default App;
