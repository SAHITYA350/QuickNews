import Category from './components/Category'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import News from './page/News'

const App = () => {
  return (
    <>
     <Navbar className={'sticky top-0 z-20'} />
     <Category classname="py-2 sticky top-14 z-10 bg-base-100" />
     <News className={'pb-10'} />
     <Footer />
    </>
  )
}

export default App
