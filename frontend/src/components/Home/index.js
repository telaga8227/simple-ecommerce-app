import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { Redirect, Link } from 'react-router-dom'
import Header from '../Header'
import './index.css'

const images = [
        "https://glance-web.glance-cdn.com/Core_Capsule_Wardrobe_Ideas_Every_Aesthetic_Fashion_Wardrobe_Needs_473ae91869.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqFjbg1HmPEjvfMKh93Wlhx-ud89wlg8MTnisxf3x4ifsdJaK3YaP44Oo&s=10",
        "https://res.cloudinary.com/jerrick/image/upload/v1722335650/66a8c1a2f79a20001dfeee0b.jpg"
];

function BootstrapCarousel() {
        const [currentIndex, setCurrentIndex] = useState(0);
        
        useEffect(() => {
                const timer = setInterval(() => {
                        setCurrentIndex((prevIndex) =>
                                prevIndex === images.length - 1 ? 0 : prevIndex + 1
                        );
                }, 2000);
               
                return () => clearInterval(timer);
        }, []);
        return (
                <div className="custom-carousel" style={{ position: 'relative', width: '30%', overflow: 'hidden', margin: '20px 0' }}>
                        {images.map((image, index) => (
                                <div
                                        key={index}
                                        style={{ display: index === currentIndex ? 'block' : 'none', }}>
                                        <img
                                                src={image} alt={`Slide ${index + 1}`}
                                                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                </div>
                        ))}
                </div>
        );
}
const Home = () => {
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined) {
                return <Redirect to='/login' />
        }
        return (
                <>
                        <Header />
                        <h1 className="home-heading"> Welcome, you arrived to the right place. This is the place to shop</h1>
                        <div className="home-container">
                                <BootstrapCarousel />
                                <Link to="/products">
                                        <button className="shop-now">Shop now</button>
                                </Link>
                        </div>
                </>
        )
}

export default Home

