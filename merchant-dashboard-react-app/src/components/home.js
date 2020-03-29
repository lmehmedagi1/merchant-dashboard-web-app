import React from 'react';
import { Divider, Input, Calendar, Avatar } from 'antd';
// Ovdje se nalaze podaci o korisniku
import { getUser } from '../auth';
const { TextArea } = Input;
const onChange = e => {
    console.log(e);
};
  

console.log("U home-u: " + getUser());

const Home = () => {
    return (
        <div>
        <div>
    <h1>Welcome, {getUser().username}</h1>
        </div>
        <div  id = "kalendar" >
          <Calendar fullscreen={false}/>
        </div>
        <div id = "Notes" >
            <TextArea placeholder=" Write down the thoughts of the moment. Those that come unsought for are commonly the most valuable." allowClear onChange={onChange} />
        </div>
        </div>
    );
};
        
export default Home;
