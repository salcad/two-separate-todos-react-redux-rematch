import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { TodoMix1 } from './TodoMix1/TodoMix1';
import { TodoMix2 } from './TodoMix2/TodoMix2';

import * as models from "./Models";

import { init } from "@rematch/core";

import './index.css';

const store = init({
  models
});


const Root = () => {
  return (
    <div> 
    <TodoMix1 />
    <TodoMix2 />
  </div>
  )
}

render(
    <Provider store={store}>
       <Root/>
    </Provider>,
    document.getElementById('root')
  )

