import React from "react";
import { Button, Card,  Image} from "semantic-ui-react";
import { Activity } from "../../../models/Activity";
 
interface Props{
    activity: Activity
    cancelSelectActivity:()=> void;
    openForm:(id:string) => void;

}

export default function ActivityDetails ({activity, cancelSelectActivity,openForm}:Props){
    return(
      <Card>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(activity.id) } basic color='blue' content='Edit' />
            <Button onClick={cancelSelectActivity} basic color='blue' content='Cancel' />
        </Button.Group>
      </Card.Content>
      </Card>
    )
}