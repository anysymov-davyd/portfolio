import React, { useState } from 'react'
import ArrowIcon from './ArrowIcon'

import './../styles/NavigationPanel.css'

function NavigationPanel({ localization, getCurrentPageIndex, setCurrentPageIndex, getCurrentLanguage }) {
    const ITEM_HEIGHT = 56

    const darkMode = setCurrentPageIndex == 0

    const optionSet = [
        {
            id: 'en',
            name: 'English'
        },
        {
            id: 'de',
            name: 'Deutsch'
        },
        {
            id: 'ua',
            name: 'Українська'
        },
        {
            id: 'ru',
            name: 'Русский'
        }
    ]

    const [currentOption, setCurrentOption] = useState(null)
    const [isOpened, setIsOpened] = useState(false)

    const loadedLanguageId = localStorage.getItem('languageId') === null ?
        optionSet.find(id => id === navigator.language) ? navigator.language : 'en'
        : localStorage.getItem('languageId')


    const handleCurrentOption = value => {
        setIsOpened(false)
        setCurrentOption(value)
        getCurrentLanguage(value)
    }

    return (
        <div className='navigation__container'>
            <div className='navigation__pages'>
                {localization.map((page, index) => (
                    <div className='navigation__item' key={index}>
                        <a
                            onClick={() => getCurrentPageIndex(index)}
                            className={`navigation__page ${setCurrentPageIndex == index ? '--active' : ''} caps1`}
                            style={{ color: darkMode ? 'black' : 'white' }}
                        >
                            { page }  
                        </a>

                        {index !== localization.length - 1 && (
                            <a style={{ color: darkMode ? 'black' : 'white' }} className='navigation__dot caps1'>•</a>
                        )}
                    </div>
                ))}
            </div>
            <div className='navigation__dropdown'>
                <div
                    className='navigation__dropdown-value'
                    onClick={() => setIsOpened(!isOpened)}
                >
                    <a
                        style={{ color: darkMode ? 'black' : 'white' }}
                        className='navigation__language caps1'
                    >{ currentOption !== null ? currentOption.id : loadedLanguageId }</a>
                    <ArrowIcon darkMode={darkMode}/>
                </div>
                <div
                    className='navigation__options'
                    style={{
                        maxHeight: isOpened ? '300px' : 0
                    }}
                >
                    {optionSet.map((elem, index) => (
                        <div
                            key={index}
                            className='navigation__option caps3'
                            style={{
                                minHeight: `${ITEM_HEIGHT}`,
                                color: darkMode ? 'black' : 'white',
                                background: darkMode ? 'rgba(255, 255, 255, .2)' : '#222222'
                            }}
                            onClick={() => handleCurrentOption(elem)}
                        >
                            { elem.name }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NavigationPanel