import { Button } from "reactstrap";
import { BsCaretRight } from "react-icons/bs";

export default function OrderManagerButtons ( {o, viewOrderDetails, handleConfirmFulfill, handleConfirmCancel} ) {
    
    if (o.orderStatus === "Processing") {
        return (
            <>
                <td>
                    <br />
                    <Button onClick={(e) => viewOrderDetails(e, o)}>
                        View Details
                        <BsCaretRight />
                    </Button>
                </td>
                <td>
                    <br />
                    <Button onClick={(e) => handleConfirmFulfill(e, o.id)}>
                        Mark Fulfilled
                    </Button>
                </td>
                <td>
                    <br />
                    <Button onClick={(e) => handleConfirmCancel(e, o.id)}>
                        Cancel Order
                    </Button>
                </td>
            </>
        )
    } else if (o.orderStatus === "Shipped" || o.orderStatus === "Cancelled") {
        return (
            <>
                <td>
                    <br />
                    <Button onClick={(e) => viewOrderDetails(e, o)}>
                        View Details
                        <BsCaretRight />
                    </Button>
                </td>
                <td>
                    {' '}
                </td>
                <td>
                    {' '}
                </td>
            </>
        )
    }
    
}