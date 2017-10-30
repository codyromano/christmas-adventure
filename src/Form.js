import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this.props.fields
    };
    this.updateFieldState = this.updateFieldState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
  }
  updateFieldState(name, value) {
    const newState = this.state.fields.map(field => {
      if (field.name === name) {
        field.value = value;
      }
      return field;
    });
    this.setState(newState);
  }
  handleSubmit(event) {
    event.preventDefault();
    const model= this.state.fields.reduce((map, field) => {
      map[field.name] = field.value || field.defaultValue;
      return map;
    }, {});
    this.props.onSubmit(model);
  }
  renderField(field, key) {
    const updateFieldState = event => this.updateFieldState(
      field.name,
      event.target.value
    );
    return (
      <fieldset key={key}>
        <label>{field.label}</label>
        <input
          type={field.type || 'text'}
          onChange={updateFieldState}
          defaultValue={field.defaultValue || ''}
        />
      </fieldset>
    );
  }
  render() {
    return (<form
      className="form card"
      onSubmit={this.handleSubmit}>
      {this.props.heading && <h1>{this.props.heading}</h1>}
      {this.state.fields.map(this.renderField)}

      <fieldset>
        <button>{this.props.submitText}</button>
      </fieldset>
    </form>);
  }
}

Form.defaultProps = {
  submitText: 'Submit'
};

Form.propTypes = {
  fields: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  heading: PropTypes.string
}
