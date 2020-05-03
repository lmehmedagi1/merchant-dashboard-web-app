import React from 'react';
import { getUser } from '../auth';
import '../App.css';
import { Card } from 'antd'
import 'antd/dist/antd.css';


  let user = getUser();


  class Profile extends React.Component {
    render() {
      return (
          <div id="naziv">
          <h1> User profile </h1>
      <Card id = "karticaPodaci"
        type="inner"
        title="Personal information"
      >
        <div id="podaci">
        Username: {user.username}
        <br></br>
        <br></br>
        Name: {user.name}
        <br></br>
        <br></br>
        Surname: {user.surname}
        <br></br>
        <br></br>
        Date of birth: {user.dateofbirth}
        <br></br>
        <br></br>
        JMBG: {user.jmbg}
        <br></br>
        <br></br>
        Email: {user.email}
        <br></br>
        <br></br>
        Address: {user.address}
        <br></br>
        <br></br>
        Phone number: {user.phoneNumber}
        <br></br>
        <br></br>
        City: {user.city}
        <br></br>
        <br></br>
        Country: {user.country}
        <br></br>
        <br></br>
        </div>
      </Card>
        </div>
    );
        }
  };
        
  export default Profile;
