import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { addOne, subtractOne } from "../../managers/orderManager";

export default function CartQuantityEdit ({ op, quantity }) {
    
    const handleAdd = () => {
        addOne(op.id)
        console.log("added 1");
    }

    const handleMinus = () => {
        subtractOne(op.id);
        console.log("removed 1");
    }
    
    return (
        <h6>
            Qty:
            {' '}
            {quantity === 1 ? (
                <BsDashLg />
            ) : (
                <BsDashLg onClick={() => handleMinus()} />
            )}
            {' '}
            {quantity}
            {' '}
            {quantity === 6 ? (
                <BsPlusLg />
            ) : (
                <BsPlusLg onClick={() => handleAdd()}/>
            )}
            
        </h6>
    )
}