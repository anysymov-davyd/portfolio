import './../styles/ArrowIcon.css'

function ArrowIcon(props){
    return (
        <svg
            style={{ fill: props.darkMode ? 'black' : 'white' }}
            className='arrow-icon'
            width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 15.5L17.6603 0.500001L0.339746 0.500001L9 15.5ZM7.5 0.5L7.5 2L10.5 2L10.5 0.5L7.5 0.5Z"/>
        </svg>
    )
}

export default ArrowIcon