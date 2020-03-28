import React from 'react';
import { Divider, Input, Calendar, Avatar } from 'antd';
const { TextArea } = Input;
const onChange = e => {
    console.log(e);
};
  

const Home = () => {
    return (
        <div>
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
