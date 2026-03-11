import { Button, Checkbox, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router'
import { toDoList } from '../../store/toDo'
import "../App.css"
import { useFormik } from 'formik'

interface IData {
    id:any,
    name:string,
    age:number,
    location:string,
    status:boolean
}
const Home = () => {
    let {data, deleteUser, addNewUser, changeStatus} = toDoList()
    let [search, setSearch] = useState("")
    let [select, setSelect] = useState("")

    //addModal;
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };

  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  let {handleChange, handleSubmit, resetForm, values} = useFormik({
    initialValues: {
        name:"",
        age:0,
        location:"",
        status:false
    },
    onSubmit: (values) => {
        addNewUser(values)
        handleCancelAdd()
        resetForm()
    }
  })


  return (
    <>
    <div className='flex mt-[40px] items-center justify-between px-[80px]'>

    <div className='flex gap-[20px]'>
        <Input onChange={(e) => setSearch(e.target.value)} style={{width:"280px", height:"45px"}} placeholder='Search by Name...'/>
    <select onChange={(e) => setSelect(e.target.value)} className='border-[1px] border-[lightgray] py-[9px] px-[20px] rounded-[12px]' name="status" id="">
        <option value="">All</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
    </select>
    </div>
    <div>
        <Button style={{width:"170px", height:"45px"}} type='primary' onClick={showModalAdd}>+ Add New User</Button>
    </div>
    </div>
        <table className="users-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Age</th>
        <th>Location</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
  {data.filter((user:IData) => user.name.toLowerCase().includes(search.toLowerCase())).filter((user:IData) => user.status.toString().includes(select)).map((user: IData, i:any) => (
    <tr key={user.id}>
      <td>{i + 1}</td>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.location}</td>
      <td>
        <span className={user.status ? "status-active" : "status-inactive"}>
          {user.status ? "Active" : "Inactive"}
        </span>
      </td>
      <td>
        <Link to={`/Info/${user.id}`}>
        <button className="action-btn btn-info">Info</button>
        </Link>

        {/* <button className="action-btn btn-edit"  >Edit</button> */}

        <button className="action-btn btn-delete" onClick={() => deleteUser(user.id)}>Delete</button>
        <Checkbox onChange={() => changeStatus(user.id)} />
      </td>
    </tr>
  ))}
</tbody>
  </table>
  <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpenAdd}
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
        footer={null}
      >
       <form onSubmit={handleSubmit}>
        <Input style={{marginTop:"20px", height:"45px"}} onChange={handleChange} name='name' value={values.name} placeholder='Name'/>
        <Input style={{marginTop:"20px", height:"45px"}} onChange={handleChange} name='age' value={values.age} placeholder='Age'/>
        <Input style={{marginTop:"20px", height:"45px"}} onChange={handleChange} name='location' value={values.location} placeholder='Location'/>
        <div className='flex items-center justify-between'>
         <select className='border-[1px] border-[lightgray] py-[8px] mt-[15px] px-[20px] rounded-[12px]' name='status' onChange={handleChange} value={values.status.toString()}>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button className='border-[1px] mt-[15px] border-[lightgray] py-[7px] px-[20px] rounded-[12px] ' type='submit'>Save</button>
        </div>
       </form>
      </Modal>
    </>
  )
}

export default Home