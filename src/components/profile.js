import React from 'react';
import { Input, Calendar } from 'antd';
// Ovdje se nalaze podaci o korisniku
import { getUser } from '../auth';
import '../App.css';

/*
 * sad su u ovoj varijabli user svi podaci o korisniku
 * u json formi:
 * user {
        "username": "business1",
        "email": "business1@gmail.com",
        "name": "Bmana",
        "surname": "SBman",
        "address": "some address",
        "phoneNumber": "+38733222111",
        "country": "Bosnia",
        "city": "Sarajevo"
    }
*/
let user = getUser();

const Profile = () => {
    return (
        <div>
        Ovdje izgled stranice.
        </div>
    );
};
        
export default Profile;