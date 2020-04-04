import React from 'react';
import { List, Avatar } from 'antd';
import './help.css';
 

    const data = [
        {
          title: 'What is the merchant dashboard web application used for ?',
          description:"On the dashboard you can see calendar of the year, write some thoughts or reminders on some specific day and you can review your notifications. ",
        },
        {
          title:'Where is the list of shops ?',
          description:"You can find the whole list of shops on a button named Shop, where you can see shop's manager data, shop data and additional data.",
        },
        {
          title: 'The list of all employees',
          description:"The list of employees contains employee's name, surname, e-mail, phone number and role."
        },
        {
          title: 'What does the field of statistics represent?',
          description:"Here you can find different kinds of statistics e.g profits of companies in the last 24 hours or the total profit."
        },
        {
          title: 'How can You contact us ?',
          description:"In the field 'About us' you can find our E-mail adress if you want to know more informations."
          },
      ];

      const Help = () => {
    return (   
        <div>
            <div id="naslov">
                <h1>Help center</h1>
            </div>


  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="upitnik.png"/>}
          title={<a>{item.title}</a>}
          description={item.description}
        />
      </List.Item>
      
    )}
  />
  </div>
    );  
};
        
export default Help;