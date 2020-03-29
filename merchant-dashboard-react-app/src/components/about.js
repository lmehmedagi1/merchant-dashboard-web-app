import React from 'react';
import { Divider, Input, Calendar, Avatar, Alert } from 'antd';
const { TextArea } = Input;
const onChange = e => {
    console.log(e);
};

const About = () => {
    return (
        <div>
            <div>
                <img src={require('./slike/about.jpeg')} />
            </div>
            <Alert
                message="Creators"
                description="Success Description Success Description Success Description"
                type="info"
            />
            <Alert
                message="Goals"
                description="Info Description Info Description Info Description Info Description"
                type="info"
            />
            <Alert
                message="Warning Text"
                description="Warning Description Warning Description Warning Description Warning Description"
                type="info"
            />
        </div>

    );
};

export default About;