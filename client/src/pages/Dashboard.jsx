import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import StatusCard from '../components/status-card/StatusCard';
import Table from '../components/table/Table';
import Carousel from '../components/carousel/Carousel';


const topTrashs = [
    'name',
    'total trash'
]

const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td style={{ textTransform: "capitalize" }}>{item.tempat_sampah_name}</td>
        <td>{item.tempat_sampah_totalcapacitythismonth} kg</td>
    </tr>
)

const Dashboard = () => {

    const user = useSelector(state => state.User);
    const admin = user.filter(item => item.user_isAdmin == true)
    const employee = user.filter(item => item.user_isAdmin == false)

    const trash = useSelector(state => state.Trash);

    const sortedTrash = trash.sort((a, b) => b.tempat_sampah_totalcapacitythismonth - a.tempat_sampah_totalcapacitythismonth);

    // console.log(trash);

    // console.log(trash.filter(item => item.tempat_sampah_jenis=='anorganik'));

    return (
        <div>
            <h2 className="page-header">
                <Icon icon="bx:bxs-category-alt" /> Dashboard
            </h2>

            <div className="row">

                <div className="col-6">
                    <div className="row">

                        {/* ADMIN */}
                        <div className="col-6">
                            <StatusCard
                                icon="bx bx-user-circle"
                                count={admin.length}
                                title="admin"
                            />
                        </div>

                        {/* EMPLOYEE */}
                        <div className="col-6">
                            <StatusCard
                                icon="bx bx-user"
                                count={employee.length}
                                title="employee"
                            />
                        </div>

                        {/* TRASH */}
                        <div className="col-6">
                            <StatusCard
                                icon="bx bx-trash"
                                count={trash.length}
                                title="trash"
                            />
                        </div>

                        {/* TRASH_FULL */}
                        <div className="col-6">
                            <StatusCard
                                icon="bx bxs-trash"
                                count={trash.filter(item => item.tempat_sampah_isfull == true).length}
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
                                headData={topTrashs}
                                renderHead={(item, index) => renderCusomerHead(item, index)}
                                bodyData={sortedTrash.slice(0, 5)}
                                renderBody={(item, index) => renderCusomerBody(item, index)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-7 trash-card-dashboard">
                    <div className="card card-bg">
                        <div className="card__header">
                            <h3><Icon icon="bx:bx-trash-alt" /> trash profile</h3><sub>~ region</sub>
                        </div>
                        <div className="search">
                            <input type="text" placeholder='search here...' />
                            <i className='bx bx-search'></i>
                        </div>
                        <div className="card__body">
                            <Carousel data={trash} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
