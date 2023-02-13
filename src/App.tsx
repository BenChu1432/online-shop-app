import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from "./frontend/ui/page/MainPage";
import Shop from "./frontend/ui/page/Shop";
import LoginPage from "./frontend/ui/page/LoginPage";
import ProductDetailPage from "./frontend/ui/page/ProductDetailPage";
import {HashRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./frontend/ui/page/RegisterPage";
import ForgotPasswordPage from "./frontend/ui/page/ForgotPasswordPage";
import ShoppingCartPage from "./frontend/ui/page/ShoppingCart";
import PaymentSuccessfulPage from "./frontend/ui/page/PaymentSuccessfulPage";
import VerificationEmailSentPage from "./frontend/ui/page/VerificationEmailAlreadySentPage";
import {UsernameContext} from './frontend/ui/Context/UsernameContext';
import {UserData} from "./frontend/data/UserData";
import {LoginUserContext} from "./frontend/ui/Context/LoginUserContext";
import AboutUs from "./frontend/ui/page/AboutUs";
import FAQ from "./frontend/ui/page/FAQ";
import Shipping from "./frontend/ui/page/Shipping";
import BulkOrders from "./frontend/ui/page/BulkOrders";
import {HamburgerMenuContext} from "./frontend/ui/Context/HamburgerMenuContext";
import ErrorPage from "./frontend/ui/page/ErrorPage";
import MyFavoritePage from "./frontend/ui/page/MyFavoritePage";
import UploadPrototypePage from "./frontend/ui/page/UploadPrototypePage";

function App() {
    const [username,setUsername]=useState<string|undefined>(undefined);
    const [currentUser, setCurrentUser]=useState<UserData | null | undefined>(undefined);
    const [hamburgerMenuIsClicked,setHamburgerMenuIsClicked]=useState<boolean>(false);

  return (
      <div className={"App"}>
          <UsernameContext.Provider value={{username,setUsername}}>
              <LoginUserContext.Provider value={{currentUser,setCurrentUser}}>
                  <HamburgerMenuContext.Provider value={{hamburgerMenuIsClicked,setHamburgerMenuIsClicked}}>
                      <HashRouter>
                          <Routes>
                              <Route path="*" element={<ErrorPage/>}/>
                              <Route path="/" element={<MainPage/>}/>
                              <Route path="/aboutus" element={<AboutUs/>}/>
                              <Route path="/upload-prototype" element={<UploadPrototypePage/>}/>
                              <Route path="/productdetail/:productId" element={<ProductDetailPage/>} />
                              <Route path="/login" element={<LoginPage/>} />
                              <Route path="/register" element={<RegisterPage/>}/>
                              <Route path="/verification-email" element={<VerificationEmailSentPage/>}/>
                              <Route path="/forgotpassword" element={<ForgotPasswordPage/>}/>
                              <Route path="/shop/:theme" element={<Shop/>}/>
                              <Route path="/myfavorite" element={<MyFavoritePage/>}></Route>
                              <Route path="/shoppingcart" element={<ShoppingCartPage/>} />
                              <Route path="/transaction/:tid/success" element={<PaymentSuccessfulPage/>}/>
                              <Route path="/FAQ" element={<FAQ/>}/>
                              <Route path="/shipping" element={<Shipping/>}/>
                              <Route path="/bulkorders" element={<BulkOrders/>}/>
                          </Routes>
                      </HashRouter>
                  </HamburgerMenuContext.Provider>
              </LoginUserContext.Provider>
          </UsernameContext.Provider>
      </div>
  );
}

export default App;
