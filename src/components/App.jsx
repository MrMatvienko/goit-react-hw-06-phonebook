import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { useState, useEffect } from 'react';
import {
  Container,
  SearchInput,
  TitleH1,
  TitleH2,
  TitleH3,
} from './Gobal.styled';
export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localData = localStorage.getItem('contacts');
    return localData ? JSON.parse(localData) : [];
  });
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   const localData = localStorage.getItem('contacts');
  //   if (localData) {
  //     setContacts(JSON.parse(localData));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const foundContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (foundContact) {
      alert(`"${name}" is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value.toLowerCase());
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleSubmit = (name, number) => {
    addContact(name, number);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <Container>
      <TitleH1>PhoneBook</TitleH1>
      <ContactForm handleSubmit={handleSubmit} />
      <TitleH2>Contacts</TitleH2>
      <TitleH3>Find contacts by name</TitleH3>
      <SearchInput
        type="text"
        name="filter"
        placeholder="Search"
        value={filter}
        onChange={handleFilterChange}
      />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [
// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const localData = localStorage.getItem('contacts');
//     if (localData) {
//       this.setState({ contacts: JSON.parse(localData) });
//     }
//   }
//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = (name, number) => {
//     const { contacts } = this.state;

//     for (let i = 0; i < contacts.length; i++) {
//       if (contacts[i].name.toLowerCase() === name.toLowerCase()) {
//         alert(`"${name}"is already in contacts`);
//         return;
//       }
//     }

//     const newContact = {
//       id: nanoid(),
//       name: name,
//       number: number,
//     };
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   };
//   handleFilterChange = event => {
//     this.setState({ filter: event.target.value.toLowerCase() });
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   handleSubmit = (name, number) => {
//     this.addContact(name, number);
//   };

//   render() {
//     const { contacts, filter } = this.state;

//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//     return (
//       <Container>
//         <TitleH1>PhoneBook</TitleH1>
//         <ContactForm handleSubmit={this.handleSubmit} />
//         <TitleH2>Contacts</TitleH2>
//         <TitleH3>Find contacts by name</TitleH3>
//         <SearchInput
//           type="text"
//           name="filter"
//           placeholder="Search"
//           value={filter}
//           onChange={this.handleFilterChange}
//         />
//         <ContactList
//           contacts={filteredContacts}
//           deleteContact={this.deleteContact}
//         />
//       </Container>
//     );
//   }
// }
