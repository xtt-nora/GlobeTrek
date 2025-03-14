"use client"
import { AppSidebar } from "./components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import EchartsWrapper, {EchartsRef} from "@/components/Echarts/page";
import { ECOption } from "@/components/Echarts/config/index";
import {useEffect, useRef} from "react";
// import SvgIcon from "@/components/Icons/page";
export default function Page() {
    const option:ECOption =  {
        title: {
            text: '旅行城市'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {},
        toolbox: {
            showTitle: false,
            itemSize: 0,
            top: "-20%",
            feature: {
                dataZoom: {
                    type: "slider"
                }
            }
        },
        brush: {
            throttleType: "debounce",
            throttleDelay: 100,
            toolbox: ["lineX", "lineY"] // 启用 X 轴和 Y 轴的刷选工具
        },
        dataZoom: [
            {
                show: false,
                type: "slider",
                start: 0,
                end: 100,
                filterMode: "filter"
            },
            {
                show: false,
                type: "slider",
                filterMode: "filter",
                start: 0,
                end: 100
            }
        ],
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name: 'Highest',
                type: 'line',
                data: [10, 11, 13, 11, 12, 12, 9],
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }]
                }
            },
            {
                name: 'Lowest',
                type: 'line',
                data: [1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
                },
                markLine: {
                    data: [
                        { type: 'average', name: 'Avg' },
                        [
                            {
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            },
                            {
                                symbol: 'circle',
                                label: {
                                    position: 'start',
                                    formatter: 'Max'
                                },
                                type: 'max',
                                name: '最高点'
                            }
                        ]
                    ]
                }
            }
        ]
    }
    const optiobGlobe:ECOption = {
        globe:{
            baseTexture: "/world.jpg",
            environment: "/starfield.jpg",
            heightTexture:'/bathymetry.jpg',
            light: {
                // 主光强度
                main: {
                    intensity: 1,
                    // 是否产生阴影
                    shadow: true,
                },
                // 环境光强度
                ambient: {
                    intensity: 0.6,
                },
            },
    },
    }
    const optionPie:ECOption = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 20, name: '独自旅行' },
                    { value: 2, name: '背包行' },
                    { value: 5, name: 'city walk' },
                    { value: 10, name: '友人行' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    const chartRef = useRef<EchartsRef>(null);
    useEffect(()=>{
        if (chartRef.current) {
            chartRef.current.resize();
        }
    },[])
    // const handleResize = () => {
    //     chartRef.current?.resize();
    //     console.log(chartRef.current)
    // };
    //
    // const handleDraw = () => {
    //     chartRef.current?.draw();
    //     console.log(chartRef.current)
    // };
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50">
                            <EchartsWrapper option={optionPie} ref={chartRef} showPane={false}></EchartsWrapper>
                        </div>
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50">
                            <EchartsWrapper option={optiobGlobe} ref={chartRef} showPane={false} ></EchartsWrapper>
                        </div>
                    </div>
                    <div className="min-h-[100vh] w-full flex-1 rounded-xl bg-muted/50 md:min-h-min">
                        <EchartsWrapper option={option} ref={chartRef} ></EchartsWrapper>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
