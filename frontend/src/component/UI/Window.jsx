import React from 'react';
import './Modal.css'

const Window = ({children, visible, setVisible}) => {
    const rootClasses = ['myModal']
    if(visible){
        rootClasses.push('Modalactive')
    }
    return (
        <div className={rootClasses.join(' ')} onClick={()=> setVisible(false)}>
            <div className='Content' onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Window;