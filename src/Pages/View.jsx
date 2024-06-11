import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style.css'

const View = () => {
  let navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem('users')) || [];
  const [record, setRecord] = useState(data)

  const handleDelete = (id) => {
    let ans = confirm("Delete User??");
    if (ans) {
      let filterDel = record.filter((val) => val.id !== id);
      setRecord(filterDel);
      localStorage.setItem('users', JSON.stringify(filterDel));
    }
  }
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-10 border shadow pt-4 p-5">
            <div className=" d-flex justify-content-between mb-4">
              <h3 className='text-center text-uppercase'>Users</h3>
              <Link to={'/'}>Add</Link>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th>Action</th>
                  <th>M-Status</th>
                  <th>M-Del</th>
                </tr>
              </thead>
              <tbody>
                {
                  record.map((val, i) => {
                    return (
                      <tr key={i}>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                        <td>{val.password}</td>
                        <td>
                          <span>
                            <button className='btn btn-danger' onClick={() => handleDelete(val.id)}>Del</button>
                          </span>
                          <span>
                            <button className='btn btn-primary ms-2' onClick={() => navigate('/edit', { state: val })}>Edit</button>
                          </span>
                        </td>
                      </tr>
                    )
                  })

                }
              </tbody>
            </table>

          </div>
        </div>
      </div>

    </div>
  )
}

export default View
