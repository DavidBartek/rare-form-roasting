import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { addOne, subtractOne } from "../../managers/orderManager";

export default function CartQuantityEdit ({ op, quantity }) {
    
    const handleAdd = () => {
        addOne(op.id)
    }

    const handleMinus = () => {
        subtractOne(op.id);
    }
    
    return (
        <h6 style={{backgroundColor: "#FFF"}}>
            Qty:
            {' '}
            {quantity === 1 ? (
                // <BsDashLg />
                '\u00A0 \u00A0'
            ) : (
                <BsDashLg onClick={() => handleMinus()} style={{backgroundColor: "#FFF"}} />
            )}
            {' '}
            {quantity}
            {' '}
            {quantity === 6 ? (
                // <BsPlusLg />
                ""
            ) : (
                <BsPlusLg onClick={() => handleAdd()} style={{backgroundColor: "#FFF"}}/>
            )}
        </h6>
    )
}