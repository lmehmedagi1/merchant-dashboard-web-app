
import React from 'react';
import { Divider, Input, Calendar, Avatar, Button } from 'antd';
import InfiniteListExample from './lista.js'
import Axios from 'axios';


const { TextArea } = Input;
const onChange = e => {
    console.log(e);
};

const Workshop = () => {
    return (
        <div>
            <div id="kalendar" >
                <a style={{ float: 'left', fontSize: '18pt', marginLeft: '80px' }} >MANAGER DATA</a>
                <a style={{ fontSize: '18pt', paddingRight: '10px' }}>WORKSHOP ADDRESS</a>
                <a style={{ float: 'right', fontSize: '18pt', marginRight: '55px' }} > WORKSHOP DATA </a>
                <div style={{display:'inline'}}>
                    <InfiniteListExample>

                    </InfiniteListExample>
                    
                </div>
                <Button type="dashed" block>
                    Add workshop
                </Button>
            </div>
            <div>
            </div>
        </div>
    );
};


export default Workshop;