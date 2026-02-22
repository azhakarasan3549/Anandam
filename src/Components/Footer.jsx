import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-10 text-sm">
      © {new Date().getFullYear()} Matrimony. All rights reserved.
    </footer>
  );
}

export default Footer