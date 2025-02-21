import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent() {
    const [contents, setContents] = useState([]);
    

    function Refresh() {

        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((Response) => {
                setContents(Response.data.content);
            })
    }

    useEffect(() => {
        Refresh();

        const interval = setInterval(() => {
            Refresh();
        }, 10 * 100)
        return () => {
            clearInterval(interval);
        }
    }, [])
    return {contents, Refresh };
}
