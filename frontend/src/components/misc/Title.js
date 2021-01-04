import React from "react";

const Title = ({title, colorClass = 'text-white'}) => (
    <h1 className={`centered-item text-center ${colorClass}`}>{title}</h1>
);

export default Title;
