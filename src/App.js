import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import NavBar from './components/NavBar'
import Routes from './components/Routes'

const App = () => {
    return (
        <div>
            <Router>
                <NavBar />
                <Routes />
            </Router>

        </div>
    )
}

export default App;
