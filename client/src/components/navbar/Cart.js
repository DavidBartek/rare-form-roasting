import { useEffect, useState } from "react";
import { BsCart, BsArrowRightShort, BsPlusLg, BsDashLg } from "react-icons/bs";
import { getCurrentOrder } from "../../managers/orderManager";
import { Button, Popover, PopoverBody, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { priceFormatter } from "../assets/exportFunctions";
import CartQuantityEdit from "./CartQuantityEdit";

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
                trigger="click"
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
                                    <h5>{op.product.displayName}</h5>
                                    Size: {op.weight.weightOz} oz<br />
                                    Grind: {op.grind.grindSetting}<br />
                                    <CartQuantityEdit op={op} quantity={op.productQuantity}/><br />
                                    {/* // delete from cart here */}
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
                    <Button >
                        Check Out <BsArrowRightShort />
                    </Button>
                </PopoverBody>
            </Popover>
        </>
    )
}