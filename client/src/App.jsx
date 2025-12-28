import Login from './Login.jsx'
import CreateUser from './CreateUser.jsx'
import CreateStudent from './CreateStudent.jsx'


function App() {

  const isLoggedIn = !!localStorage.getItem('token')
  return (
    <>
    {isLoggedIn ?  <>
      <CreateUser />
      <CreateStudent />
    </> : <Login />}
    </>
  )
}

export default App
