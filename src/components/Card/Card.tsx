import { MouseEventHandler } from "react"
import "./Card.scss"

type CardProps = {
    imageUrl: string,
    status: string,
    onClick: MouseEventHandler<HTMLButtonElement>
}

const Card = ({ imageUrl, status, onClick }: CardProps) => {
    return (
        <button className={`card --${status}`} onClick={onClick}>
            {status !== 'facedown' && <img src={imageUrl} alt="card" />}
        </button>
    )
}

export default Card