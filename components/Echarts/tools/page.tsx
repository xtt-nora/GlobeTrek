import {ScrollArea} from "@/components/ui/scroll-area";
import SvgIcon from "@/components/Icons/page";
import {IconNames} from "@/components/Icons/icons";
import {Button} from "@/components/ui/button";
import {EChartsType} from "echarts/core";

interface ToolProps {
    chartInstance: EChartsType | null
}
type iconOptionProps = {
    icon: IconNames;
    key: string;
}
export const Tools =(chartInstance:ToolProps)=>{
    const iconOptions:iconOptionProps[] = [
        {icon:'zoomIn',key:'zoomIn'},

    ]
    const zoomSetting = ()=>{
        console.log(chartInstance.chartInstance,'toolschartInstance')
        chartInstance.chartInstance?.dispatchAction({
            type: "takeGlobalCursor",
            key: "dataZoomSelect",
            // 启动或关闭
            dataZoomSelectActive: true
        });
    }
    const handleAction = (item:iconOptionProps)=>{
    console.log(item);
    if(chartInstance){
        zoomSetting()
    }
    }
        return (
        <ScrollArea className='h-full w-9 rounded-md border'>
            <div >
                {iconOptions.map((tag) => (
                        <div key={tag.key} className="text-sm">
                            <Button  variant="ghost" size="icon" onClick={()=>handleAction(tag)}>
                                <SvgIcon name={tag.icon} width={18} height={18} />
                            </Button>
                        </div>
                ))}

            </div>
        </ScrollArea>
    )
}