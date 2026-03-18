import { BrowserRouter, Route, Routes } from 'react-router'
import "../src/Page/Info"
import Info from '../src/Page/Info'
import Home from './Page/Home'
const App = () => {
  return (
     <BrowserRouter>
    <Routes>
      <Route path='/Info/:id' element={<Info/>}/>
      <Route index element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App