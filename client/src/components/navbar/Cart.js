import { useEffect, useState } from "react";
import { BsCart, BsArrowRightShort } from "react-icons/bs";
import { getCurrentOrder } from "../../managers/orderManager";
import { Button, Popover, PopoverBody, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { priceFormatter } from "../assets/exportFunctions";

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

    useEffect(() => {
        // may need to add error handling if user is not logged in
        if (!loggedInUser) {
            return;
        } else {
            getCurrentOrder(loggedInUser.id).then(setCart);
        }
    }, [cart]);
    
    const togglePopover = () => {
        setPopover(!popover);
    };
    
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
                        <Link to="/login">
                            Log in to view cart
                        </Link>
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
                    <h5>Cart</h5>
                    <Table borderless>
                        <tbody>
                            {cart.orderProducts.map(op =>
                            <tr key={op.id}>
                                <th>
                                    image
                                </th>
                                <td>
                                    {op.product.displayName}<br />
                                    <i>Qty: {op.productQuantity}</i><br />
                                    <i>Size: {op.weight.weightOz} oz</i><br />
                                    <i>Grind: {op.grind.grindSetting}</i><br />

                                </td>
                            </tr>
                            )}
                            <tr>
                                <th>
                                    Total
                                </th>
                                <td>
                                    <strong>${priceFormatter(cart.totalPrice)}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button>
                        Check Out <BsArrowRightShort />
                    </Button>
                </PopoverBody>
            </Popover>
        </>
    )
}