
interface IData {
    id:any,
    name:string,
    age:number,
    location:string,
    status:boolean
}
import { create } from "zustand";

export const toDoList = create<any>((set, get) => ({
     data: [
  {
    id: "1",
    name: "John Brown",
    age: 32,
    location: "New York No. 1 Lake Park",
    status:false,
  },
  {
    id: "2",
    name: "Jim Green",
    age: 42,
    location: "London No. 1 Lake Park",
    status:true,
  },
  {
    id: "3",
    name: "Joe Black",
    age: 32,
    location: "Sydney No. 1 Lake Park",
    status:false,
  }
],
deleteUser: (id: number) => {
    set((state: any) => ({data: state.data.filter((user:IData) => user.id !== id)}))
},
addNewUser: (newUser:any) => {
  set((state:any) => ({data: [...state.data, {id: Date.now(), ...newUser}]}) )
},
changeStatus: (id:number) => {
  set((state:any) => ({data: state.data.map((user:IData) => user.id == id ? {...user, status: !user.status} : user) }))
},
editUser: (obj:any) => {
  set((state:any) => ({data:state.data.map((user:IData) => user.id == obj.id ? obj : user)}))
}
}))