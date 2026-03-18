import  { useState } from 'react'
import { useParams } from 'react-router'
import { toDoList } from '../../store/toDo'
import { Button, Input, Modal } from 'antd'
import { useFormik } from 'formik'

interface IData {
    id:any,
    name:string,
    age:number,
    location:string,
    status:boolean
}
const Info = () => {
    let {id} = useParams()
    let {data} = toDoList()
    let user = data.find((el:IData) => el.id == id)
    let {editUser} = toDoList()
    
    let {handleChange, handleSubmit, values, setFieldValue} = useFormik({
        initialValues: {
            name:"",
            age:0,
            location:"",
            status:false
        },
        onSubmit: (values) => {
           editUser(values)
           handleCancelEdit()
        }
      })

      let handleEdit = (user:IData) => {
        setFieldValue("id", user.id)
        setFieldValue("name", user.name)
        setFieldValue("age", user.age)
        setFieldValue("location", user.location)
      }
    //editModal;
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    
      const showModalEdit = () => {
        setIsModalOpenEdit(true);
      };
    
      const handleOkEdit = () => {
        setIsModalOpenEdit(false);
      };
    
      const handleCancelEdit = () => {
        setIsModalOpenEdit(false);
      };
  return (
    <>
    <div className='w-[400px] shadow-xl py-[40px] rounded-4xl m-auto mt-[60px]' style={{lineHeight:"40px"}}>
        <p className='text-center text-[30px] text-[gray] mb-[10px]'>Information:</p>
        <h1 className='flex items-center justify-between px-[30px]'> <b className='text-[20px]'>Id :</b> {user?.id}</h1>
        <h1 className='flex items-center justify-between px-[30px]'><b className='text-[20px]'>Name :</b> {user?.name}</h1>
         <p className='flex items-center justify-between px-[30px]'><b className='text-[20px]'>Age :</b> {user?.age}</p>
         <p className='flex items-center justify-between px-[30px] mb-[20px]'><b className='text-[20px]'>Location :</b> {user?.location}</p>
       {user?.status && (
           <p className='Active'>Active</p>
        )}
       {!user?.status && (
           <p className='Inactive'>Inactive</p>
        )}
       <Button onClick={() => {showModalEdit(), handleEdit(user)}} type='primary' className='relative left-[30px] ' style={{width:"342px", marginTop:"20px", height:"45px", fontSize:"18px", fontWeight:"660"}}>Edit User</Button>
    </div>
    <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
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

export default Info