import React from 'react';
import './not-found.css';
import './../App.css';
import {WarningOutlined} from '@ant-design/icons';
import { Input } from 'antd';

const NotFound = () => {
    return (
        <div id="okvir">
            <div id="poruka">
                <h2 style={{ color: 'white', paddingTop: '2em' }} ><WarningOutlined />   404 NOT FOUND</h2>
            </div>
        </div>
    );
};
        
export default NotFound;