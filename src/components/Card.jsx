function Card(data) {
  return (

    <div className="card">
      <div className="card-head">
        <h1>{data.data['name']}</h1>
      </div>
      <div className="card-body">
        <p>{data.data['description']}</p>
      </div>
    </div>

  )
}

export default Card;