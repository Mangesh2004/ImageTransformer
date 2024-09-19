"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleLoginClick = () => {
    if (isSignedIn) {
      router.push('/social-share'); // Redirect to dashboard if signed in
    } else {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="w-full flex justify-center items-center py-4 px-8 shadow-lg border rounded-lg">
        <h1 className="text-2xl font-bold">Image Transformer</h1>
        
      </header>
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <h2 className="text-4xl font-bold mb-4">Transform Your Images Effortlessly</h2>
        <p className="text-lg mb-8">
          Experience seamless generative fill, image resizing, and cropping with our Cloudinary-powered service. Sign up now to transform your images effortlessly.
        </p>
        <div className="flex space-x-4">
        <button className="btn btn-outline font-bold w-25 text-xm" onClick={handleLoginClick}>Log In</button>
        </div>
      </main>
    </div>
  );
}
{/* <button className="btn btn-outline">Default</button> */}