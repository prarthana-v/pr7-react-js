import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style.css'

const View = () => {
  let navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem('users')) || [];
  const [record, setRecord] = useState(data)
  const [mStatus, setMStatus] = useState([]);
  const [mDelete, setMDelete] = useState([])
  const handleDelete = (id) => {
    let ans = confirm("Delete User??");
    if (ans) {
      let filterDel = record.filter((val) => val.id !== id);
      setRecord(filterDel);
      localStorage.setItem('users', JSON.stringify(filterDel));
    }
  }

  const MultipleStatus = (id, checked) => {
    let all = [...mStatus];
    if (checked) {
      all.push(id);
    }
    else {
      all = all.filter((val) => val !== id);
    }
    setMStatus(all)
  }

  const handleMultipleStatus = () => {
    if (mStatus.length > 0) {
      let filterStatus = record.map((val) => {
        if (mStatus.includes(val.id)) {
          if (val.status == "deactive") {
            val.status = "active"
          }
          else {
            val.status = "deactive"
          }
        }
        return val;
      })
      setRecord(filterStatus);
      localStorage.setItem('users', JSON.stringify(filterStatus));
      setMStatus("");
    }
    else {
      alert("Please select at least one user to change status");
    }
  }

  // multiple  delete
  const MultipleDelete = (id, checked) => {
    let all = [...mDelete];
    if (checked) {
      all.push(id);
    }
    else {
      all = all.filter((val) => val.id !== id);
    }
    setMDelete(all);
  }

  const handleMultipleDelete = () => {
    if (mDelete.length > 0) {
      let filteredData = record.filter((val) => !mDelete.includes(val.id));
      setRecord(filteredData);
      localStorage.setItem('users', JSON.stringify(filteredData));
      setMDelete("");
    }
    else {
      alert("Please select at least one user to delete");
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
                  <th>Status</th>
                  <th>Action</th>
                  <th>
                    <button className='btn btn-light border' onClick={() => handleMultipleStatus()}>M-Status</button>
                  </th>
                  <th>
                    <button className='btn btn-light border' onClick={() => handleMultipleDelete()}>M-Del</button>
                  </th>
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
                          {
                            val.status === 'deactive' ? (
                              <button className='btn btn-secondary'>{val.status}</button>
                            ) : (
                              <button className='btn btn-success'>{val.status}</button>
                            )
                          }
                        </td>
                        <td>
                          <span>
                            <button className='btn btn-danger' onClick={() => handleDelete(val.id)}>Del</button>
                          </span>
                          <span>
                            <button className='btn btn-primary ms-2' onClick={() => navigate('/edit', { state: val })}>Edit</button>
                          </span>
                        </td>
                        <td>
                          <input type="checkbox" onChange={(e) => MultipleStatus(val.id, e.target.checked)} checked={mStatus.includes(val.id)} />
                        </td>
                        <td>
                          <input type="checkbox" onChange={(e) => MultipleDelete(val.id, e.target.checked)} checked={mDelete.includes(val.id)} />
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
