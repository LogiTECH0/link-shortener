import { useState } from "react";
import { useContext } from "react";
import { LinksContext } from "./LinksContext";
export default function Create() {
    const [url, setUrl] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [isWaiting, setWaiting] = useState(false);
    const [waitingText, setWaitingText] = useState("");
    const context = useContext(LinksContext);
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }
    function generateCode(length: number): string {
        const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * abc.length);
            result += abc[randomIndex]
        }
        return result;
    }
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (url === "") return;
        const code = generateCode(8);
        const tempUrl = `https://shorter.netlify.app/${code}`;
        setWaiting(true);
        setWaitingText("Generating code...");
        setTimeout(function() {
            setWaitingText("Saving...");
        }, 500)
        setTimeout(function() {
            navigator.clipboard.writeText(tempUrl);
            setWaitingText("Copied to clipboard!")
        }, 1100)
        setTimeout(function() {
            setWaiting(false);
            setNewUrl(tempUrl);
            context?.addLink(code, url);
            setUrl("")
        }, 1400)
    }
    return (
        <>
            <form className="create" onSubmit={handleCreate}>
                <h2>Shorten Your Link</h2>
                <div className="input">
                    <input
                        type="text"
                        placeholder="https://example.com/my/link/is/very/long"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button type="button" className="paste" onClick={handlePaste}>Paste</button>
                </div>
                <button type="submit">Shorten</button>
                {isWaiting && (
                    <div className="waiting">
                        <p>Shortening...</p>
                        <p>{waitingText}</p>
                    </div>
                )}
                {newUrl && (
                    <a href={newUrl} target="_blank">{newUrl}</a>
                )}
            </form>
        </>
    );
}
