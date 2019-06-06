import React from 'react';
import './Input.css'
// import classes from './Input.css';

const input = ( props ) => {
    let inputElement = null;

    // console.log(classes);
    let classes = `InputElement`;
    if(props.shouldValidate && props.touched){
        classes = `InputElement ` + (props.valid ? `` : `Invalid`);
    }

    switch (props.elementType) {
        case ( 'input' ):
            inputElement = <input 
                onChange={props.changed}
                value={props.value}
                className={classes} 
                {...props.elementConfig} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                onChange={props.changed}
                value={props.value} 
                className={classes} 
                {...props.elementConfig} >
                </textarea>;
            break;
        case ( 'select' ):
            inputElement = <select 
                onChange={props.changed}
                value={props.value}
                className={classes} >
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
                </select>;
            break;
        default:
            inputElement = <input 
                    onChange={props.changed}
                className="InputElement" 
                {...props.elementConfig} />;
    }

    return (
        <div>
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;