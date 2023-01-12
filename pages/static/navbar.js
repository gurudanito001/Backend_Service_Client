import React from 'react'

const navbar = () => {
  return (
    <>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
  <a class="navbar-brand" href="#">Marlayer</a>
  <a class="navbar-brand" href="#">docs</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav ms-auto">
      <a class="nav-item nav-link active" href="#"><button className='btn btn-primary'>Get Started</button></a>
      <a class="nav-item nav-link active" href="#"><button className='btn btn-success'>Login</button></a>
    </div>
  </div>
    </div>
</nav>
    </>
  )
}

export default navbar 