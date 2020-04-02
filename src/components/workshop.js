import React from 'react';
import {  Input, Button } from 'antd';
import InfiniteListExample from './workshop-list.js'
 
 
const Workshop = () => {
    return (
        <div>
            <div id="kalendar" >
                <div style={{display:'inline'}}>
                    <InfiniteListExample>
 
                    </InfiniteListExample>
                   
                </div>
                <Button onClick={() => { window.location.href='/addNewWorkshop'  }} type="dashed" block>
                    Add shop
                </Button>
            </div>
            <div>
            </div>
        </div>
    );
};
 
 
export default Workshop;
