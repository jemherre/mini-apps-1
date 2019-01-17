function CreateAccount(props){
  return (
    <div id='UserAccForm'>
        <form onSubmit={(e)=>{props.click(e)}}>
          <p>Name: <input type='text' id='name'/> </p>
          <p>Email: <input type='text' id='email'/></p>
          <p>Password:<input type='password' id='password'/> </p>
          <input type='submit' value='next'/>
        </form>
      </div>
    );
}
//onclick vs on submit

function HomePage(props){
  return (
    <div id='home'>
      <button onClick={()=>{props.click()}}>Checkout</button> 
    </div>
  );
}

function ShippingInfo(props){
  return (
    <div id='shippingForm'>
        <form onSubmit={(e)=>{props.click(e)}}>
        Address:
        <p>Line1:<input type='text' id='l1'/> </p>
        <p>Line2:<input type='text'id='l2'/> </p>
        <p>city:<input type='text' id='city'/> </p>
        <p>state:<input type='text' id='state'/> </p>
        <p>zip code:<input type='text' id='zip'/></p>
        <p>phone number:<input type='text' id='phone'/> </p>
        <input type='submit' value='next'/>
        </form>
      </div>
  );
}

function BillingInfo(props){
  return (
    <div id='billingForm'>
      <form onClick={(e)=>{props.click(e)}} >
        <p> Credit Card #: <input type='text' id='cc'/></p>
        <p>Expiry Date: <input type='text' id='eDate'/></p>
        <p>CVV:<input type='text' id='cvv'/> </p>
        <p>zip code: <input type='text' id='zip'/></p>
        <input type='submit' value='next'/>
      </form>
    </div>
  );
}

function ConfirmationPage(props){
  return (
    <div id='home'>
      <p>Renders info from database</p>
      <button onClick={(e)=>{props.click(e)}}> Purchase </button>
    </div>
  );
}

class LoadPage extends React.Component{
  constructor(props){
    super(props);

    this.checkout = this.checkout.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.submitShipping = this.submitShipping.bind(this);
    this.submitBilling = this.submitBilling.bind(this);
    this.submitConfirm = this.submitConfirm.bind(this);
    
    this.state = {
      form : 'homePage', 
      page: <HomePage click={this.checkout}/>
    };
  }

  checkout(event){//homepage
    this.setState(state =>({form: 'userAccount',
      page: <CreateAccount click={this.submitUser}/>
    }));
  }
  submitUser(event){ //account
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
      success: function(result){
        console.log('success',result);
      }
    });
    this.setState(state=>({form:'shipping',
      page: <ShippingInfo click={this.submitShipping}/>
    }));
  }
  submitShipping(event){//shipping
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
      success: function(result){
        console.log('success',result);
      }
    });
    this.setState(state=>({form:'billing',
    page: <BillingInfo click={this.submitBilling}/>
  }));
  }
  submitBilling(event){
    event.preventDefault();
    var bill = {
      cc: document.getElementById('cc').value,
      eDate: document.getElementById('eDate').value,
      cvv: document.getElementById('cvv').value,
      zip: document.getElementById('zip').value
    };
    console.log(bill)
    $.ajax({
      method: 'POST',
      url: '/billing',
      data: bill,
      success: function(result){
        console.log('success',result);
      }
    });
    this.setState(state=>({form:'confirmation',
      page: <ConfirmationPage click={this.submitConfirm}/>
    }));
  }
  submitConfirm(event){
  var gotToHome = ()=>{this.setState(state=>({form:'homePage',
    page: <HomePage click={this.checkout}/>
  }))};

  $.ajax({
    method: 'GET',
    url: 'confirmation',
    success: function(result){
      console.log('sucess',result);
      goToHome();
    }
  });

  }

  render(){
    console.log('REndering: ',this.state.form);
    return this.state.page;
  }
}

ReactDOM.render(<LoadPage />, document.getElementById('shoppingCart'));