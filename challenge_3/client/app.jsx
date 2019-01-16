
// class CreateAccount extends React.Component{
//   constructor(props){
//     super(props);
//   }
//   render(){
//     return (
//       <div id='UserAccForm'>
//         <form method='post' action='/createUser'>
//           <label> Name:
//             <input type='text'/>
//           </label>
//           <label> Email:
//             <input type='text'/>
//           </label>
//           <label> Password:
//             <input type='text'/>
//           </label>
//         </form>
//         <button onclick={this.props.buttonClick}>Next</button>
//       </div>
//     );
//   }
// }
function CreateAccount(props) { 
  console.log('createAccount');
  return (
    <div id='UserAccForm'>
      <form method='POST' action='/createUser'>
        <label> Name:
          <input type='text'/>
        </label>
        <label> Email:
          <input type='text'/>
        </label>
        <label> Password:
          <input type='text'/>
        </label>
      </form>
      <button onClick={()=>{props.buttonClick}}>Next</button>
    </div>
    );
}

function HomePage(props) { 
  return (
    <div id='home'>
      <button onClick={()=>{props.onClick}}>Checkout</button> 
    </div>
  );
}

class LoadPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      form : 'homePage',
      page: <HomePage onClick={()=>{this.buttonClick}}/> 
    };
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(event){
    console.log('click',event);
    if(this.form === 'homePage') {
      this.setState(state =>({form: 'accountUser', page: <CreateAccount /> }));
    } else if(this.form === 'userAccount') {
      this.setState(state =>({form: 'accountUser'}));
    } else if (this.form === 'userShipping') {
      this.setState(state =>({form: 'accountUser'}));
    } else if (this.form === 'userBilling') {
      this.setState(state =>({form: 'accountUser'}));
    } else if(this.form === 'userConfirm') {
      this.setState(state =>({form: 'accountUser'}));
    } else {
      this.setState(state =>({form: 'accountUser'}));
    }
  }

  // componentDidMount(){
  //   console.log('home page,',this.buttonClick);
  //   this.setState(state =>({form: 'home', page: <HomePage click={()=>{this.buttonClick}}/> }));
  // }

  render(){
    console.log('REndering: ',this.state.page);
    return this.state.page;
  }
}


ReactDOM.render(<LoadPage />, document.getElementById('shoppingCart')); //??