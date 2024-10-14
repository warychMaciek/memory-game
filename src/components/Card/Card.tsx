import { MouseEventHandler, useEffect, useRef } from "react"
import "./Card.scss"

type CardProps = {
    imageUrl: string,
    status: string,
    onClick: MouseEventHandler<HTMLButtonElement>
}

const Card = ({ imageUrl, status, onClick }: CardProps) => {
    const cardRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.classList.remove('--faceup', '--facedown', '--matched')
            void cardRef.current.offsetWidth
            cardRef.current.classList.add(`--${status}`)
        }
    }, [status])

    return (
        <button ref={cardRef} className={`card --${status}`} onClick={onClick}>
            {status !== 'facedown' && <img src={imageUrl} alt="card" />}
        </button>
    )
}

export default Card