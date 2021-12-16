import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Table from '../components/table/Table'
import Modal from '../components/modal/Modal'
import { Icon } from '@iconify/react'


// redux
import { createUser, updateUser, deleteUser } from '../redux/actions/User';


const Employee = () => {

    // login
    const userLogin = JSON.parse(localStorage.getItem('profile'));
    console.log(userLogin)

    const employeeTableHead = userLogin.result.user_isAdmin === true ? ['name', 'email', 'phone', 'address', 'action'] : ['name', 'email', 'phone', 'address']


    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <tr key={index}>
            <td className='capitalize'>{item.user_nama}</td>
            <td>{item.user_email}</td>
            <td>+62 {item.user_phonenum}</td>
            <td className='capitalize'>{item.user_address}</td>
            {userLogin.result.user_isAdmin === true ?
                <td>
                    <a className='btn-edit' onClick={() => { setUserCurrId(item.id); setShow(true); }}><i className="bx bxs-edit"></i></a>&nbsp;/&nbsp;
                    <a className='btn-delete' onClick={() => { dispatch(deleteUser(item.id)); window.location.reload(false); }}><i className="bx bx-cut"></i></a>
                </td> :
                null}
        </tr>
    )



    // form
    const [userCurrId, setUserCurrId] = useState(null);

    const [userFormdata, setUserFormdata] = useState({
        user_nama: '', user_email: '', user_username: '', user_phonenum: ``, user_address: '', user_pwd: ''
    });

    const dispatch = useDispatch();

    const newUser = () => {
        if (userCurrId) {
            dispatch(updateUser(userCurrId, userFormdata));
        } else {
            dispatch(createUser(userFormdata));
        }
    }


    const user = useSelector((state) => userCurrId ? state.User.find((i) => i.id === userCurrId) : null);
    const users = useSelector(state => state.User)
    const employee = users.filter((item) => item.user_isAdmin == false);


    const [show, setShow] = useState(false);


    const clearForm = () => {
        setUserCurrId(null);
        setUserFormdata({
            user_nama: '', user_email: '', user_username: '', user_phonenum: ``, user_address: '', user_pwd: ''
        });
    }


    useEffect(() => {
        if (user) setUserFormdata(user);
    }, [user])


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
                <Icon icon="bx:bxs-user-circle" /> employee
            </h2>

            <div className="row">

                {userLogin.result.user_isAdmin === true ?
                    <div className="col-3">
                        <div className="card">
                            <button className="btn-primary flex" onClick={() => setShow(true)}>
                                <i className='bx bx-plus-medical'></i>
                                add new
                            </button>
                            <Modal
                                title={<h1><i className={userCurrId ? 'bx bxs-message-square-edit' : 'bx bxs-message-square-add'}></i> admin</h1>}
                                content={
                                    <form onSubmit={newUser}>

                                        {/* content */}
                                        <div className="modal-body">
                                            <div className="input">
                                                <input name="user_nama" type="text" placeholder="Name" value={userFormdata.user_nama} onChange={(e) => setUserFormdata({ ...userFormdata, user_nama: e.target.value })} />
                                            </div>
                                            <div className="input">
                                                {userCurrId ?
                                                    <input name="user_email" type="email" placeholder="E-mail" value={userFormdata.user_email} onChange={(e) => setUserFormdata({ ...userFormdata, user_email: e.target.value })} readOnly /> :
                                                    <input name="user_email" type="email" placeholder="E-mail" value={userFormdata.user_email} onChange={(e) => setUserFormdata({ ...userFormdata, user_email: e.target.value })} />
                                                }
                                            </div>
                                            <div className="input">
                                                <input name="user_username" type="text" placeholder="Username" value={userFormdata.user_username} onChange={(e) => setUserFormdata({ ...userFormdata, user_username: e.target.value })} />
                                            </div>
                                            <div className="input">
                                                <input name="user_phonenum" type="number" min="11" onKeyDown={e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()} placeholder="Phone Number" value={userFormdata.user_phonenum} onChange={(e) => setUserFormdata({ ...userFormdata, user_phonenum: e.target.value })} />
                                            </div>
                                            <div className="input">
                                                <input name="user_address" type="text" placeholder="Address" value={userFormdata.user_address} onChange={(e) => setUserFormdata({ ...userFormdata, user_address: e.target.value })} />
                                            </div>

                                            {userCurrId ? null :
                                                <div className="input">
                                                    <input name="user_pwd" type="password" placeholder="Password" value={userFormdata.user_pwd} onChange={(e) => setUserFormdata({ ...userFormdata, user_pwd: e.target.value })} />
                                                </div>
                                            }

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
                        </div>
                    </div> : null}

                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='5'
                                headData={employeeTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={employee}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Employee
