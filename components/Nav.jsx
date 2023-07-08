"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders(); 
  }, []);

  

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" width="30" height="30" alt="Promptopia Logo" className="object-contain" />
        <p className="logo-text">Promptopia</p>
      </Link>

      {/* Desktop views */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="create-prompt" className="black_btn">Create Post</Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href="/profile">
              <Image src={session?.user.image} width={30} height={30} alt="profile" className="rounded-full" />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">Sign In</button>
            ))}
          </>
        )}
      </div>

      {/* Mobile view */}
      <div className="sm:hidden flex relative">
        { session?.user ? (
          <div className="flex">
            <Image src={session?.user.image} width={30} height={30} alt="profile" className="rounded-full" onClick={() => setToggleDropdown((prev) => !prev)} />

            {/* Dropdown */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>Profile</Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
                <button type="button" className="black_btn mt-5 w-full" onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}>Sign Out</button>
              </div>
            )}

          </div>
          ): (
            <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">Sign In</button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav