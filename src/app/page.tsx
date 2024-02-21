"use client"

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer';

function Home() {

  return (
    <div>
      <Header />
      <Form />
      <Footer />
    </div>
  );
}

export default Home;
