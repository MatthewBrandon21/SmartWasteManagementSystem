import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Table from '../components/table/Table'
import Carousel from '../components/carousel/Carousel';
import Modal from '../components/modal/Modal'
import { Icon } from '@iconify/react';
import employeeList from '../assets/JsonData/employee-list.json'


const trashTableHead = [
    '',
    'name',
    'type',
    'location',
    'region',
    'max capacity',
    'current capacity'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.tempat_sampah_name}</td>
        <td>{item.tempat_sampah_jenis}</td>
        <td>{item.tempat_sampah_location}</td>
        <td>{item.tempat_sampah_region}</td>
        <td>{item.tempat_sampah_maxcapacity} kg</td>
        <td>{item.tempat_sampah_current.tempat_sampah_currentcapacity} kg</td>
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

    const trash = useSelector(state => state.Trash);

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
                                        <input type="number" value={0} hidden />
                                        <input value={false} hidden />
                                        <div className="input">
                                            <input type="text" placeholder="Name"/>
                                        </div>
                                        <div className="input">
                                            <select>
                                                <option selected="true" hidden>Type</option>
                                                <option value="Organic">Organic</option>
                                                <option value="Non-Organic">non-organic</option>
                                            </select>
                                        </div>
                                        <div className="input">
                                            <input type="text" placeholder="Location" />
                                        </div>
                                        <div className="input">
                                            <select>
                                                <option selected="true" hidden>Region</option>
                                                <option value="BSD">BSD</option>
                                                <option value="Serpong">Serpong</option>
                                                <option value="Tangerang">Tangerang</option>
                                            </select>
                                        </div>
                                        <div className="input">
                                            <select>
                                                <option selected="true" hidden>Max Capacity</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
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
                    <div className="card">
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

                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='5'
                                headData={trashTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={trash}
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
