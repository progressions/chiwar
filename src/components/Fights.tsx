// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/auth'
import axios from 'axios'

export default function Fights() {
  // const { id } = useParams()

  const { jwt } = useAuth()
  const [fights, setFights] = useState([])

  console.log(jwt)

  useEffect(() => {
    const response = axios({
      method: 'get',
      url: 'http://localhost:3000/api/v1/fights',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      }
    }).catch((error) => {
      console.log("error", error)
      return error
    }).then((response) => {
      console.log("response", response)
      setFights(response.data.fights)
    })
  }, [])

  console.log(fights)

  return (
    <>
      <h1>Fights</h1>
      { fights && fights.map((fight: any) => {
        return (
          <div key={fight?.id}>
            <h2>{fight?.name}</h2>
          </div>
        )
      }) }
    </>
  )
}
