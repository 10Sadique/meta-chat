'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface MobileItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active,
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <Link
            href={href}
            className={clsx(
                'group flex gap-x-3 text-sm left-6 font-semibold w-full justify-center p-4 text-gray-500 hover:to-black hover:bg-gray-100',
                active && 'bg-gray-100 text-base'
            )}
            onClick={handleClick}
        >
            <Icon className="w-6 h-6" />
        </Link>
    );
};

export default MobileItem;
