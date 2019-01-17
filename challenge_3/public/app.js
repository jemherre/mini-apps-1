// class Home extends React.Component{
//   constructor(props){
//     super(props);
//   }
//   render(){
//     console.log('Home');
//     return (
//       <div id='home'>
//         <button onClick={()=>{this.props.click()}}>Checkout</button> 
//       </div>
//     );
//   }
// }
function CreateAccount(props) {
  return React.createElement("div", {
    id: "UserAccForm"
  }, React.createElement("form", {
    method: "POST",
    action: "/createUser"
  }, React.createElement("p", null, "Name: ", React.createElement("input", {
    type: "text"
  }), " "), React.createElement("p", null, "Email: ", React.createElement("input", {
    type: "text"
  })), React.createElement("p", null, "Password:", React.createElement("input", {
    type: "text"
  }), " "), React.createElement("input", {
    type: "submit",
    onClick: e => {
      props.click(e);
    },
    value: "next"
  })));
} //onclick vs on submit


function HomePage(props) {
  return React.createElement("div", {
    id: "home"
  }, React.createElement("button", {
    onClick: () => {
      props.click();
    }
  }, "Checkout"));
}

function BillingInfo(props) {
  return React.createElement("div", {
    id: "billingForm"
  }, React.createElement("form", {
    method: "POST",
    action: "/billing"
  }, React.createElement("p", null, " Credit Card #: ", React.createElement("input", {
    type: "text"
  })), React.createElement("p", null, "Expiry Date: ", React.createElement("input", {
    type: "text"
  })), React.createElement("p", null, "CVV:", React.createElement("input", {
    type: "text"
  }), " "), React.createElement("p", null, "zip code: ", React.createElement("input", {
    type: "text"
  })), React.createElement("input", {
    type: "submit",
    onClick: () => {
      props.click();
    },
    value: "next"
  })));
}

function ShippingInfo(props) {
  return React.createElement("div", {
    id: "shippingForm"
  }, React.createElement("form", {
    method: "POST",
    action: "/shipping"
  }, "Address:", React.createElement("p", null, "Line1:", React.createElement("input", {
    type: "text"
  }), " "), React.createElement("p", null, "Line2:", React.createElement("input", {
    type: "text"
  }), " "), React.createElement("p", null, "city:", React.createElement("input", {
    type: "text"
  }), " "), React.createElement("p", null, "state:", React.createElement("input", {
    type: "text"
  }), " "), React.createElement("p", null, "zip code:", React.createElement("input", {
    type: "text"
  })), React.createElement("p", null, "phone number:", React.createElement("input", {
    type: "text"
  }), " "), React.createElement("input", {
    type: "submit",
    onClick: () => {
      props.click();
    },
    value: "next"
  })));
}

function ConfirmationPage(props) {
  return React.createElement("div", {
    id: "home"
  }, React.createElement("p", null, "Renders info from database"), React.createElement("button", {
    onClick: e => {
      props.click(e);
    }
  }, " Purchase "));
}

class LoadPage extends React.Component {
  constructor(props) {
    super(props);
    this.checkout = this.checkout.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.submitShipping = this.submitShipping.bind(this);
    this.submitBilling = this.submitBilling.bind(this);
    this.submitConfirm = this.submitConfirm.bind(this);
    this.state = {
      form: 'homePage',
      page: React.createElement(HomePage, {
        click: this.checkout
      })
    };
  }

  checkout(event) {
    this.setState(state => ({
      form: 'userAccount',
      page: React.createElement(CreateAccount, {
        click: this.submitUser
      })
    }));
  }

  submitUser(event) {
    //needs to send info to server
    event.preventDefault();
    this.setState(state => ({
      form: 'shipping',
      page: React.createElement(ShippingInfo, {
        click: this.submitShipping
      })
    }));
  }

  submitShipping(event) {
    this.setState(state => ({
      form: 'billing',
      page: React.createElement(BillingInfo, {
        click: this.submitBilling
      })
    }));
  }

  submitBilling(event) {
    this.setState(state => ({
      form: 'confirmation',
      page: React.createElement(ConfirmationPage, {
        click: this.submitConfirm
      })
    }));
  }

  submitConfirm(event) {
    this.setState(state => ({
      form: 'homePage',
      page: React.createElement(HomePage, {
        click: this.checkout
      })
    }));
  }

  render() {
    console.log('REndering: ', this.state.form);
    return this.state.page;
  }

}

ReactDOM.render(React.createElement(LoadPage, null), document.getElementById('shoppingCart')); //??