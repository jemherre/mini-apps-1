function CreateAccount(props) {
  return React.createElement("div", {
    id: "UserAccForm"
  }, React.createElement("form", {
    onSubmit: e => {
      props.click(e);
    }
  }, React.createElement("p", null, "Name: ", React.createElement("input", {
    type: "text",
    id: "name"
  }), " "), React.createElement("p", null, "Email: ", React.createElement("input", {
    type: "text",
    id: "email"
  })), React.createElement("p", null, "Password:", React.createElement("input", {
    type: "password",
    id: "password"
  }), " "), React.createElement("input", {
    type: "submit",
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

function ShippingInfo(props) {
  return React.createElement("div", {
    id: "shippingForm"
  }, React.createElement("form", {
    onSubmit: e => {
      props.click(e);
    }
  }, "Address:", React.createElement("p", null, "Line1:", React.createElement("input", {
    type: "text",
    id: "l1"
  }), " "), React.createElement("p", null, "Line2:", React.createElement("input", {
    type: "text",
    id: "l2"
  }), " "), React.createElement("p", null, "city:", React.createElement("input", {
    type: "text",
    id: "city"
  }), " "), React.createElement("p", null, "state:", React.createElement("input", {
    type: "text",
    id: "state"
  }), " "), React.createElement("p", null, "zip code:", React.createElement("input", {
    type: "text",
    id: "zip"
  })), React.createElement("p", null, "phone number:", React.createElement("input", {
    type: "text",
    id: "phone"
  }), " "), React.createElement("input", {
    type: "submit",
    value: "next"
  })));
}

function BillingInfo(props) {
  return React.createElement("div", {
    id: "billingForm"
  }, React.createElement("form", {
    onClick: e => {
      props.click(e);
    }
  }, React.createElement("p", null, " CC #: ", React.createElement("input", {
    type: "text",
    id: "cc"
  })), React.createElement("p", null, "Expiry Date: ", React.createElement("input", {
    type: "text",
    id: "eDate"
  })), React.createElement("p", null, "C V V:", React.createElement("input", {
    type: "text",
    id: "cvv"
  }), " "), React.createElement("p", null, "zip code: ", React.createElement("input", {
    type: "text",
    id: "zip"
  })), React.createElement("input", {
    type: "submit",
    value: "next"
  })));
}

function loadCartInfo(cb) {
  $.ajax({
    method: 'GET',
    url: '/confirmation',
    success: function (result) {
      console.log('success', result);
      var data = JSON.parse(result);
      var html = `
      <div id='user'> 
      User:
      <p>Name: ${data.user.name}</p>
      <p>Email: ${data.user.email}</p>
      </div>
      <br>
      <div id='address'>
      Address:
      <p>Address 1: ${data.ship.add1} </p>
      <p>Address 2: ${data.ship.add2} </p>
      <p>city: ${data.ship.city}</p>
      <p>state: ${data.ship.state} </p>
      <p>zip code: ${data.ship.zip}</p>
      <p>phone number: ${data.ship.phone}</p>
      </div>
      <br>
      <div id='billing'>
      Billing:
      <p>Credit Card#: ${data.bill.cc} </p>
      <p>exp: ${data.bill.exp} </p>
      <p>cvv: ${data.bill.cvv}</p>
      <p>zip code: ${data.bill.zip}</p>
      </div>`;
      document.getElementById('info').innerHTML = html;
    }
  });
}

;

function ConfirmationPage(props) {
  return React.createElement("div", {
    id: "home"
  }, React.createElement("span", {
    id: "info"
  }), React.createElement("button", {
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
    //homepage
    this.setState(state => ({
      form: 'userAccount',
      page: React.createElement(CreateAccount, {
        click: this.submitUser
      })
    }));
  }

  submitUser(event) {
    //account
    event.preventDefault();
    var user = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
    console.log(user);
    $.ajax({
      method: 'POST',
      url: '/createUser',
      data: user,
      success: function (result) {
        console.log('success', result);
      }
    });
    this.setState(state => ({
      form: 'shipping',
      page: React.createElement(ShippingInfo, {
        click: this.submitShipping
      })
    }));
  }

  submitShipping(event) {
    //shipping
    event.preventDefault();
    var ship = {
      add1: document.getElementById('l1').value,
      add2: document.getElementById('l2').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      zip: document.getElementById('zip').value,
      phone: document.getElementById('phone').value
    };
    console.log(ship);
    $.ajax({
      method: 'POST',
      url: '/shipping',
      data: ship,
      success: function (result) {
        console.log('success', result);
      }
    });
    this.setState(state => ({
      form: 'billing',
      page: React.createElement(BillingInfo, {
        click: this.submitBilling
      })
    }));
  }

  submitBilling(event) {
    event.preventDefault();
    var bill = {
      cc: document.getElementById('cc').value,
      eDate: document.getElementById('eDate').value,
      cvv: document.getElementById('cvv').value,
      zip: document.getElementById('zip').value
    };
    console.log(bill);
    $.ajax({
      method: 'POST',
      url: '/billing',
      data: bill,
      success: function (result) {
        console.log('success', result);
        loadCartInfo();
      }
    });
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

ReactDOM.render(React.createElement(LoadPage, null), document.getElementById('shoppingCart'));