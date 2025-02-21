/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef } from "react";
import { Button } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function Signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
            username: username,
            password: password
        })
        // alert("user Signed up");
        navigate("/signin");
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8 ">
            <InputBox reference={usernameRef} placeholder="Username" />
            <InputBox reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button variant="primary" text="Signup" fullwidth={true} loading={false} onClick={Signup} />
            </div>
        </div>
    </div>
}   