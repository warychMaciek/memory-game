import './Board.scss'
import Card from '../Card/Card'
import { CardType } from '../../assets/types'

type BoardProps = {
    cards: CardType[],
    handleClick: (index: number) => void
}

const Board = ({ cards, handleClick }: BoardProps) => {
    return (
        <section className="board">
            {cards.map((card, index) => (
                <Card 
                    key={index} 
                    imageUrl={card.imageUrl} 
                    status={card.status} 
                    onClick={() => handleClick(index)} 
                />
            ))}
        </section>
    )
}

export default Board