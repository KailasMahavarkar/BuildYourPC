import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default class Checkout extends React.Component {
  onToken = (token) => {
    fetch("", {
      method: "POST",
      body: JSON.stringify(token),
    }).then((response) => {
      alert(`payment successfull`);
    });
  };

  render() {
    return (
      <StripeCheckout
        amount={this.props.TotalAmount + "00"}
        panelLabel="Pay "
        billingAddress
        description="Your custom built PC"
        image="https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/98/f4/3f/ac/d4684ba5b65b0e65ce6c4ca2/1080W_1080H.jpg"
        name="VIT PC BUILDER"
        stripeKey="pk_test_51IkTS0SGUsmocDuKEYPz6zm395ypfrCkfV6Phqb0DbQhWQypaUiAmaQvwJHNgI1JcwPNGmpdN08CEmcb4Pqs59L400FCkz15Eu"
        token={this.onToken}
        zipCode
        currency="INR"
      />
    );
  }
}
