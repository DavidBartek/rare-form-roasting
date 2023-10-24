import { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { getCurrentOrder } from "../../managers/orderManager";
import { Popover, PopoverBody } from "reactstrap";

// this component will be conditionally rendered

// if logged in:
// // empty cart: "Cart is empty"
// // cart with items: display in simple list akin to UserOrderList. Bottom: "Checkout" button
// add reactstrap badge to display how many items are in cart, if any (if 0: no badge)

// if not logged in:
// "log in to view cart and place an order"

// useEffect which watches cart items triggers this Popover; does not disappear with timeout

export default function Cart ({ loggedInUser }) {
    const [cart, setCart] = useState([]);
    const [popover, setPopover] = useState(false);

    console.log(loggedInUser);

    useEffect(() => {
        // may need to add error handling if user is not logged in
        if (!loggedInUser) {
            return;
        } else {
            getCurrentOrder(loggedInUser.id).then(setCart);
        }
    }, []);
    
    const togglePopover = () => {
        setPopover(!popover);
    }
    
    if (!loggedInUser) {
        return (
            <>
                <BsCart 
                    id="cartIcon"
                />
                <Popover
                    target="cartIcon"
                    placement="bottom"
                    trigger="focus"
                    isOpen={popover}
                    toggle={() => togglePopover()}>
                    <PopoverBody>
                        Log in to view cart
                    </PopoverBody>
                </Popover>
            </>
        )
    } else if (cart.length === 0) {
        return (
            <>
                <BsCart 
                    id="cartIcon"
                />
                <Popover
                    target="cartIcon"
                    placement="bottom"
                    trigger="focus"
                    isOpen={popover}
                    toggle={() => togglePopover()}>
                    <PopoverBody>
                        Cart is empty.
                    </PopoverBody>
                </Popover>
            </>
        )
    }
    return (
        <>
            <BsCart 
                id="cartIcon"
            />
            <Popover
                target="cartIcon"
                placement="bottom"
                trigger="focus"
                isOpen={popover}
                toggle={() => togglePopover()}>
                <PopoverBody>
                    Cart populates with items here
                </PopoverBody>
            </Popover>
        </>
    )
}