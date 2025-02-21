import { ReactElement } from "react"

export function SidebarIten({ text, icon }:
    {
        text: string;
        icon : ReactElement;
    }) {
        return <div className="flex py-2">
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>

}