import { StyledBtn, StyledForm, StyledInput } from './ContactForm.styled';
import { useState } from 'react';

export const ContactForm = ({ handleSubmit: submitHandler }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name.trim() !== '' && number.trim() !== '') {
      submitHandler(name.trim(), number.trim());
      setName('');
      setNumber('');
    }
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        name="name"
        placeholder="Name"
        required
        value={name}
        onChange={handleInputChange}
      />
      <StyledInput
        type="tel"
        name="number"
        placeholder="Number"
        required
        value={number}
        onChange={handleInputChange}
      />
      <StyledBtn type="submit">Add Contacts</StyledBtn>
    </StyledForm>
  );
};

// export class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

// handleSubmit = event => {
//   event.preventDefault();
//   const { name, number } = this.state;
//   const { handleSubmit } = this.props;
//   if (name.trim() !== '' && number.trim() !== '') {
//     handleSubmit(name.trim(), number.trim());
//     this.setState({ name: '', number: '' });
//   }
// };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <StyledForm onSubmit={this.handleSubmit}>
//         <StyledInput
//           type="text"
//           name="name"
//           placeholder="Name"
//           required
//           value={name}
//           onChange={this.handleInputChange}
//         />
//         <StyledInput
//           type="tel"
//           name="number"
//           placeholder="Number"
//           required
//           value={number}
//           onChange={this.handleInputChange}
//         />
//         <StyledBtn type="submit">Add Contacts</StyledBtn>
//       </StyledForm>
//     );
//   }
// }
