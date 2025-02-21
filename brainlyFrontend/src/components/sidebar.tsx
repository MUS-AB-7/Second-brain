import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarIten } from "./SidebarItem";

export function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center pl-4">
            <div className="text-purple-800 flex items-center">
                <Logo />
                Brainly
            </div>
        </div>
        <div className="pt-8 pl-4">
            <SidebarIten text="Twitter" icon={<TwitterIcon />} />
            <SidebarIten text="Youtube" icon={<YoutubeIcon />} />
        </div>
    </div>
}