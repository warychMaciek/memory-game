import './Board.scss'
import useGetCards from "../../hooks/useGetCards"
import Card from '../Card/Card'

const Board = () => {
    const { cards, handleClick } = useGetCards()

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