import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { homePageMapEmbed } from "../../GoogleMapsData";

export default function Home () {
    const navigate = useNavigate();

    const handleNavToCoffeeDetail = (e) => {
        e.preventDefault();
        navigate("/coffees/4");
    }

    const handleNavToCoffees = (e) => {
        e.preventDefault();
        navigate("/coffees");
    }

    return (
        <div className="home">
            <div className="homeHeaderContainer">
                <div className="headerImageContainer">
                    <img src="/assets/coffee-bag-mockup-front-niccy.png" alt="banner"/>
                    <img src="/assets/coffee-bag-mockup-back.png" alt="banner"/>
                </div>
                <div className="headerButtonContainer">
                    <h2>New drop:</h2>
                    <h4>Nicaragua La Bastilla Centroamericano</h4>
                    <Button className="button" style={{
                        backgroundColor: "#FAB375",
                        color: "#021E36",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "0px",
                        fontSize: "x-large",
                        transition: "box-shadow 0.1s"
                        }} 
                    onClick={(e) => handleNavToCoffeeDetail(e)}    
                    >Take me there</Button>
                </div>
            </div>
            <div style={{textAlign: "center", marginTop: "30px", marginBottom: "30px"}}>
                <h1>We're Rare Form Roasting Co.</h1>
                <h4>We specialize in small, made-to-order batches of light-roasted, single-origin coffee - <br/>
                enjoying all that coffee can be in its best, most rare form.</h4>
                <Button onClick={(e) => handleNavToCoffees(e)} className="button" style={{
                    backgroundColor: "#75BCFA",
                    color: "#021E36",
                    fontWeight: 800,
                    border: "none",
                    borderRadius: "0px",
                    fontSize: "x-large",
                    transition: "box-shadow 0.1s"
                    }} >
                    Find Your Perfect Coffee
                </Button>
            </div>
            <div className="homeBottom">
            
                <div className="homeMapContainer">
                    <iframe
                        title="homeMap"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={homePageMapEmbed}
                        allowFullScreen
                        style={{width: "100%", height: "30vh"}}
                    >
                    </iframe>
                    <h4>Proudly roasted in Denver, CO.</h4>
                </div>

                <div className="emailSignupContainer" style={{textAlign: "center"}}>
                    <h4>Be the first to learn about new origins, meet our team, and more.</h4>
                    <Form>
                        <FormGroup style={{maxWidth: "100%"}}>
                            <Input 
                                id="emailSignup"
                                name="emailSignup"
                                type="email"
                                placeholder="Email"
                                style={{fontSize: "larger"}}
                            />
                        </FormGroup>
                    </Form>
                    <Button className="button" style={{
                        backgroundColor: "#FDE6FE",
                        color: "#021E36",
                        fontWeight: 800,
                        border: "none",
                        borderRadius: "0px",
                        fontSize: "x-large",
                        transition: "box-shadow 0.1s"
                        }}>
                        Sign up
                    </Button>
                    <h6>We respect your privacy.</h6>
                </div>

            </div>
        </div>
        // <Container>
        //     <h1>Welcome to Rare Form Roasting</h1>
        //     <div>Banner graphic & button here</div>
        // </Container>
    )
}