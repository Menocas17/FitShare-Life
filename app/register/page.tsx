"use client";

import React from "react";
import Header from "@/components/page-components/Header";
import Footer from "@/components/page-components/Footer";

const RegisterForm = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex flex-grow items-center justify-center">
        <div className="bg-card p-8 rounded-[0.625rem] shadow-lg w-full max-w-md mt-20 mb-10 transition-transform hover:shadow-xl hover:scale-[1.01]">
          <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
            Create an Account
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-text-light mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:border-color-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-text-light mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:border-color-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-text-light mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:border-color-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold text-base px-6 py-2 rounded-lg hover:bg-color-primary-hover transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md"
            >
              Register
            </button>
          </form>
          <div className="flex items-center my-6">
            <hr className="flex-1 border-border" />
            <span className="px-2 text-text-light">OR</span>
            <hr className="flex-1 border-border" />
          </div>
          <div className="space-y-3">
            <button className="w-full py-2 px-4 border border-border rounded-lg bg-white text-text-navy transition-all duration-300 ease-out hover:bg-color-navy hover:text-color-white hover:scale-[1.02] hover:shadow-md">
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center text-text-light">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary hover:text-color-primary-hover transition-colors"
            >
              Login
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterForm;
