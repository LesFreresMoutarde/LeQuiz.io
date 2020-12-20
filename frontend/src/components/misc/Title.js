import React from "react";

const Title = ({title, colorClass = 'text-white'}) => (
    <h1 className={`mb3 text-center ${colorClass}`}>{title}</h1>
);

export default Title;