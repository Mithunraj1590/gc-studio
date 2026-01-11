'use client'

import React from 'react'
import Icons from '@/styles/Icons'
import Style from './Header.module.scss'

interface SearchIconProps {
  onToggle: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({ onToggle }) => {
  const handleSearchClick = (): void => {
    onToggle();
  }

  return (
    <button
      onClick={handleSearchClick}
      className={`${Style.SearchIcon} text-white cursor-pointer z-10 relative`}
      aria-label="Search"
    >
      <Icons icon="icon-search" size={24} />
    </button>
  )
}

export default SearchIcon

