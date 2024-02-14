import { useParams } from 'react-router-dom'

export default function Fights() {
  const { id } = useParams()
  return (
    <>
      <h1>Fights</h1>
      {id && <p>Fight ID: {id}</p>}
    </>
  )
}
