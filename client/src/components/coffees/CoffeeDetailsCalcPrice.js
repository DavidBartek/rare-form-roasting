import { useEffect, useState } from "react";
import { priceFormatter } from "../assets/exportFunctions"
import { getWeightById } from "../../managers/productManager";

export default function CoffeeDetailsCalcPrice ({ coffeeDetails, selectedWeightId, selectedWeightObj, selectedQuantity }) {
    
    return <>
    <h4>Price</h4>
        {selectedWeightId && selectedQuantity ? (
            <h4>${priceFormatter(coffeeDetails.price * selectedWeightObj.priceMultiplier * selectedQuantity)}</h4> 
        ) : ( 
            <h4>From ${priceFormatter(coffeeDetails.price)}</h4>
        )}
    </>
}