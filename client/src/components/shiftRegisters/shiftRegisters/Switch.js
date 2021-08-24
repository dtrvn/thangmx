import React from 'react';

const Switch = ({ isOn, handleToggle, onColor, itemClass }) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className={`react-switch-checkbox${itemClass}`}
                id={`react-switch-new${itemClass}`}
                type="checkbox"
            />
            <label
                style={{ background: isOn && onColor }}
                className={`react-switch-label${itemClass}`}
                htmlFor={`react-switch-new${itemClass}`}
            >
                <span className={`react-switch-button${itemClass}`}/>
            </label>
        </>
    );
};

export default Switch;