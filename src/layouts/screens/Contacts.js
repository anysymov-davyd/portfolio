/*



THE FILE IS ABANDONED, BUT CAN BE USED IN FUTURE



*/

import React, { useState } from 'react'

import './../styles/Contact.css'

import Input from '../components/Input'
import Button from '../components/Button'
import SocialMedias from '../components/SocialMedias'
import Dropdown from '../components/Dropdown'
import Textarea from '../components/Textarea'

function Contact({ localization, onSubmit }){
    const [choosedMethod, setChoosedMethod] = useState(null)

    const [nameValue, setNameValue] = useState('')
    const [communicationValue, setCommunicationValue] = useState('')
    const [socialMediaValue, setSocialMediaValue] = useState('')
    const [serviceValue, setServiceValue] = useState('')
    const [priceValue, setPriceValue] = useState('')
    const [deadlineValue, setDeadlineValue] = useState('')
    const [textareaValue, setTextareaValue] = useState('')
    const [files, setFiles] = useState([])

    const handleNameValue = value => {
        setNameValue(value)
    }

    const handleCommunicationValue = value => {
        setCommunicationValue(value)
    }

    const handleSocialMediaValue = value => {
        setSocialMediaValue(value)
    }

    const handleServiceValue = value => {
        setServiceValue(value)
    }

    const handlePriceValue = value => {
        setPriceValue(value)
    }

    const handleDeadlineValue = value => {
        setDeadlineValue(value)
    }

    const handleTextareaValue = value => {
        setTextareaValue(value)
    }

    const handleFilesDrop = files => {
        setFiles(files)
    }


    const handleChoosedMethod = value => {
        setChoosedMethod(value.toLowerCase())
    }

    const set = {
        unknown: localization.form.valueSet.budget.unknown,
        and_higher: localization.form.valueSet.budget.and_higher,
        day: localization.form.valueSet.deadline.day,
        days: localization.form.valueSet.deadline.days,
        week: localization.form.valueSet.deadline.week,
        weeks: localization.form.valueSet.deadline.weeks,
        and: localization.form.valueSet.deadline.and,
        month: localization.form.valueSet.deadline.month,
        months: localization.form.valueSet.deadline.months,
        and_longer: localization.form.valueSet.deadline.and_longer
    }

    return(
        <div className="contact__container">
            <div className='contact__header'>
                <h2>{ localization.title }</h2>
                <p>{ localization.paragraph }</p>
            </div>
            <form className='contact__form'>
                <div className='contact__input-set'>
                    <div className='contact__form-first-column'>
                        <Input
                            max={100}
                            placeholder={localization.form.inputs.first}
                            onChange={handleNameValue}
                        />
                        <div
                            className='contact__form-divided-column'
                            style={{
                                gridTemplateColumns: choosedMethod === null || choosedMethod === 'other' ? '1fr 0' : '1fr 1fr',
                                gap: choosedMethod === null || choosedMethod === 'other' ? 0 : '20px',
                                maxWidth: '100%',
                                overflow: 'hidden'
                            }}
                        >
                            <Dropdown
                                placeholder={localization.form.inputs.second}
                                optionSet={localization.form.valueSet.communication}
                                onChoosedMethod={handleChoosedMethod}
                                onChange={handleCommunicationValue}
                            />
                            <Input
                                max={75}
                                choosedMethod={choosedMethod}
                                onChange={handleSocialMediaValue}
                            />
                        </div>
                        <Dropdown
                            placeholder={localization.form.inputs.third}
                            optionSet={localization.form.valueSet.service}
                            onChange={handleServiceValue}
                        />
                        <div className='contact__form-divided-column'>
                            <Dropdown
                                placeholder={localization.form.inputs.fourth}
                                optionSet={[
                                    set.unknown,
                                    '50 €',
                                    '100 €',
                                    '200 €',
                                    '300 €',
                                    '300 € - 500 €',
                                    '500 € - 700 €',
                                    '700 € - 900 €',
                                    '900 € - 1100 €',
                                    '1100 € - 1300 €',
                                    '1300 € - 1500 €',
                                    `1500 € ${set.and_higher}`
                                ]}
                                onChange={handlePriceValue}
                            />
                            <Dropdown
                                placeholder={localization.form.inputs.fiveth}
                                optionSet={[
                                    set.unknown,
                                    `1 ${set.day}`,
                                    `2 ${set.days}`,
                                    `3 ${set.days}`,
                                    `4 ${set.days}`,
                                    `5 ${set.days}`,
                                    `6 ${set.days}`,
                                    `7 ${set.days}`,
                                    `1 ${set.week} ${set.and} 1 ${set.day}`,
                                    `1 ${set.week} ${set.and} 3 ${set.days}`,
                                    `1 ${set.week} ${set.and} 5 ${set.days}`,
                                    `2 ${set.weeks}`,
                                    `2 ${set.weeks} ${set.and} 1 ${set.day}`,
                                    `2 ${set.weeks} ${set.and} 3 ${set.days}`,
                                    `2 ${set.weeks} ${set.and} 5 ${set.days}`,
                                    `3 ${set.weeks}`,
                                    `1 ${set.month}`,
                                    `2 ${set.months}`,
                                    `3 ${set.months}`,
                                    `3 ${set.months} ${set.and_longer}`
                                ]}
                                onChange={handleDeadlineValue}
                            />
                        </div>
                    </div>
                    <div className='contact__form-second-column'>
                        <Textarea
                            dropFilesLabel={localization.form.textarea.filedrop}
                            max={2000}
                            placeholder={localization.form.textarea.placeholder}
                            onChange={handleTextareaValue}
                            onFilesDrop={handleFilesDrop}
                        />
                    </div>
                </div>
                <div className='contact__submit'>
                    <Button onClick={() => {
                        if([
                            nameValue,
                            communicationValue,
                            socialMediaValue,
                            serviceValue,
                            priceValue,
                            deadlineValue
                        ].every(elem => elem.trim() !== '')){
                            onSubmit({
                                data: {
                                    name: nameValue,
                                    communication: communicationValue,
                                    socialMedia: socialMediaValue,
                                    service: serviceValue,
                                    price: priceValue,
                                    deadline: deadlineValue,
                                    textarea: textareaValue
                                },
                                files: files
                            })
                        }
                    }} value={localization.form.button}/>
                    <SocialMedias/>
                </div>
            </form>
            
        </div>
    )
}

export default Contact