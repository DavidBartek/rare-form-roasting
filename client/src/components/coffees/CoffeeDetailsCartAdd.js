import { Button } from "reactstrap";

export default function CoffeeDetailsCartAdd () {
    
    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log("added to cart");
        // construct object, console log for debugging
        // ask Josh or Greg how to approach this. Client-side state or backend?
    }
    
    return (
        <Button onClick={(e) => handleAddToCart(e)}>
            Add To Cart
        </Button>
    )

    // conditional rendering:
    // out of stock // isLive === false (grayed out, unclickable)
    // logged in status (link to login)
    // detects if all 3 fields have been filled in.
    // If not: deactivated. Attempted click displays toast with instructions

    // props needed:

    // loggedInUser
    // coffeeDetails
    // selectedWeightId
    // selectedWeightObj
}