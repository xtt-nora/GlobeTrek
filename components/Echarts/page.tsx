import echarts, { ECOption } from "@/components/Echarts/config";
import { EChartsType, ECElementEvent } from "echarts/core";
import React, {useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import { useDebounce } from "use-debounce";
import {Tools} from "@/components/Echarts/tools/page";
import "echarts-gl";

interface EchartsProps {
    id?: string;
    option: ECOption;
    renderer?: "canvas" | "svg";
    resize?: boolean;
    theme?: object | string;
    width?: number | string;
    height?: number | string;
    onClick?: (event: ECElementEvent) => void;
    showPane?: boolean;
}

export interface EchartsRef {
    chartInstance : EChartsType | null;
    resize: () => void;
    draw: () => void;
}

const EchartsWrapper = React.forwardRef<EchartsRef, EchartsProps>(
    ({ option, renderer = "canvas", resize = true, theme, width, height, onClick,id="echarts",showPane = true }, ref) => {
        const chartRef = useRef<HTMLDivElement | null>(null);
        const chartInstance = useRef<EChartsType | null>(null);
        const [isInitialized, setIsInitialized] = useState(false);
        const [debouncedResize] = useDebounce(resize, 300, { maxWait: 800 });
        const echartsStyle = {
            width: width || "100%",
            height: height || "100%",
        };

        const handleClick = (event: ECElementEvent) => onClick && onClick(event);
        const draw = useCallback(() => {
            if (chartInstance.current) {
                chartInstance.current.setOption(option, { notMerge: true });
            }
        }, [option]);

        const init = useCallback(() => {
            if (!chartRef.current) return;
            chartInstance.current = echarts.getInstanceByDom(chartRef.current) || null;
            if (!chartInstance.current) {
                chartInstance.current = echarts.init(chartRef.current, theme, {
                    renderer,
                });
                chartInstance.current.on("click", handleClick);
                draw();
            }
            setIsInitialized(true)
        }, [option, theme, renderer, onClick, draw]);

        const resizeHandler = useCallback(() => {
            if (chartInstance.current && resize) {
                chartInstance.current.resize({ animation: { duration: 300 } });
            }
        }, [resize]);

        // 暴露方法属性
        useImperativeHandle(ref, () => ({
            chartInstance: chartInstance.current,
            resize: resizeHandler,
            draw,
        }));

        useEffect(() => {
            init();
            window.addEventListener("resize", resizeHandler);
            return () => {
                // if (chartInstance.current) {
                //     chartInstance.current.dispose();
                // }
                window.removeEventListener("resize", resizeHandler);
            };
        }, [init, resizeHandler]);

        useEffect(() => {
            const timer = setTimeout(() => {
                if (debouncedResize) {
                    resizeHandler();
                }
            }, 0);  // 延迟100ms后重新计算尺寸

            return () => clearTimeout(timer);
        }, [debouncedResize, resizeHandler]);

        return (
            <div className='flex w-full h-full'>
                {isInitialized && showPane && <Tools chartInstance={chartInstance.current}/>}
                <div ref={chartRef} style={echartsStyle} id={id} className='flex-1 box-border'/>
            </div>
        );
    }
);

EchartsWrapper.displayName = "EchartsWrapper";
export default EchartsWrapper;
