import React, { useState } from 'react';

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { motion } from 'framer-motion'
import { client, urlFor } from '../../client'
import './Footer.scss'

const intialState = {name: "", email: "", message: ""}
const Footer = () => {
    const [formData, setFormData] = useState(intialState)
    const [isFormSubmitted, setisFormSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const {name, email, message} = formData;

    const handleChangeInput = (e)=>{
        const {name, value} =  e.target;
        
        setFormData({...formData, [name]:value});

    }

    const handleSubmit= (event)=>{
        setLoading(true)
        event.preventDefault();
        const contact = {
            _type: 'contact',
            name,
            email,
            message
        }
        client.create(contact).then(data=>{
            setLoading(false);
            setFormData(intialState)
            setisFormSubmitted(true)
        })
    }

    return (<>
        <h2 className='header-text'>Take a coffe and chat with me</h2>
        <div className='app__footer-cards'>
            <div className='app__footer-card'>
                <img src={images.email} alt='email' />
                <a href='mailto: proshashwat@gmail.com' className='p-text'>proshashwat@gmail.com</a>
            </div>
            <div className='app__footer-card'>
                <img src={images.mobile} alt='mobile' />
                <a href='tel: +91 9416536818' className='p-text'>+91 9416536818</a>
            </div>
        </div>
            { !isFormSubmitted ? 

                <div className='app__footer-form app__flex'>
                <div className='app__flex'>
                    <input className='p-text' type='text' placeholder='Your Name' value={name} onChange={handleChangeInput} name="name"></input>
                </div>
                <div className='app__flex'>
                    <input className='p-text' type='email' placeholder='Your Email' value={email} onChange={handleChangeInput} name="email"></input>
                </div>
                <div>
                    <textarea className='p-text' placeholder='Your Message'  value={message} name='message' onChange={handleChangeInput} />
                </div>
                <button type='button' className='p-text' onClick={handleSubmit}>{loading?'Sending...':'Send Message'}</button>

            </div>
            : <h3 className='head-text'>Thank you for getting in touch </h3>}
    </>)
}
export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__primarybg');
