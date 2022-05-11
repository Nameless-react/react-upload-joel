import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Form, NotFound } from "./pages/index";
import LayoutProviders from './context/postContext';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <LayoutProviders>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/postform' element={<Form />} />
          <Route path='/edit/:id' element={<Form />}/>
          <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster />
    </LayoutProviders>
  );
}
