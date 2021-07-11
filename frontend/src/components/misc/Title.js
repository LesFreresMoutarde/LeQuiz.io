import React from "react";

const Title = ({title, colorClass = 'text-white'}) => (
    <h1 className={`${colorClass}`} style={{width: '100%', textAlign: 'center'}}>{title}</h1>
);

export default Title;
