'use strict';

const createReactElement = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props); /// Call React.Component constructor and than pass the props to its constructor
    this.state = { liked: false }; // react componenet default sate: liked: false.
    console.log(props);
  }

// On each change of the state(any use of setState) we re render the componenet
// So when we press the button we will use the function(setState) of the parent to change the state
// Then we pass new object with the key we want to update.
// Using this function will cause the componenet to re render eachtime no matter if we actually had change in the state and than we will have new render result of "You liked this."
// If we change the React.Componenet to React.PureComponenet only if we actually had a change in the state from the previous state, the componenet will re render.
  render() { 

    // Twice:
    // One for the first init of the componenet, another when we press the button and change the state.
    console.log("Render init")

    if (this.state.liked) {

      /*// Without JSX:
      return createReactElement(
        'button',
        { onClick: () => this.setState({ liked: false }) },
        'Disklike'
      );
      */
    // With JSX:

    // We use arrow function so "this" in setState will point to LikeButton componenet
    return (
      <button onClick={() => this.setState({ liked: false })}>Disklike</button>
    );


    }

    // Render will result with another react element

    /*// Without JSX:
    return createReactElement(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );*/

    // With JSX:

    // We use arrow function so "this" in setState will point to LikeButton componenet
    return (
      <button onClick={() => this.setState({ liked: true })}>Like</button>
    );


  }
}

const domContainer = document.querySelector('#like_button_container');

// We create react element(as LikeButton componenet) that will result a render of button as react element.
// A click on the button element will cause a state change in the LikeButton componenet and the render will respond accordingly. 
// So if the state of "liked" property will be true the react componenet will result a render of "You liked this."

// Without JSX:
//ReactDOM.render(createReactElement(LikeButton, {name:'sara'}), domContainer);

// With JSX:

ReactDOM.render(<LikeButton name="sara"></LikeButton>, domContainer);


// We can pass props to the componenet by the second parameter of the React.createElement