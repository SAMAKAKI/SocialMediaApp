/* eslint-disable @typescript-eslint/no-restricted-imports */
import React, { useContext } from 'react'
import { ThemeContext } from '../themeProvider'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { FaRegMoon } from 'react-icons/fa'
import { LuSunMedium } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuthenticated } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/auth')
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Social Media App</p>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem className='lg:flex text-3xl cursor-pointer' onClick={() => toggleTheme()}>
          { theme === 'light' ? <FaRegMoon /> : <LuSunMedium /> }
        </NavbarItem>
        <NavbarItem>
          { isAuthenticated && (
            <Button color='default' variant='flat' className='gap-2' onClick={handleLogOut}>
              <CiLogout /> <span>Log out</span>
            </Button>
          ) }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
