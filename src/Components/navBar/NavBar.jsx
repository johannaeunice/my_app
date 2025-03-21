import React from 'react'
import { Button } from "@/components/ui/button";

function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
            <h1 className="text-2xl font-bold tracking-wide">Malingo</h1>
            <div className="space-x-4">
              <Button variant="outline" href="/">About Us</Button>
              <Button variant="outline" href="/">Contact Us</Button>
              <Button href="/login">Login</Button>
              <Button href="/signup">Create Account</Button>
            </div>
          </nav>
  )
}

export default NavBar