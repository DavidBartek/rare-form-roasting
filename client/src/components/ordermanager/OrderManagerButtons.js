import { Button } from "reactstrap";
import { BsCaretRight } from "react-icons/bs";

export default function OrderManagerButtons ( {o, viewOrderDetails, handleConfirmFulfill, handleConfirmCancel} ) {
    
    if (o.orderStatus === "Processing") {
        return (
            <>
                <td>
                    <br />
                    <Button onClick={(e) => viewOrderDetails(e, o)} className="button" style={{
                        backgroundColor: "#75BCFA",
                        color: "#021E36",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "0px",
                        transition: "box-shadow 0.1s",
                        fontSize: "larger"
                        }}>
                        View Details
                        <BsCaretRight className="textReset" style={{marginBottom: "2px"}}/>
                    </Button>
                </td>
                <td>
                    <Button onClick={(e) => handleConfirmFulfill(e, o.id)} className="button" style={{
                        backgroundColor: "#FAB375",
                        color: "#021E36",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "0px",
                        transition: "box-shadow 0.1s",
                        fontSize: "larger"
                        }}>
                        Mark Fulfilled
                    </Button>
                    <br /><br />
                    <Button onClick={(e) => handleConfirmCancel(e, o.id)} className="button" style={{
                        backgroundColor: "#021E36",
                        color: "#FEF5ED",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "0px",
                        transition: "box-shadow 0.1s",
                        fontSize: "larger"
                        }}>
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
                    <Button onClick={(e) => viewOrderDetails(e, o)} className="button" style={{
                        backgroundColor: "#75BCFA",
                        color: "#021E36",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "0px",
                        transition: "box-shadow 0.1s",
                        fontSize: "larger"
                        }}>
                        View Details
                        <BsCaretRight className="textReset" style={{marginBottom: "2px"}}/>
                    </Button>
                </td>
                <td>
                    {' '}
                </td>
                {/* <td>
                    {' '}
                </td> */}
            </>
        )
    }
    
}