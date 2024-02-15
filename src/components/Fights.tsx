// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/auth'
import axios from 'axios'
import RequireAuth from "./RequireAuth"

export default function Fights() {
  // const { id } = useParams()

  const [fights, setFights] = useState([])

  return (
    <>
      <RequireAuth>
        <h1>Fights</h1>
        { fights && fights.map((fight: any) => {
          return (
            <div key={fight?.id}>
              <h2>{fight?.name}</h2>
            </div>
          )
        }) }
      </RequireAuth>
    </>
  )
}
