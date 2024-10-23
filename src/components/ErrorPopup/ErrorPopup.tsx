import { FC } from "react"
import "./ErrorPopup.scss"

const ErrorPopup: FC<{ errorText: string | null }> = ({ errorText }) => {
    return (
        <div className="error-popup">
            <p>{errorText}</p>
        </div>
    )
}

export default ErrorPopup