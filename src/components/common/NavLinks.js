import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import Link from 'next/link'

export function NavLinks() {
  const navLinkList = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'About',
      path: '/about',
    },
    {
      title: 'Questions',
      path: '/questions',
    },
    {
      title: 'UK Countries',
      path: '/countries',
    },
  ]

  const MotionFlex = motion.custom(NavLink)
  return (
    <>
      {navLinkList.map((link, index) => {
        return (
          <Link href={link.path} passHref key={index}>
            <MotionFlex
              whileTap={{ scale: 0.9 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: '#9b2c2c',
                borderRadius: '3px',
                transition: { ease: 'linear' },
                color: 'rgb(255, 255, 255)',
              }}
              key={link.title}
            >
              {link.title}
            </MotionFlex>
          </Link>
        )
      })}
    </>
  )
}

const NavLink = styled.a`
  padding: 0.1rem 0.5rem;
  margin: 0.2rem;
  border-bottom: #9b2c2c 2px solid;
  border-bottom-length: 75%;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline-color: #212121;
    outline-width: 5px;
  }
`
