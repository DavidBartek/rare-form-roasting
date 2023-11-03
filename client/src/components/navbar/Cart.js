import { useEffect, useState } from "react";
import { BsCart, BsArrowRightShort } from "react-icons/bs";
import { deleteOrderProduct, getCurrentOrder } from "../../managers/orderManager";
import { Button, Popover, PopoverBody, Table } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { priceFormatter } from "../assets/exportFunctions";
import CartQuantityEdit from "./CartQuantityEdit";

export default function Cart ({ loggedInUser }) {
    const [cart, setCart] = useState({});
    const [popover, setPopover] = useState(false);
    const [deleteConfirmById, setDeleteConfirmById] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            return;
        } else {
            getCurrentOrder(loggedInUser.id).then(setCart);
        }
    }, [cart, loggedInUser]);
    
    const togglePopover = () => {
        setPopover(!popover);
    };

    const handleNavToProduct = (e, productId) => {
        e.preventDefault();
        navigate(`/coffees/${productId}`)
        setPopover(false);
    }

    const handleRemoveFromCart = (e, opId) => {
        e.preventDefault();
        setDeleteConfirmById(opId);
    }

    const handleDeleteConfirm = (e, opId) => {
        e.preventDefault();
        deleteOrderProduct(opId).then(() => setDeleteConfirmById(""));
    }

    const handleNavToCheckout = (e) => {
        e.preventDefault();
        togglePopover();
        navigate("checkout");
    }
    
    if (!loggedInUser || !cart) {
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
                        <Link to="/login" style={{backgroundColor: "#FFF", fontSize: "larger"}}>
                            Log in to view cart
                        </Link>
                    </PopoverBody>
                </Popover>
            </>
        )
    } else if (cart.totalPrice === 0) {
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
                    <PopoverBody style={{backgroundColor: "#FFF", fontSize: "larger"}}>
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
                <PopoverBody >
                    <h5 style={{backgroundColor: "#FFF"}}>Cart</h5>
                    <Table borderless>
                        <tbody>
                            {cart.orderProducts?.map(op =>
                            <tr key={op.id}>
                                <th>
                                    <img src={op.product.imageLocation} alt="coffee" 
                                        onClick={(e) => handleNavToProduct(e, op.product.id)}
                                        className="button" 
                                        style={{
                                            backgroundColor: "#FFF", width: "60px"
                                        }} />
                                </th>
                                <td>
                                    <h5 style={{backgroundColor: "#FFF"}}>{op.product.displayName}</h5>
                                    <h6 style={{backgroundColor: "#FFF"}}>${priceFormatter(op.subtotal)}</h6>
                                    Size: {op.weight.weightOz} oz<br />
                                    Grind: {op.grind.grindSetting}<br />
                                    <CartQuantityEdit op={op} quantity={op.productQuantity}/>
                                    {deleteConfirmById === op.id ? (
                                    <>
                                    <strong style={{backgroundColor: "#FFF"}}>
                                        Are you sure?
                                    </strong><br/>
                                    <Button onClick={() => setDeleteConfirmById("")} className="button" style={{
                                        backgroundColor: "#75BCFA",
                                        color: "#FEF5ED",
                                        fontWeight: 600,
                                        border: "none",
                                        borderRadius: "0px",
                                        transition: "box-shadow 0.1s"
                                    }}>
                                        no
                                    </Button>
                                    <Button onClick={(e) => handleDeleteConfirm(e, op.id)} className="button" style={{
                                        backgroundColor: "#021E36",
                                        color: "#FEF5ED",
                                        fontWeight: 600,
                                        border: "none",
                                        borderRadius: "0px",
                                        transition: "box-shadow 0.1s"
                                    }}>
                                        yes
                                    </Button>
                                    </>
                                    ) : (
                                    <Button onClick={(e) => handleRemoveFromCart(e, op.id)} style={{
                                        backgroundColor: "#FFF",
                                        color: "#021E36",
                                        fontWeight: 800,
                                        border: "none",
                                        borderRadius: "0px",
                                        transition: "box-shadow 0.1s"
                                    }}>
                                        Remove
                                    </Button>
                                    )}
                                </td>
                            </tr>
                            )}
                            <tr>
                                <th>
                                    Total
                                </th>
                                <td>
                                    <strong style={{backgroundColor: "#FFF"}}>${priceFormatter(cart.totalPrice)}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={(e) => handleNavToCheckout(e)} className="button" style={{
                        backgroundColor: "#FAB375",
                        color: "#021E36",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "0px",
                        transition: "box-shadow 0.1s",
                        width: "100%"
                    }}>
                        Check Out <BsArrowRightShort style={{backgroundColor: "transparent"}}/>
                    </Button>
                </PopoverBody>
            </Popover>
        </>
    )
}