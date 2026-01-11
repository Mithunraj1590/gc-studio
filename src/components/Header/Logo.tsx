'use client'

import React from 'react'
import Link from 'next/link'
import Style from './Header.module.scss'

const Logo: React.FC = () => {
  return (
    <Link href="/" className={`${Style.Logo} text-white`}>
      <span>Logo</span>
    </Link>
  )
}

export default Logo

