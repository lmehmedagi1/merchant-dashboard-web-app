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
          description:"In the field 'About us' you can find our E-mail address if you want to know more informations."
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

const NotificationIcon = () => (
  <svg width='42' height='40' viewBox='0 0 21 20'>
    <g transform='translate(2, 0)'>
      <path className='notification-bell__bow' d='M15,8.5 C15,5.43 12.86,2.86 10,2.18 L10,1.5 C10,0.671572875 9.32842712,0 8.5,0 C7.67157288,0 7,0.671572875 7,1.5 L7,2.18 C4.13,2.86 2,5.43 2,8.5 L2,14 L0,16 L0,17 L17,17 L17,16 L15,14 L15,8.5 Z' />
      <path className='notification-bell__clapper' d='M2.5,2 C2.64,2 2.77,2 2.9,1.96 C3.55,1.82 4.09,1.38 4.34,0.78 C4.44,0.54 4.5,0.27 4.5,0 L0.5,0 C0.5,1.1045695 1.3954305,2 2.5,2 L2.5,2 Z'  />
    </g>
  </svg>
 )

const Notification = ({ count, mute, isAnimating }) => (
  <div
    className={`notification-bell ${isAnimating ? 'is-animating' : ''} ${mute ? 'is-muted' : ''}`}
    data-count={ count > 9 ? '9+' : count }>
    <NotificationIcon />
  </div>
)
        
export default Help;