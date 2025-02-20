import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Buttons";

export function CreateContentModal({ open, onClose}) {
    return <div>
        {open && <div className="w-full h-screen bg-slate-200 fixed top-0 left-0 opacity-60 flex justify-center" >
            <div className="flex flex-col justify-center ">
                <span className="bg-white opacity-100 p-8 rounded">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon  />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Input placeholder={"Title"} />
                        <Input placeholder={"Link"} />
                    </div>
                    <div className="flex justify-center">
                        <Button variant="primary" text="Submit" />
                    </div>
                </span>
            </div>
        </div>}
    </div>
}

function Input({ onChange, placeholder }: { onChange: () => void }) {
    return <div>
        <input type={"text"} placeholder={placeholder} className="px-4 py-2 border rounded m-2" onChange={onChange} ></input>
    </div>
}