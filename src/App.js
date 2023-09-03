import './App.css';
import React, { useState} from 'react'
import News from './components/components/News'
import NavBar from './components/components/NavBar';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


const App=()=> {
  const pageSize=6;
 const [progress, setProgress] = useState(0) 
 

    return (
      <div>
        <Router>
        
        <NavBar/>
        <LoadingBar
        color='	#008080'
        progress={progress}
        height={9}
      />
        <Routes>
          <Route path="/" element={< News  setProgress={setProgress}  key='general' pageSize={pageSize} country="in" category="general"/>}></Route>
          <Route path="/Business" element={ <News setProgress={setProgress} key='business'  pageSize={pageSize} country="in" category="business"/>}></Route>
          <Route path="/Entertainment" element={<News setProgress={setProgress} key='entertainment'  pageSize={pageSize} country="in" category="entertainment"/>}></Route>
          <Route path="/General" element={ <News setProgress={setProgress} key='general'  pageSize={pageSize} country="in" category="general"/>}></Route>
          <Route path="/Health" element={ <News setProgress={setProgress}  key='health'  pageSize={pageSize} country="in" category="health"/>}></Route>
          <Route path="/Science" element={ <News setProgress={setProgress} key='science'  pageSize={pageSize} country="in" category="science"/>}></Route>
          <Route path="/Sports" element={ <News setProgress={setProgress} key='sports'  pageSize={pageSize} country="in" category="sports"/>}></Route>
          <Route path="/Technology" element={ <News setProgress={setProgress}  key='technology}>' pageSize={pageSize} country="in" category="technology"/>}></Route>

        </Routes>
        </Router>
      </div>
    )
}
export default App
