
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Root = () => {
  return (
    <div>
      <Header/>
    <main>
      <Outlet />
    </main>
      <Footer />
    </div>
  )
}

export default Root
