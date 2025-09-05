import React, { useState } from 'react'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
    const [email, setEmail] = useState('')

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle newsletter subscription
        console.log('Subscribing email:', email)
        setEmail('')
        // You can add your newsletter subscription logic here
    }

    return (
        <footer className='mt-16 bg-gradient-to-br from-[#2f2b4e] to-[#4a3f6b] text-white'>
            {/* Newsletter Section */}
            <div className='py-16 px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>Subscribe to our newsletter</h2>
                    <p className='text-lg mb-8 opacity-90'>Stay updated with the latest job opportunities and career tips</p>
                    <form onSubmit={handleSubscribe} className='max-w-md mx-auto'>
                        <div className='flex bg-white rounded-full overflow-hidden shadow-lg'>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                className='flex-1 px-6 py-2 text-gray-800 outline-none text-md'
                                required
                            />
                            <button
                                type='submit'
                                className='bg-[#1a1a1a] hover:bg-[#1a1a1a] px-8 py-2 text-white font-semibold transition-colors duration-300'
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className='py-12 px-4 border-t border-white/20'>
                <div className='max-w-6xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
                        {/* Company Info */}
                        <div className='lg:col-span-1'>
                            <div className='flex items-center mb-4'>
                                <div className='w-8 h-8 bg-white rounded triangle-logo mr-3'></div>
                                <h3 className='text-xl font-bold'>ROJGAAR</h3>
                            </div>
                            <p className='text-sm opacity-90 mb-4'>© Copyright • 2025 • All rights reserved</p>
                            
                            {/* Office Address */}
                            <div className='mb-6'>
                                <h4 className='font-semibold mb-2'>Office Address</h4>
                                <p className='text-sm opacity-90 leading-relaxed'>
                                    123 Tech Street<br />
                                    Innovation District<br />
                                    New Delhi, 110001<br />
                                    India
                                </p>
                            </div>

                            {/* Social Media Icons */}
                            <div className='flex space-x-4'>
                                <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' 
                                   className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300'>
                                    <FaFacebook className='text-lg' />
                                </a>
                                <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'
                                   className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300'>
                                    <FaTwitter className='text-lg' />
                                </a>
                                <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'
                                   className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300'>
                                    <FaInstagram className='text-lg' />
                                </a>
                                <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'
                                   className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300'>
                                    <FaLinkedin className='text-lg' />
                                </a>
                            </div>
                        </div>

                        {/* Products */}
                        <div>
                            <h4 className='font-semibold mb-4 text-lg'>PRODUCTS</h4>
                            <ul className='space-y-3'>
                                <li><Link href='/jobs' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Job Search</Link></li>
                                <li><Link href='/companies' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Company Profiles</Link></li>
                                <li><Link href='/salary' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Salary Insights</Link></li>
                                <li><Link href='/career-advice' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Career Advice</Link></li>
                                <li><Link href='/resume-builder' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Resume Builder</Link></li>
                            </ul>
                        </div>

                        {/* Developers */}
                        <div>
                            <h4 className='font-semibold mb-4 text-lg'>DEVELOPERS</h4>
                            <ul className='space-y-3'>
                                <li><Link href='/api/docs' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Documentation</Link></li>
                                <li><Link href='/api/reference' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>API Reference</Link></li>
                                <li><Link href='/api/status' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>API Status</Link></li>
                                <li><Link href='/opensource' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Open Source</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className='font-semibold mb-4 text-lg'>COMPANY</h4>
                            <ul className='space-y-3'>
                                <li><Link href='/about' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>About</Link></li>
                                <li><Link href='/customers' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Customers</Link></li>
                                <li><Link href='/careers' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Careers</Link></li>
                                <li><Link href='/blog' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Blog</Link></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className='font-semibold mb-4 text-lg'>RESOURCES</h4>
                            <ul className='space-y-3'>
                                <li><Link href='/support' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Support</Link></li>
                                <li><Link href='/contact' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Contact</Link></li>
                                <li><Link href='/privacy' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Privacy</Link></li>
                                <li><Link href='/terms' className='text-sm opacity-90 hover:opacity-100 transition-opacity'>Terms</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className='py-6 px-4 border-t border-white/20'>
                <div className='max-w-6xl mx-auto text-center'>
                    <p className='text-sm opacity-75'>
                        Made with ❤️ by Rojgaar Team
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer