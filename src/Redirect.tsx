import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { LinksContext } from "./LinksContext"
export default function Redirect() {
    const { code } = useParams();
    const context = useContext(LinksContext);

    useEffect(() => {
        if (!code) return;

        const url = context?.links[code];
        if (url) {
            window.location.href = url;
        }
    }, [code, context])
    return (
        <div className="redirect">
            <h2>Redirecting...</h2>
            <p>Taking you to your destination 🚀</p>
        </div>
    )
}