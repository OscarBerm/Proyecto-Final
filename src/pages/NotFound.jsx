import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

const NotFound = () => {

  return (
    <div className='container text-center mt-5'>
      <div className='error-code'>404</div>
      <h2 className='mt-4 text-danger'>¡Oops! Página no encontrada.</h2>
      <p className='text-muted'>La página que estás buscando no existe o ha sido movida.</p>
      <Link to='/' className='home-link'>
        Volver a la página principal
      </Link>
    </div>
  )
}

export default NotFound