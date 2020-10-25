import React from 'react'
import { Flex } from '@chakra-ui/core'
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

  const MotionFlex = motion.custom(Flex)
  return (
    <React.Fragment>
      {navLinkList.map((link) => {
        return (
          <MotionFlex
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            key={link.title}
          >
            <Link href={link.path} passHref>
              <NavLink>{link.title}</NavLink>
            </Link>
          </MotionFlex>
        )
      })}
    </React.Fragment>
  )
}

const NavLink = styled.a`
  padding: 0.1rem 0.5rem;
  margin: 0.2rem;
  border-bottom: #9b2c2c 2px solid;
  border-bottom-length: 75%;
  &:hover {
    background-color: #9b2c2c;
    cursor: pointer;
    border-radius: 3px;
    color: #fff;
  }
  &:focus {
    outline-color: #212121;
    outline-width: 5px;
  }
`
