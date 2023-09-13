import React, { useEffect, useState } from 'react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './../styles/Works.css'

const Works = ({ localization, works }) => {
    const [showComponent, setShowComponent] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowComponent(true)
        }, 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false
    }

    const empty = () => {
        if(works.length > 3) return
        let items = []
        for(let i = 0; i < 4 - works.length; ++i){
            items.push(
                <div key={i} className='works__item'>
                    <a className='works__item-title caps2 works__no-work'>{ localization.no_work }</a>
                </div>
            )
        }
        return items
    }
    
    return(
        <div style={{ opacity: showComponent ? 1 : 0 }} className="works__container">
            <div className="works__header">
                <h2>{ localization.title }</h2>
                <p>{ localization.paragraph }</p>
            </div>
            {showComponent ? (
            <Slider {...settings} className="works__slider">
                {works.map((elem, index) => (
                    <div
                        onClick={
                            e => {
                                if(e.target.className.split(' ')[0] === 'works__item-link'){
                                    window.open(elem.data.github)
                                } else {
                                    window.open(elem.data.url)
                                }
                            }
                        }
                        key={index}
                        className='works__item'
                    >
                        <div style={{ background: `url(${elem.image}) no-repeat`, backgroundSize: 'cover' }} className='works__item-background'>
                            <div className='works__item-container'>
                                <a className='works__item-title caps1'>{ elem.data.name }</a>
                                <a className='works__item-link text'>{ localization.see_on_github }</a>
                            </div>
                        </div>
                    </div>
                ))}
                { empty() }
            </Slider>) : null }
        </div>
    )
}

export default Works