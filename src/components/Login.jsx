import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice.js'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth.js'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const login = async (data) => {
        setError('')
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin({ userData }))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                {/* Card */}
                <div className="bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden">
                    {/* Header with gradient */}
                    <div className="p-8 bg-linear-to-br from-surface to-surface-light border-b border-border">
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-background rounded-xl">
                                <Logo width="60px" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-text-primary mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-text-secondary text-sm">
                                Sign in to your account
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-900/20 border border-red-800/30 rounded-xl">
                                <div className="flex items-center space-x-2 text-red-400">
                                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm">{error}</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(login)} className="space-y-6">
                            <div className="space-y-4">
                                <Input
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Please enter a valid email address",
                                        }
                                    })}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-border bg-surface text-primary focus:ring-primary" />
                                    <span className="text-text-secondary text-sm">Remember me</span>
                                </label>
                                <Link
                                    to="#"
                                    className="text-sm text-primary hover:text-primary-light transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-3 bg-gradient-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Signing in...</span>
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-border">
                            <p className="text-center text-text-secondary text-sm">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-primary font-semibold hover:text-primary-light transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login