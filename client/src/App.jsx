import Login from './Login.jsx'
import CreateUser from './CreateUser.jsx'
import CreateStudent from './CreateStudent.jsx'
import Header from './components/Header.jsx'
import NavBar from './components/NavBar.jsx'


function App() {

  const isLoggedIn = !!localStorage.getItem('token')
  return (
    <>
    <Header />
    <NavBar />

    {isLoggedIn ?  <>
      <CreateUser />
      <CreateStudent />
    </> : <Login />}
    </>
  )
}

export default App
