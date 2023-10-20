import { useEffect, useState } from "react";
import { getAllProducts } from "../../managers/productManager";
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Container } from "reactstrap";
import { priceFormatter } from "../assets/exportFunctions";

export default function CoffeeList () {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then(setProducts);
    }, []);
    
    if (products.length === 0) {
        return null;
    }
    return (
        <Container>
            <h1>Our current offering of single-origin coffees.</h1>
            <p>Sort by: select dropdown here</p>
            <div>
                {products.map(p =>
                    <Card 
                        key={p.id}
                        style={{width: '22rem'}}
                    >
                        <img
                            alt="sample"
                            src="https://picsum.photos/1000"
                            width="100%"
                        />
                        <CardBody>
                            <CardTitle tag="h5">
                                {p.displayName}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6">
                                From ${priceFormatter(p.price)}
                            </CardSubtitle>
                            <CardText>
                                {p.tastingNotes}
                            </CardText>
                        </CardBody>
                    </Card>    
                )}
            </div>
        </Container>
    )
}

// styling guide:
// https://reactstrap.github.io/?path=/docs/components-card--card

// refactor:

// Only display image
// on hover: image fades hard, text displays display name + "From" price 