/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import NavButton from '../navButton'
import { BsPostcard } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { FaUsers } from 'react-icons/fa'

const NavBar = () => {
  return (
    <nav>
      <ul className='flex flex-col gap-5'>
        <li>
          <NavButton href='/' icon={<BsPostcard />}>Posts</NavButton>
          <NavButton href='following' icon={<FiUsers />}>Subscriptions</NavButton>
          <NavButton href='followers' icon={<FaUsers />}>Subscribers</NavButton>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
