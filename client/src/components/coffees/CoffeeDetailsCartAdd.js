import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Popover, PopoverBody } from "reactstrap";

export default function CoffeeDetailsCartAdd ({ loggedInUser, coffeeDetails, selectedWeightId, selectedGrindId, selectedQuantity }) {
    const navigate = useNavigate();
    const [popover, setPopover] = useState(false);

    const togglePopover = () => {
        setPopover(true);
        setTimeout(() => {
            setPopover(false);
        }, 3000);
    };
    
    const handleNavToLogin = (e) => {
        e.preventDefault();
        navigate("/login");
    } 
    

    const handleAddToCart = (e) => {
        e.preventDefault();
        togglePopover();
        const newCartObject = {
            productId: coffeeDetails.id,
            weightId: parseInt(selectedWeightId),
            grindId: parseInt(selectedGrindId),
            productQuantity: parseInt(selectedQuantity)
        }
        console.log("added to cart");
        console.log(newCartObject);
        // construct object, console log for debugging
        // ask Josh or Greg how to approach this. Client-side state or backend?
        // client side:
        // // objects are stored in a kind of "application state" which components reference throughout order process. This is added to, modified, deleted from, etc. ...
        // // ... essentially, internal CRUD operations
        // // would be cleared on logout

        // server side:
        // // new order object would need to be created on **first** execution of "add to cart", but not on further ones
        // // new OrderProduct objects POST to database, referencing this ^ orderId
        // // would be saved ? after logout
    }
    
    if (!loggedInUser) {
        return (
            <Button onClick={(e) => handleNavToLogin(e)}>
                Log in to add to cart
            </Button>
        )
    }

    if (coffeeDetails.isLive === false) {
        return (
            <Button disabled>
                Out of stock
            </Button>
        )
    }

    if (selectedWeightId && selectedGrindId && selectedQuantity) {
        return (
            <>
                <Button onClick={(e) => handleAddToCart(e)} id="addToCartButton">
                    Add To Cart
                </Button>
                <Popover
                    flip
                    target="addToCartButton"
                    isOpen={popover}
                    toggle={() => togglePopover()}>
                    <PopoverBody>
                        Added to cart!
                    </PopoverBody>
                </Popover>
            </>
        )
    }

    else {
        return (
            <Button disabled >
                Select options to add to cart
            </Button>
        )
    }

}