import React from 'react'

function Container({ children }) {
  return (
    <div className='w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
      {children}
    </div>
  );
}

export default Container