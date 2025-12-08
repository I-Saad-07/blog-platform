import React, { useState } from 'react'
import authService from '../appwrite/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice.js'
import { useForm } from 'react-hook-form'
import { Button, Input, Logo} from './index.js'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    
    const create = async (data) => {
        setError('')
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
            <div className="bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-8 bg-linear-to-br from-surface to-surface-light border-b border-border">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-background rounded-xl">
                            <Logo width="60px" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-text-primary mb-2">
                            Create Account
                        </h2>
                        <p className="text-text-secondary text-sm">
                            Join our community of creators
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

                    <form onSubmit={handleSubmit(create)} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            <Input
                                label="Email Address"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Please enter a valid email address",
                                    }
                                })}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Create a password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-border bg-surface text-primary focus:ring-primary" 
                                    required
                                />
                                <span className="text-text-secondary text-sm">
                                    I agree to the{' '}
                                    <a href="#" className="text-primary hover:text-primary-light">Terms</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-primary hover:text-primary-light">Privacy Policy</a>
                                </span>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-3 bg-gradient-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-center text-text-secondary text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-primary font-semibold hover:text-primary-light transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup