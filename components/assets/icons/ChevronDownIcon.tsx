"use client";

import React from "react";

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.475 13.7246L0.585938 2.96954L2.80781 0.28125L10.5859 9.69217L18.3641 0.28125L20.5859 2.96954L11.6969 13.7246C11.4022 14.081 11.0026 14.2812 10.5859 14.2812C10.1693 14.2812 9.76967 14.081 9.475 13.7246Z"
                fill="#FF5C00"
            />
        </svg>
    );
};

export default ChevronDownIcon;
