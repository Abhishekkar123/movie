import { useState ,useEffect} from 'react'
import {fetchData} from './utils/api'
import { useSelector, useDispatch } from 'react-redux';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { getApiConfiguration,getGenre } from './store/homeSlice';
import './App.css'

import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import PageNotFound from './Pages/404/PageNotFound';
import Detail from './Pages/details/Detail';
import Explore from './Pages/explore/Explore';
import Home from './Pages/Homes/Home';
import Search from './Pages/searchResult/Search';


function App() {


  const dispatch=useDispatch();
 //i have save the value but want to acces that value
 const url = useSelector((state)=>state.home.url);
 console.log(url)

 useEffect(()=>{
  fetchApi();
  genresCall();
 },[])
 
 const fetchApi=()=>{
  fetchData('/configuration').then((resp)=>{
    console.log(resp);
  const url={
    backdrop:resp.images.secure_base_url + "original",
    poster:resp.images.secure_base_url + "original",
    profile:resp.images.secure_base_url + "original"

  }
    dispatch(getApiConfiguration(url));
  })
 }

 const genresCall=async ()=>{
  let promises=[];
  let endPoint=["tv","movie"];
  let allGenres={};
  endPoint.forEach((url)=>{
promises.push(fetchData(`/genre/${url}/list`))
  })
  const data=await Promise.all(promises);
  console.log("data",data)
  data.map(({genres})=>{
    return (genres.map((item)=> (allGenres[item.id]=item))

    )
  })
  // console.log(allGenres)
  dispatch(getGenre(allGenres));

 }
  

  return (
  <>
         <BrowserRouter>
         <Header/>
            <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/:mediaType/:id" element={<Detail/>} />
                    <Route path="/search/:query" element={<Search/>} />
                    <Route path="/explore/:mediaType" element={<Explore/>} />
                    <Route path="*" element={<PageNotFound />} />

            </Routes>
            <Footer/>
         </BrowserRouter>
  
  </>    
  )
}

export default App;
