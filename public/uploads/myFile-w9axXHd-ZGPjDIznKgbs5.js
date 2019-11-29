import React from 'react';
import Field from './Field';
const isEmail = require('validator').isEmail;

class FieldForm extends React.Component {
    state = {
        fields: {
            name: '',
            email: '',
        },
        fieldsError: {},
        people:[],
    }

    onInputChange = ({name, value,error}) => {
        const fields = this.state.fields;
        const fieldsError = this.state.fieldsError;

        fields[name] = value;
        fieldsError[name] = error;
        this.setState(fields, fieldsError);
    }

    validate() {
        const person = this.state.fields;
        const fieldsError = this.state.fieldsError;
        const errMessages = Object.keys(fieldsError).filter((k) => fieldsError[k])
        if (!person.name || !person.email || errMessages.length) return true;
        return false;
    }

    onFormSubmit = (evt) => {
        const people = this.state.people;
        const person = this.state.fields;
        evt.preventDefault();
        if (this.validate()) return;

        this.setState({
            people: people.concat(person),
            fields: {
                name: '',
                email: '',
            },
        })
    }

    render() {
        return (
            <div>
                <h1> Sign Up Sheet</h1>
                <span style={{ color: 'blue' }}> using Field Component</span>
                <form onSubmit={this.onFormSubmit}>
                    <Field
                        placeholder='Name'
                        name='name'
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                        validate={(val) => (val ? false : 'Name Required')}
                    />
                    <br />
                    
                    <Field
                        placeholder='Email'
                        name='email'
                        value={this.state.fields.email}
                        onChange={this.onInputChange}
                        validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
                    />

                    <br />
                    
                    <input type='submit' disabled={this.validate()} />
                </form>
                <div>
                    <h3>People</h3>
                    <ul>
                        {this.state.people.map(({ name, email }, i) => <li key={i}>{name}({email})</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}


export default FieldForm;