import { Button } from "reactstrap";

export default function CoffeeDetailsCartAdd () {
    
    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log("added to cart");
    }
    
    return (
        <Button onClick={(e) => handleAddToCart(e)}>
            Add To Cart
        </Button>
    )

    // conditional rendering:
    // logged in status
    // detects if all 3 fields have been filled in.
    // If not: deactivated. Attempted click displays toast with instructions
}