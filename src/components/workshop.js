import React from 'react';
import {Button } from 'antd';
import InfiniteListExample from './workshop-list.js'
 
 
const Workshop = () => {
    return (
        <div>
            <div id="kalendar" >
                <div style={{display:'inline'}}>
                    <InfiniteListExample>
 
                    </InfiniteListExample>
                   
                </div>
                <Button onClick={() => { window.location.href='/addShop' }} type="dashed" block>
                    Add shop
                </Button>
            </div>
            <div>
            </div>
        </div>
    );
};
 
 
export default Workshop;
