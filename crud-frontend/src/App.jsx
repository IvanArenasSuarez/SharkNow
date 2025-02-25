
import './App.css'
import Navbar from './components/Navbar'
import Login_Form from './components/Login_Form'
import Login_Carrusel from './components/Login_Carrusel'

function App() {
  
  return (
    <>
    <div className="flex h-screen">
      <div className='flex-[2] flex justify-center items-center'>
      <Login_Carrusel />
      </div>
      <div className='flex-[2] flex justify-center items-center'>
       <Login_Form />
       </div>
       </div>
    </>
  )
}

export default App
