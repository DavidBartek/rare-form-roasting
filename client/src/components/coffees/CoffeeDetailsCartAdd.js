import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Popover, PopoverBody } from "reactstrap";
import { addToCart } from "../../managers/orderManager";

export default function CoffeeDetailsCartAdd ({ loggedInUser, coffeeDetails, selectedWeightId, selectedGrindId, selectedQuantity }) {
    const navigate = useNavigate();
    const [popover, setPopover] = useState(false);

    const togglePopover = () => {
        setPopover(true);
        // setTimeout(() => {
        //     setPopover(false);
        // }, 3000);
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

        addToCart(newCartObject, loggedInUser.id);
    }
    
    if (!loggedInUser) {
        return (
            <Button onClick={(e) => handleNavToLogin(e)} className="button" style={{
                backgroundColor: "#FAB375",
                color: "#021E36",
                fontWeight: 800,
                border: "none",
                borderRadius: "0px",
                transition: "box-shadow 0.1s"
                }}>
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
                <Button onClick={(e) => handleAddToCart(e)} id="addToCartButton" className="button" style={{
                    backgroundColor: "#FAB375",
                    color: "#021E36",
                    fontWeight: 800,
                    border: "none",
                    borderRadius: "0px",
                    transition: "box-shadow 0.1s"
                    }} 
                >
                    Add To Cart
                </Button>
                <Popover
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
            <Button disabled style={{
                fontWeight: 800,
                border: "none",
                borderRadius: "0px",
                }} >
                Select options to add to cart
            </Button>
        )
    }

}