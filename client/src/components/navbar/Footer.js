import { BsEnvelope, BsInstagram } from "react-icons/bs";

export default function Footer () {
    return (
        <div className="footer">
            <img src="/Logo_Circle_Orange_1000x1000.svg" alt="circle logo" />
            <div className="footerLinks">
                <img src="/Logo_Plane.svg" alt="logo"/>
                <BsInstagram className="footerLink"/>
                <BsEnvelope className="footerLink"/>
                <img src="/Logo_Plane.svg" alt="logo" style={{transform: 'scaleX(-1)'}}/>
            </div>
        </div>
    )
}