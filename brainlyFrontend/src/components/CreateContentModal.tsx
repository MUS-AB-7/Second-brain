import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Buttons";
import { InputBox } from "./InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube)

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        
        await axios.post(BACKEND_URL + "/api/v1/content", {
            link : link,
            title : title,
            type : type
        }, {
            headers:{
                Authorization : localStorage.getItem("token") 
            }
        })
        onClose();
    }
    return <div>
        {open && <div>
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center" >

            </div>
            <div className="w-screen h-screen fixed top-0 left-0 opacity-60 flex justify-center" >
                <div className="flex flex-col justify-center ">
                    <span className="bg-white opacity-100 p-8 rounded">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>  
                        </div>
                        <div className="flex justify-end">
                            <InputBox placeholder={"Title"} reference={titleRef} />
                            <InputBox placeholder={"Link"} reference={linkRef} />
                        </div>
                        <div>
                            <h1 className="pl-52">Type</h1>
                            <div className="flex gap-4 pl-32 pt-2   ">
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Youtube);
                                }}></Button>
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Twitter);
                                }}></Button>
                            </div>
                        </div>
                        <div className="flex justify-center pt-4">
                            <Button variant="primary" text="Submit" onClick={addContent} />
                        </div>
                    </span>
                </div>
            </div>

        </div>}
    </div>
}

