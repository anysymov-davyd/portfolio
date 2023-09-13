import './../styles/Button.css'

function Button({ value, onClick }){
    return (
        <button onClick={onClick} className='button'>{ value }</button>
    )
}

export default Button