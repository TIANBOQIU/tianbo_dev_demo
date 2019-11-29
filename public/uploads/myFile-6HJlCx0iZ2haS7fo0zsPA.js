import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import BasicButton from './BasicButton01';
import BasicInputText from './BasicInputText04';
import BasicInputMulti from './state-input-multi';
import FormBasicValidation from './form-validation';
import FieldForm from './field-component-form';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BasicButton />, document.getElementById('root'));
ReactDOM.render(<BasicInputText />, document.getElementById('basic-text-input'));
ReactDOM.render(<BasicInputMulti />, document.getElementById('basic-input-multi'));
ReactDOM.render(<FormBasicValidation />, document.getElementById('basic-form-validation'));
ReactDOM.render(<FieldForm />, document.getElementById('field-form'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
