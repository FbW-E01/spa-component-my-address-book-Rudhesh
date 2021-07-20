import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'



class App extends React.Component {
    constructor() {
        super()
        this.state = {
            newItem: "",
            list:[]
        }

    }

   //incorporating local storage 
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }



    updateInput(key, value){
    this.setState({[key] : value})
}
    addItem() {
        const newItem = {
            id:1 + Math.random(),
            value: this.state.newItem.slice()
        }

        const list = [...this.state.list];

        list.push(newItem);

        console.log(list)
 
        this.setState({
            list,
            newItem:""
        })

        

    }
    submit(e) {
        e.preventDefault()
    
    }

    deleteItem(id) {
        const list = [...this.state.list];

        const updatedList = list.filter(item => item.id !== id)

        console.log(updatedList)

        this.setState({list: updatedList});
    }




    render() {
        const style = {
            float: "right"
          };
        return (
            <div className="container mt-5">
                <h1>Address Book App</h1>
                <Form onSubmit={(e)=> this.submit(e)}>
                    <Form.Group className="mb-3 d-flex">
                        <Form.Control 
                        type="text" 
                        placeholder="Name"
                        value={this.state.newItem}
                        onChange={e => this.updateInput("newItem", e.target.value)}
                        />
                    
                        <Button onClick={()=> this.addItem()}
                        disabled={!this.state.newItem.length} 
                        className="mx-3" variant="primary" type="submit">
                            Update
                            </Button>
                    </Form.Group>

                    <ListGroup>

{this.state.list.map(item => { 
    return(
        <ListGroup.Item 
        key={item.id} 
        variant="primary">
            {item.value}
        <Button
         style={style}
         variant="danger" 
         onClick={()=> this.deleteItem(item.id)}>
             Delete
             </Button>
        </ListGroup.Item>

    )

} )}
</ListGroup>


                </Form>
            </div>
        )
    }
}

export default App