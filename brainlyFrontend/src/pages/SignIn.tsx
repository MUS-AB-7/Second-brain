import { useRef } from "react";
import { Button } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignIn() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function SignInn(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/signin",{
            username: username,
            password: password
        }) 
        const jwt =response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8 ">
            <InputBox placeholder="Username" reference={usernameRef} />
            <InputBox placeholder="Password" reference={passwordRef} />
            <div className="flex justify-center pt-4">
                <Button variant="primary" text="Signin" fullwidth={true} loading ={false} onClick={SignInn} />
            </div>
        </div>
    </div>
}   