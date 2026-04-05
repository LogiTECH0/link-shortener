import { useContext } from "react";
import { LinksContext } from "./LinksContext";

export default function History() {
    const context = useContext(LinksContext);
    return (
        <div className="history">
            {Object.entries(context?.links || {}).reverse().map(([code, url], idx: number) => (
                <div key={idx} className="link-his">
                    <p>{url} → {code}</p>

                    <button onClick={() => window.open(`http://localhost:5173/${code}`, "_blank")}>
                        Visit
                    </button>
                </div>
            ))}
        </div>
    );
}