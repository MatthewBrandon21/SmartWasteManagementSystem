import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Table from '../components/table/Table'
import Carousel from '../components/carousel/Carousel';
import Modal from '../components/modal/Modal'
import { Icon } from '@iconify/react';


// redux
import { createTrash, updateTrash, deleteTrash } from '../redux/actions/Trash';


const Trash = () => {

    // login
    const userLogin = JSON.parse(localStorage.getItem('profile'));
    console.log(userLogin)

    const trashTableHead = [
        'name',
        'type',
        'location',
        'region',
        'max capacity',
        'current capacity',
        'action'
    ]


    // form
    const [trashCurrId, setTrashCurrId] = useState(null);

    const [trashFormdata, setTrashFormdata] = useState({
        tempat_sampah_jenis: '',
        tempat_sampah_name: '',
        tempat_sampah_location: '',
        tempat_sampah_region: '',
        tempat_sampah_maxcapacity: ``,
        // tempat_sampah_totalcapacitythismonth: 0,
        // tempat_sampah_current: {
        //     tempat_sampah_gpslocation: {
        //         lon: 0, lat: 0
        //     },
        //     tempat_sampah_currentcapacity: 0,
        //     tempat_sampah_currentlevel: 0
        // },
        tempat_sampah_isfull: false
    });

    const dispatch = useDispatch();


    const newTrash = (e) => {
        e.preventDefault();
        console.log(trashFormdata)

        if (trashCurrId) {
            dispatch(updateTrash(trashCurrId, trashFormdata));
        } else {
            dispatch(createTrash(trashFormdata));
        }
    }


    const trash = useSelector((state) => trashCurrId ? state.Trash.find((i) => i.id === trashCurrId) : null);
    const trashs = useSelector((state) => state.Trash)


    const [show, setShow] = useState(false);
    const [showww, setShowww] = useState(false);


    const clearForm = () => {
        setTrashCurrId(null);
        setTrashFormdata({
            tempat_sampah_jenis: '',
            tempat_sampah_name: '',
            tempat_sampah_location: '',
            tempat_sampah_region: '',
            tempat_sampah_maxcapacity: ``,
            tempat_sampah_isfull: ``
        });
    }


    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <tr key={index}>
            <td className='capitalize'>{item.tempat_sampah_name}</td>
            <td className='capitalize'>{item.tempat_sampah_jenis}</td>
            <td className='capitalize'>{item.tempat_sampah_location}</td>
            <td>{item.tempat_sampah_region}</td>
            <td>{item.tempat_sampah_maxcapacity} kg</td>
            <td>{item.tempat_sampah_current.tempat_sampah_currentcapacity} kg</td>

            <td>

                {userLogin.result.user_isAdmin === true ?
                    <div>
                        <a className='btn-edit' onClick={() => { setTrashCurrId(item.id); setShow(true); }}><i className="bx bxs-edit"></i></a>&nbsp;/&nbsp;
                        <a className='btn-delete' onClick={() => { dispatch(deleteTrash(item.id)); window.location.reload(false); }}><i className="bx bx-cut"></i></a>
                    </div>
                    : userLogin.result.user_isAdmin === false && item.tempat_sampah_isfull === true ?
                        <a className='btn-check' onClick={() => { setTrashCurrId(item.id); setShowww(true); }}><i className="bx bxs-check-square"></i></a>
                        : null}

            </td>
        </tr >
    )


    useEffect(() => {
        if (trash) setTrashFormdata(trash);
    }, [trash])


    useEffect(() => {
        if (showww === false) {
            document.body.style.overflow = "";
            clearForm();
        } else {
            document.body.style.overflow = "hidden";
        }
    }, [showww]);

    useEffect(() => {
        if (show === false) {
            document.body.style.overflow = "";
            clearForm();
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

                {userLogin.result.user_isAdmin === true ?
                    <div className="col-3">
                        <div className="card">
                            <button className="btn-primary flex" onClick={() => setShow(true)}>
                                <i className='bx bx-plus-medical'></i>
                                add new
                            </button>

                        </div>
                    </div> : null}

                <Modal
                    title={<h1><i className={trashCurrId ? 'bx bxs-message-square-edit' : 'bx bxs-message-square-add'}></i> trash</h1>}
                    content={
                        <form onSubmit={newTrash}>

                            {/* content */}
                            <div className="modal-body">
                                <div className="input-checkbox">
                                    <input name='tempat_sampah_isfull' type="checkbox" defaultChecked={false} value={false} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_isfull: e.target.value })} />
                                    &nbsp;&nbsp;&nbsp;&nbsp;Check the box to confirm
                                </div>
                            </div>

                            {/* footer */}
                            <div className="modal-footer">
                                <button type="submit" className="btn-secondary">
                                    submit
                                </button>
                            </div>

                        </form>
                    }
                    show={showww}
                    close={() => setShowww(false)}
                />

                <Modal
                    title={<h1><i className={trashCurrId ? 'bx bxs-message-square-edit' : 'bx bxs-message-square-add'}></i> trash</h1>}
                    content={
                        <form onSubmit={newTrash}>

                            {/* content */}
                            <div className="modal-body">
                                <div className="input">
                                    <input name='tempat_sampah_name' type="text" placeholder="Trash Name" value={trashFormdata.tempat_sampah_name} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_name: e.target.value })} />
                                </div>
                                <div className="input">
                                    {
                                        trashCurrId && trashFormdata.tempat_sampah_jenis === "organic" ?
                                            <select value={trashFormdata.tempat_sampah_jenis} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_jenis: e.target.value })}>
                                                <option value="organic">Organic</option>
                                                <option value="non-organic">Non-organic</option>
                                            </select> : trashCurrId && trashFormdata.tempat_sampah_jenis === "non-organic" ?
                                                <select value={trashFormdata.tempat_sampah_jenis} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_jenis: e.target.value })}>
                                                    <option value="organic">Organic</option>
                                                    <option value="non-organic">Non-organic</option>
                                                </select> :
                                                <select value={trashFormdata.tempat_sampah_jenis} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_jenis: e.target.value })}>
                                                    <option hidden>Type</option>
                                                    <option value="organic">Organic</option>
                                                    <option value="non-organic">Non-organic</option>
                                                </select>
                                    }
                                </div>
                                <div className="input">
                                    <input name='tempat_sampah_location' type="text" placeholder="Location" value={trashFormdata.tempat_sampah_location} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_location: e.target.value })} />
                                </div>
                                <div className="input">
                                    {
                                        trashCurrId && trashFormdata.tempat_sampah_region === "BSD" ?
                                            <select value={trashFormdata.tempat_sampah_region} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_region: e.target.value })}>
                                                <option value="BSD">BSD</option>
                                                <option value="Serpong">Serpong</option>
                                                <option value="Tangerang">Tangerang</option>
                                            </select> : trashCurrId && trashFormdata.tempat_sampah_region === "Serpong" ?
                                                <select value={trashFormdata.tempat_sampah_region} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_region: e.target.value })}>
                                                    <option value="BSD">BSD</option>
                                                    <option value="Serpong">Serpong</option>
                                                    <option value="Tangerang">Tangerang</option>
                                                </select> : trashCurrId && trashFormdata.tempat_sampah_region === "Tangerang" ?
                                                    <select value={trashFormdata.tempat_sampah_region} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_region: e.target.value })}>
                                                        <option value="BSD">BSD</option>
                                                        <option value="Serpong">Serpong</option>
                                                        <option value="Tangerang">Tangerang</option>
                                                    </select> :
                                                    <select value={trashFormdata.tempat_sampah_region} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_region: e.target.value })}>
                                                        <option hidden>Region</option>
                                                        <option value="BSD">BSD</option>
                                                        <option value="Serpong">Serpong</option>
                                                        <option value="Tangerang">Tangerang</option>
                                                    </select>
                                    }
                                </div>
                                <div className="input">
                                    {
                                        trashCurrId && trashFormdata.tempat_sampah_maxcapacity === 10 ?
                                            <select value={trashFormdata.tempat_sampah_maxcapacity} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_maxcapacity: e.target.value })}>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select> : trashCurrId && trashFormdata.tempat_sampah_maxcapacity === 20 ?
                                                <select value={trashFormdata.tempat_sampah_maxcapacity} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_maxcapacity: e.target.value })}>
                                                    <option value={10}>10</option>
                                                    <option value={20}>20</option>
                                                </select> :
                                                <select value={trashFormdata.tempat_sampah_maxcapacity} onChange={(e) => setTrashFormdata({ ...trashFormdata, tempat_sampah_maxcapacity: e.target.value })}>
                                                    <option hidden>Max Capacity</option>
                                                    <option value={10}>10</option>
                                                    <option value={20}>20</option>
                                                </select>
                                    }
                                </div>
                            </div>

                            {/* footer */}
                            <div className="modal-footer">
                                <button type="submit" className="btn-secondary">
                                    submit
                                </button>
                            </div>

                        </form>
                    }
                    show={show}
                    close={() => setShow(false)}
                />

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
                            <Carousel data={trashs} />
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
                                bodyData={trashs}
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
