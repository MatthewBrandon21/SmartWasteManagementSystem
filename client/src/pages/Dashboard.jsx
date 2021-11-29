import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import StatusCard from '../components/status-card/StatusCard';
import Table from '../components/table/Table';
import Badge from '../components/badge/Badge';
import Carousel from '../components/carousel/Carousel';
import statusCards from '../assets/JsonData/status-card-data.json';
import postReducer from '../redux/reducers/Post';


const topCustomers = {
    head: [
        'location',
        'total trash'
    ],
    body: [
        {
            "username": "angrek5",
            "order": "49034"
        },
        {
            "username": "melati2",
            "order": "69034"
        },
        {
            "username": "mawar1",
            "order": "69034"
        },
        {
            "username": "bugenvil2",
            "order": "69034"
        },
        {
            "username": "permai1",
            "order": "23122"
        }
    ]
}

const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
    </tr>
)

const Dashboard = () => {

    const post = useSelector((state) => state.postReducer) 

    console.log(postReducer)

    return (
        <div>
            <h2 className="page-header">
                <Icon icon="bx:bxs-category-alt"/> Dashboard
            </h2>

            <div className="row">
                
                <div className="col-6">
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div className="col-6">
                    <div className="card">
                        <div className="card__header">
                            <h3><Icon icon="bx:bx-star" /> top trash </h3><sub>~ monthly</sub>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) => renderCusomerHead(item, index)}
                                bodyData={topCustomers.body}
                                renderBody={(item, index) => renderCusomerBody(item, index)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-7 trash-card-dashboard">
                    <div className="card card-bg">
                        <div className="card__header">
                            <h3><Icon icon="bx:bx-trash-alt" /> trash profile</h3><sub>~ location</sub>
                        </div>
                        <div className="search">
                            <input type="text" placeholder='search here...' />
                            <i className='bx bx-search'></i>
                        </div>
                        <div className="card__body">
                            <Carousel />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard
