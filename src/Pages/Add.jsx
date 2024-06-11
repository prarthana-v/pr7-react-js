import React, { useState } from 'react'
import { Link, json } from 'react-router-dom'

const Add = () => {

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")
  let data = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : []
  const [record, setRecord] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      id: Date.now(), name, email, password, status
    }
    let newObj = [...record, obj];
    setRecord(newObj);
    localStorage.setItem(('users'), JSON.stringify(newObj));
    alert('new user added...');
    // console.log(record);
    setPassword("")
    setname("")
    setemail("")
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-7 border shadow pt-4 p-5">
            <div className=" d-flex justify-content-between mb-4">
              <h3 className='text-center text-uppercase'>Login Form</h3>
              <Link to={'/view'}>View</Link>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label" >Full Name</label>
                <input type="text" placeholder='Jhon Smith' className="form-control" aria-describedby="emailHelp" onChange={(e) => setname(e.target.value)} value={name || ""} />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="text" className="form-control" placeholder='example@name.com' aria-describedby="emailHelp" onChange={(e) => setemail(e.target.value)} value={email || ""} />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Passowrd</label>
                <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
