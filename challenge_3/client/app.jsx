<<<<<<< HEAD
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

function CreateAccount(props){
  return (
    <div id='UserAccForm'>
        <form method='POST' action='/createUser'>
          <p>Name: <input type='text'/> </p>
          <p>Email: <input type='text'/></p>
          <p>Password:<input type='text'/> </p>
          <input type='submit' onClick={(e)=>{props.click(e)}} value='next'/>
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

function BillingInfo(props){
  return (
    <div id='billingForm'>
    <form method='POST' action='/billing'>
    <p> Credit Card #: <input type='text'/></p>
    <p>Expiry Date: <input type='text'/></p>
    <p>CVV:<input type='text'/> </p>
    <p>zip code: <input type='text'/></p>
    <input type='submit' onClick={()=>{props.click()}} value='next'/>
    </form>
  </div>
  );
}

function ShippingInfo(props){
  return (
    <div id='shippingForm'>
        <form method='POST' action='/shipping'>
        Address:
        <p>Line1:<input type='text'/> </p>
        <p>Line2:<input type='text'/> </p>
        <p>city:<input type='text'/> </p>
        <p>state:<input type='text'/> </p>
        <p>zip code:<input type='text'/></p>
        <p>phone number:<input type='text'/> </p>
        <input type='submit' onClick={()=>{props.click()}} value='next'/>
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
      page:<HomePage click={this.checkout}/>
    };
  }

  checkout(event){
    this.setState(state =>({form: 'userAccount',
      page: <CreateAccount click={this.submitUser}/>
    }));
  }
  submitUser(event){ //needs to send info to server
    event.preventDefault();
    this.setState(state=>({form:'shipping',
    page: <ShippingInfo click={this.submitShipping}/>
  }));
  }
  submitShipping(event){
    this.setState(state=>({form:'billing',
    page: <BillingInfo click={this.submitBilling}/>
  }));
  }
  submitBilling(event){
    this.setState(state=>({form:'confirmation',
    page: <ConfirmationPage click={this.submitConfirm}/>
  }));
  }
  submitConfirm(event){
    this.setState(state=>({form:'homePage',
    page: <HomePage click={this.checkout}/>
  }));
  }

  render(){
    console.log('REndering: ',this.state.form);
    return this.state.page;
  }
}

ReactDOM.render(<LoadPage />, document.getElementById('shoppingCart')); //??
=======
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
>>>>>>> 472a1c67dc05ba439a72004c8237373cccea7e98
