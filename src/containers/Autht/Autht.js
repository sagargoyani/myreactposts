// import React, { useState } from 'react';

// function Example() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }


import React, {useState} from 'react';
// import withHooks, { useState } from 'react-with-hooks';

const Autht = (props) => {
    const [count, setCount] = useState('0');
  {  console.log(count);}
  
    return (<h1>ok..</h1>);
}   

export default Autht;