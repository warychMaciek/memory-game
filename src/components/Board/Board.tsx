import './Board.scss'
import Card from '../Card/Card'
import { CardType } from '../../assets/types'
import useStatsStore from '../../store/statsStore'

type BoardProps = {
    cards: CardType[],
    handleClick: (index: number) => void
}

const Board = ({ cards, handleClick }: BoardProps) => {
    const diffLevel = useStatsStore(state => state.diffLevel)

    return (
        <section className={`board --rows-${diffLevel / 2}`}>
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