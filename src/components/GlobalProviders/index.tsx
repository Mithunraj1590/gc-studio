import React, { ReactNode } from 'react';
import LenisScroll from '../LenisScroll';

interface GlobalProvidersProps {
  children: ReactNode;
}

const GlobalProviders: React.FC<GlobalProvidersProps> = ({ children }) => {
  return (
    <>
      <LenisScroll>
        {children}
      </LenisScroll>
    </>
  );
}

export default GlobalProviders;

