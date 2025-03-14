import React from 'react';
import {IconNames, icons} from './icons';

interface SvgIconProps {
    name: IconNames;
    width?: number;
    height?: number;
    fill?: string;
    [key: string]: any; // 允许其他的 props
}
const SvgIcon: React.FC<SvgIconProps> =  ({ name, width = 24, height = 24, fill = 'currentColor', ...props }) => {
    const Icon = icons[name];

    if (!Icon) {
        return <span>Icon not found</span>; // 如果没有找到对应的图标
    }

    return React.cloneElement(Icon, {
        width,
        height,
        fill,
        ...props,
    });
};

export default SvgIcon;