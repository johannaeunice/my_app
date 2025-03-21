import React from 'react'

function FooterComponent() {
  return (
    <div>
         {/* Footer */}
      <footer className="bg-black text-white text-center p-6 mt-10">
        <p>&copy; {new Date().getFullYear()} Malingo. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default FooterComponent