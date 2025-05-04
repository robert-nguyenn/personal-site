import { BrowserRouter, Routes } from "react-router-dom"
import { NotFound } from "./pages/NotFound"
import { Home } from "lucide-react"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
