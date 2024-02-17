// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Fights() {
  // const { id } = useParams()

  const [fights, setFights] = useState([])

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
