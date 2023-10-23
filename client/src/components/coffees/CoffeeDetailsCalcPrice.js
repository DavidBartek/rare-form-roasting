import { useEffect, useState } from "react";
import { priceFormatter } from "../assets/exportFunctions"
import { getWeightById } from "../../managers/productManager";

export default function CoffeeDetailsCalcPrice ({ coffeeDetails, selectedWeightObj, selectedQuantity }) {
    
    
    // useEffect(() => {
    //     if (!selectedWeightId && selectedWeightId !== "") {
    //         getWeightById(selectedWeightId).then(setWeightObj);
    //     }
    // }, [selectedWeightId]);

    // console.log(weightSettings);
    // console.log(selectedWeightId);

    // if (!selectedWeightId && selectedWeightId !== "") {
    //     // console.log(selectedWeightId)
    //     setWeightObj(weightSettings.find(w => w.id === selectedWeightId));
        
    // }

    // console.log(coffeeDetails)
    // console.log(weightObj)
    // console.log(selectedQuantity)
    return <>
    <h4>Price</h4>
        {selectedWeightObj && selectedQuantity ? (
            <h4>${priceFormatter(coffeeDetails.price * selectedWeightObj.priceMultiplier * selectedQuantity)}</h4> 
        ) : ( 
            <h4>From ${priceFormatter(coffeeDetails.price)}</h4>
        )}
    </>
}