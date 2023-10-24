import { BsCart } from "react-icons/bs";

// this component will be conditionally rendered

// if logged in:
// // empty cart: "Cart is empty"
// // cart with items: display in simple list akin to UserOrderList. Bottom: "Checkout" button
// add reactstrap badge to display how many items are in cart, if any (if 0: no badge)

// if not logged in:
// "log in to view cart and place an order"

// useEffect which watches cart items triggers this Popover; does not disappear with timeout

export default function Cart ({ loggedInUser }) {
    // getCurrentOrder
    
    return (
        <>
        <BsCart />
        </>
    )
}