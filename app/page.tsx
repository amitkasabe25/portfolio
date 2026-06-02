import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Journey from './components/Journey'
import TechStack from './components/TechStack'

import MyWork from './components/MyWork'
import ContactMe from './components/ContactMe'
import Footer from './components/Footer'

import { createClient } from './lib/supabase/server'



const PHOTO_URL = '/1767367971817.png'

const page = async () => {
  

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')

  return (
    <main>
      <Navbar />
      <section id="home"><Hero /></section>
      <section id="journey"><Journey /></section>
      <section id="stack"><TechStack /></section>
      <section id="work"><MyWork /></section>
      <section id="contact"><ContactMe /></section>
      <footer><Footer /></footer>

    </main>
  )
}

export default page