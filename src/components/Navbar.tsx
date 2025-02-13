"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import SingleCard from "./SingleCard";

export default function Navbar() {
    const { user } = useUser();

    return (
        <nav className="flex justify-between items-center bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 px-10 py-6 shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div>
                <p className="text-white font-bold text-3xl hover:text-pink-200 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    Hello World
                </p>
            </div>

            <div className="flex items-center gap-10 w-1/2 justify-end">
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="bg-white/95 text-indigo-800 px-8 py-3 rounded-full font-bold hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <div className="flex items-center gap-8">
                        <SingleCard />
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox:
                                        "h-14 w-14 ring-4 ring-pink-400/30 hover:ring-pink-400/50 transition-all duration-300 transform hover:scale-105",
                                },
                            }}
                        />
                        <SignOutButton>
                            <button className="bg-indigo-900/80 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-900 hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-pink-400/20">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </div>
                </SignedIn>

                <div className="text-white font-bold text-xl tracking-wide">
                    {user ? user.firstName : "Please sign in"}
                </div>
            </div>
        </nav>
    );
}
