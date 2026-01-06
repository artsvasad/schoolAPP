import Login from './pages/Login.jsx'
import CreateUser from './pages/CreateUser.jsx'
import CreateStudent from './pages/CreateStudent.jsx'
import Header from './components/Header.jsx'
import ListAllStudents from './pages/ListAllStudents.jsx'
import NavBar from './components/NavBar.jsx'
import RoleGate from './config/RoleGate.jsx'


function App() {
  const isLoggedIn = !!localStorage.getItem('token')

  if(!isLoggedIn){
    return <Login/>
  }

  return(
    <>
    <NavBar/>
    <Header/>
    <RoleGate allowedRoles={['super', 'admin']}>
      <CreateUser/>
    </RoleGate>
    </>
  )

}

export default App
