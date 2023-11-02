import { BsEnvelope, BsInstagram } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Footer () {
    const navigate = useNavigate();

    const handleNavHome = (e) => {
        e.preventDefault();
        navigate("/");
        window.scrollTo(0, 0);
    }

    return (
        <div className="footer">
            <img className="footerLogo" onClick={(e) => handleNavHome(e)}src="/Logo_Circle_Orange_1000x1000.svg" alt="circle logo" />
            <div className="footerLinks">
                <img src="/Logo_Plane.svg" alt="logo"/>
                <BsInstagram className="footerLink"/>
                <BsEnvelope className="footerLink"/>
                <img src="/Logo_Plane.svg" alt="logo" style={{transform: 'scaleX(-1)'}}/>
            </div>
        </div>
    )
}