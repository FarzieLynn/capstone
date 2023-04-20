import React, { useEffect, useContext, useState } from 'react'
import { Table } from 'react-bootstrap'
import { AppContext } from '../App'
import cookie from 'cookie';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/ProfessionalsTable.css'

const ProfessionalsTable = ({type}) => {
  const { url, token } = useContext(AppContext);
  const [professionals, setProfessionals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${url}/users/professionals`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        data = data.filter(professional => professional.roles.includes(type))
        setProfessionals(data)})
  }, [])
  return (
    professionals.length !== 0 ? 
    <div className="professionals-main">
      <Table striped variant='light' className="text-center">
      <thead>
        <tr>
          <th>Name</th>
          <th>About Me</th>
        </tr>
      </thead>
      <tbody>
        {professionals.map(professional => {
          return (
            <tr key={professional.publicData.id} onClick={() => navigate(`/profile/${professional.publicData.username}`)}>
              <td>{professional.publicData.full_name}</td>
              <td>{professional.publicData.about_you}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    </div> :
    <div>
      <h1>No professionals found</h1>
    </div>
  )
}

export default ProfessionalsTable