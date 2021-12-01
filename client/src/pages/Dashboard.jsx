import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import StatusCard from '../components/status-card/StatusCard';
import Table from '../components/table/Table';
import Carousel from '../components/carousel/Carousel';


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

    const user = useSelector((state) => state.User);

        console.log(user)

    return (
        <div>
            <h2 className="page-header">
                <Icon icon="bx:bxs-category-alt" /> Dashboard
            </h2>

            <div className="row">

                <div className="col-6">
                    <div className="row">
                        {/* {
                            statusCards.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <StatusCard
                                        icon={item.icon}
                                        count={post.count}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        } */}

                        {/* ADMIN */}
                        <div className="col-6">
                            <StatusCard
                                icon="bx bx-user-circle"
                                count={user.length}
                                title="admin"
                            />
                        </div>

                        {/* EMPLOYEE */}
                        <div className="col-6">
                            <StatusCard
                                icon="bx bx-user"
                                count={user.length+3315}
                                title="employee"
                            />
                        </div>

                        {/* TRASH */}
                        <div className="col-6">
                            <StatusCard
                                icon="bx bx-trash"
                                count="3415"
                                title="trash"
                            />
                        </div>

                        {/* TRASH_FULL */}
                        <div className="col-6">
                              <StatusCard
                                icon="bx bxs-trash"
                                count="22"
                                title="full trash"
                            />
                        </div>
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
