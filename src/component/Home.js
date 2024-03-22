import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Navbar,
  Nav,
  Button,
  Modal,
  Carousel,
  Badge, // Add Badge component import
} from "react-bootstrap/";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image1 from "../images/imageicon.png";
import Image2 from "../images/imagebigshoe.jpg";
import Image7 from "../images/imagebigshoe.jpg";
import Image8 from "../images/image-product-2.jpg";
import Image9 from "../images/image-product-3.jpg";
import Image10 from "../images/image-product-4.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, selectCartItems } from "../redux/cartSlice";

function Lightbox({ show, handleClose, images }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton />
      <Modal.Body>
        <Carousel>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                src={image}
                className="d-block w-100"
                alt={`Image ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
}

function Home() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const imagesArray = [Image7, Image8, Image9, Image10];

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleImageClick = () => {
    setShowLightbox(true);
  };

  const handleCloseLightbox = () => {
    setShowLightbox(false);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (item) => {
    const itemWithQuantity = { ...item, quantity };
    dispatch(addToCart(itemWithQuantity));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  // Calculate the total quantity of items in the cart
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Container fluid>
      <Row>
        <Navbar
          collapseOnSelect
          expand="lg"
          className="border-bottom"
          style={{ borderBottom: "60px" }}
        >
          <Navbar.Brand href="#home">
            <h3 style={{ fontWeight: "bold" }}>
              <span style={{ fontWeight: "bold", paddingLeft: "23px" }}>
                sneakers
              </span>
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ fontWeight: "bold" }}>Collections</Nav.Link>
              <Nav.Link style={{ fontWeight: "bold" }}>Men</Nav.Link>
              <Nav.Link style={{ fontWeight: "bold" }}>Women</Nav.Link>
              <Nav.Link style={{ fontWeight: "bold" }}>About</Nav.Link>
              <Nav.Link style={{ fontWeight: "bold" }}>Contact</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                title={
                  <div style={{ marginButton: "19px" }}>
                    <i
                      className="bi bi-cart"
                      style={{
                        fontSize: "20px",

                        marginBottom: "10px",
                      }}
                    ></i>
                    {totalQuantity > 0 && (
                      <Badge
                        bg="warning"
                        className="ms-1"
                        style={{ backgroundColor: "hsl(26, 100%, 55%)" }}
                      >
                        {totalQuantity}
                      </Badge>
                    )}
                  </div>
                }
                drop="start"
                className="custom-cart-dropdown" // Added custom class
              >
                <NavDropdown.Item href="#action/3.1" style={{ width: "320px" }}>
                  <b>Cart</b>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {cartItems.length === 0 ? ( // Check if cartItems is empty
                  <NavDropdown.Item disabled>
                    <b>Cart is empty</b>
                  </NavDropdown.Item>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id}>
                        <NavDropdown.Item>
                          <img
                            src={Image8}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "20%",
                              marginRight: "20px",
                            }}
                          />
                          Fall Limited Edition Sneakers
                          <p style={{ textAlign: "center", fontSize: "14px" }}>
                            125.00 ({item.quantity}) ={" "}
                            <b>{item.price * item.quantity}.00</b>
                            <button
                              onClick={() => handleRemoveFromCart(item)}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                color: "hsl(26, 100%, 55%)",
                                fontSize: "16px",
                                transition: "color 0.3s ease",
                              }}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </p>
                        </NavDropdown.Item>
                      </div>
                    ))}
                    <NavDropdown.Item href="#action/3.2">
                      <div>
                        <Button
                          variant="light"
                          style={{
                            backgroundColor: "hsl(26, 100%, 55%)",
                            color: "white",
                            width: "100%",
                            fontSize: "13px",
                            height: "40px",
                            marginTop: "20px",
                          }}
                        >
                          Checkout
                        </Button>
                      </div>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>

              <Nav.Link
                eventKey={2}
                href="#memes"
                style={{ paddingTop: "20px" }}
              >
                <img
                  src={Image1}
                  alt="Example"
                  style={{ width: "35px", marginRight: "80px" }}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <Row>
        <Col md={6}>
          <img
            src={selectedImage || Image2}
            style={{
              maxWidth: "100%",
              height: "25rem",
              width: "100%",
              borderRadius: "10px",
              borderTopLeftRadius: "30px",
              borderTopRightRadius: "30px",
              paddingTop: "15px",
              cursor: "pointer",
            }}
            alt="Big Shoe"
            onClick={handleImageClick}
          />
          <Row style={{ paddingTop: "20px" }} className="d-none d-md-flex">
            {[Image7, Image8, Image9, Image10].map((image, index) => (
              <Col key={index} xs={6} sm={3}>
                <img
                  src={image}
                  style={{
                    height: "100px",
                    width: "100%",
                    borderRadius: "18px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  alt={`Thumbnail ${index + 3}`}
                  onClick={() => handleThumbnailClick(image)}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col
          md={6}
          style={{
            paddingTop: "70px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <p style={{ color: "hsl(26, 100%, 55%)" }}>
            <b>SNEAKER COMPANY</b>
          </p>
          <h1>
            <b>Fall Limited Edition</b>
          </h1>
          <h1>
            <b>Sneakers</b>
          </h1>
          <p style={{ color: " #999" }}>
            These low-profile sneakers are your perfect casual wear
            <br></br>
            companion. Featuring a durable rubber outer sole, they'll
            <br></br>
            withstand everything the weather can offer.
          </p>
          <div style={{ display: "inline-block" }}>
            <h2 style={{ display: "inline-block", marginRight: "10px" }}>
              <b>$125.00</b>
            </h2>
            <Button
              variant="light"
              style={{
                display: "inline-block",
                backgroundColor: "#fce1ae",
                color: "hsl(26, 100%, 55%)",
                border: "0px",
                marginBottom: "17px",
              }}
            >
              <b> 50%</b>
            </Button>
          </div>

          <h6 className="cancelled" style={{ color: "#adaaa1" }}>
            $250.00
          </h6>
          <Row>
            <Col
              md={4}
              style={{
                marginTop: "20px",
              }}
            >
              <Button
                variant="light"
                style={{
                  backgroundColor: "lavender",
                  color: "hsl(26, 100%, 55%)",
                  width: "50px",
                }}
                onClick={handleDecrement}
              >
                <b>
                  <b>
                    <b>-</b>
                  </b>
                </b>
              </Button>
              <Button
                variant="light"
                style={{
                  backgroundColor: "lavender",
                  width: "50px",
                }}
              >
                <span>{quantity}</span>
              </Button>

              <Button
                variant="light"
                style={{
                  backgroundColor: "lavender",
                  color: "hsl(26, 100%, 55%)",
                  width: "50px",
                }}
                onClick={handleIncrement}
              >
                <b>
                  <b>
                    <b>+</b>
                  </b>
                </b>
              </Button>
            </Col>
            <Col md={8}>
              <Button
                onClick={() =>
                  handleAddToCart({ id: 1, name: "Product 1", price: 125 })
                }
                variant="light"
                style={{
                  backgroundColor: "hsl(26, 100%, 55%)",
                  color: "white",
                  width: "20em",
                  maxWidth: "100%",
                  fontSize: "13px",
                  height: "40px",
                  marginTop: "20px",
                }}
              >
                <i
                  className="bi bi-cart"
                  style={{ fontSize: "15px", paddingRight: "13px" }}
                ></i>
                Add to cart
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Lightbox */}
      <Lightbox
        show={showLightbox}
        handleClose={handleCloseLightbox}
        images={imagesArray}
      />
    </Container>
  );
}

export default Home;
