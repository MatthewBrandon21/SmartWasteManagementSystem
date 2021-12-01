import React, { useState, useEffect } from 'react'
import Table from '../components/table/Table'
import Carousel from '../components/carousel/Carousel';
import Modal from '../components/modal/Modal'
import { Icon } from '@iconify/react';
import employeeList from '../assets/JsonData/employee-list.json'


const employeeTableHead = [
    '',
    'name',
    'email',
    'phone',
    'location'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.location}</td>
    </tr>
)

const Trash = () => {

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
                <Icon icon="bx:bxs-trash" /> Trash
            </h2>

            <div className="row">

                <div className="col-3">
                    <div className="card">
                        <button className="btn-primary flex" onClick={() => setShow(true)}>
                            <i className='bx bx-plus-medical'></i>
                            add new
                        </button>
                        <Modal
                            title="trash"
                            content={
                                <form>
                                    <div>
                                        <input type="text" value="idsampah" hidden />
                                        <input type="text" value="nama" hidden />
                                        <input type="number" value={0} hidden />
                                        <input value={false} hidden />
                                        <div className="input">
                                            <select>
                                                <option selected="true" hidden>Type</option>
                                                <option value="Organic">Organic</option>
                                                <option value="Non-Organic">Non-Organic</option>
                                            </select>
                                        </div>
                                        <div className="input">
                                            <select>
                                                <option selected="true" hidden>Location</option>
                                                <option value="BSD">BSD</option>
                                                <option value="Serpong">Serpong</option>
                                                <option value="Tangerang">Tangerang</option>
                                            </select>
                                        </div>
                                        <div className="input">
                                            <select>
                                                <option selected="true" hidden>Region</option>
                                                <option value="A1">A1</option>
                                                <option value="A2">A2</option>
                                            </select>
                                        </div>
                                        <div className="input">
                                            <select>
                                                <option selected="true" hidden>Max Capacity</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={30}>30</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            }
                            show={show}
                            close={() => setShow(false)}
                        />
                    </div>
                </div>

                <div className="col-12">
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

                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='5'
                                headData={employeeTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={employeeList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Trash
