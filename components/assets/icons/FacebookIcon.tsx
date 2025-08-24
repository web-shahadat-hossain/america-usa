"use client";

import React from "react";

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props} // allows passing className, style, etc.
        >
            <path
                d="M39.5859 20.35C39.5859 9.57284 30.8499 0.826172 20.0859 0.826172C9.32194 0.826172 0.585938 9.57284 0.585938 20.35C0.585938 29.7995 7.29394 37.6676 16.1859 39.4833V26.2071H12.2859V20.35H16.1859V15.469C16.1859 11.7009 19.2474 8.6357 23.0109 8.6357H27.8859V14.4928H23.9859C22.9134 14.4928 22.0359 15.3714 22.0359 16.4452V20.35H27.8859V26.2071H22.0359V39.7762C31.8834 38.8 39.5859 30.4828 39.5859 20.35Z"
                fill="black"
            />
        </svg>
    );
};

export default FacebookIcon;
