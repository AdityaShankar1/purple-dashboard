import React from "react";
import { Link } from "react-router-dom";

export default function CheckEmail() {
    return (
        <div className="min-h-screen bg-fuchsia-400">
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">📩 Check Your Email</h2>
                    <p className="text-gray-600 mb-6">
                        If an account exists with that email, we’ve sent a password reset
                        link. Please check your inbox.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
