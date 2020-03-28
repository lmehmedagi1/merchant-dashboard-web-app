
import React from 'react';
import { Divider, Input, Calendar, Avatar, Button } from 'antd';
import InfiniteListExample from './lista.js'
const { TextArea } = Input;
const onChange = e => {
    console.log(e);
};


const Workshop = () => {
    return (
        <div>
            <div id="kalendar" >
                <InfiniteListExample>

                </InfiniteListExample>
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