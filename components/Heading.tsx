import React from 'react';

interface HeadingProps {
    text: string;
}
interface SubHeadingProps {
    text: string;
}

export const Heading = ({ text }: HeadingProps) => {
    return (
        <div>
            <h1 className="mb-4 text-3xl font-semibold">{text}</h1>
        </div>
    );
};
export const SubHeading = ({ text }: SubHeadingProps) => {
    return (
        <div>
            <h4 className="mb-4 text-lg font-semibold">{text}</h4>
        </div>
    );
};
