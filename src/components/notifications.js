import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './notifications.css';
import { Link } from 'react-router-dom';

let socket, stompClient;
let allCurrentNotifications = [];

export const getNotifications = () => {
    return allCurrentNotifications;
}

const soundUrl = `https://ia800203.us.archive.org/14/items/slack_sfx/flitterbug.mp3`;
const notificationSound = new Audio(soundUrl);

class Notifications extends React.Component {

    state = {
        count: 0,
        isAnimating: false,
        mute: false,
        allNotifications: []
    }

    constructor(props) {
        super(props);
        this.state={
        count: 0,
        isAnimating: false,
        mute: false,
        allNotifications: []
        }
        this.notify = this.notify.bind(this)
    }

    async componentDidMount() {
    socket = new SockJS('https://log-server-si.herokuapp.com/ws');
    stompClient = Stomp.over(socket);
    
        stompClient.connect({}, () => {
        if (stompClient.connected) {
            stompClient.subscribe('/topic/merchant_dashboard', (notif) => {

                let e = JSON.parse(notif.body);
                let oldNotifications = this.state.allNotifications;
                oldNotifications.push(e);
                this.setState({allNotifications: oldNotifications});
                allCurrentNotifications = oldNotifications;

                this.notify();
            });
        }
        }, (err)=>{
        console.log('error pri konekciji '+err);
        });
    }

    notify() {
        if (this.state.mute) {
            return null;
        }

        this.setState({
            count: this.state.count + 1,
            isAnimating: !this.state.mute ? true : false
        })

        notificationSound.play();
        setTimeout(() => this.setState({ isAnimating: false }), 1000);
    }

    render() {
        const { count, mute, isAnimating } = this.state;

        return (
            <div>
                <Link to='/app'>
                    <div>       
                        <Notification
                        count={ count }
                        isAnimating={ isAnimating }
                        mute={ mute }
                        />
                    </div>
                </Link>
            
            </div>
        
        )
    }
}

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

export default Notifications;