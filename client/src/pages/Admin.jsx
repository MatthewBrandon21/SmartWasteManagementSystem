import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Table from '../components/table/Table'
import Modal from '../components/modal/Modal'
import { Icon } from '@iconify/react';
// import adminList from '../assets/JsonData/admin-list.json'


const adminTableHead = [
    '',
    'name',
    'email',
    'phone',
    'location'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.admin_nama}</td>
        <td>{item.admin_email}</td>
        <td>+62{item.admin_phonenum}</td>
        <td>{item.admin_location}</td>
    </tr>
)

const Admin = () => {

    const user = useSelector((state) => state.User)

    console.log(user)

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show === false) {
            document.body.style.overflow = "";
        } else {
            document.body.style.overflow = "hidden";
        }
    }, [show]);


    return (
        <div>
            <h2 className="page-header">
                <Icon icon="bx:bxs-user" /> admin
            </h2>

            <div className="row">

                <div className="col-3">
                    <div className="card">
                        <button className="btn-primary flex" onClick={() => setShow(true)}>
                            <i className='bx bx-plus-medical'></i>
                            add new
                        </button>
                        <Modal
                            title="admin"
                            content={
                                <p>dwqd</p>
                            }
                            show={show}
                            close={() => setShow(false)}
                        />
                    </div>
                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='4'
                                headData={adminTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={user}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Admin
