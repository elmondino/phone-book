import React, { Component } from 'react';
import axios from 'axios';
import './Calendar.css'

class Calendar extends Component {
    state = {
        contacts: [],
        search: '',
        sortType: 'asc'
    }
    updateSearch = event => {
        this.setState({
            search: event.target.value
        })
    }
    handleChange = (event) => {
        this.setState({ sortType: event.target.value })
    }
    componentDidMount() {
        axios.get('http://www.mocky.io/v2/581335f71000004204abaf83')
            .then(response => {
                response.data.contacts.forEach((contact, index) => {
                    contact.id = index + 1;
                });
                this.setState({
                    contacts: response.data.contacts
                })
            })
    }
    render() {
        const { contacts, sortType } = this.state;
        const filteredContacts = contacts.filter((contact) => {
            return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });
        const sortedContacts = filteredContacts.sort((a, b) => {
            const isReversed = (sortType === 'asc') ? 1 : -1;
            return isReversed * a.name.localeCompare(b.name)
        })
        const contactsList = sortedContacts.length ? (
            sortedContacts.map(contact => {
                return (
                    <div key={contact.id} className="contact">
                        <div>{contact.name}</div>
                        <div>{contact.phone_number}</div>
                        <div>{contact.address}</div>
                        <hr/>
                    </div>
                )
            })
        ) : (
                <div className="center"> No Contacts Found </div>
            )
        return (
            <div className="container">
                <div className="header">
                    <h1>Phone Book</h1>
                    <div className="filter">
                        <label htmlFor="filter">Filter by name: </label>
                        <input type="text" id="filter" value={this.state.search} onChange={this.updateSearch} />
                    </div>
                    <div className="sort"> 
                        <label htmlFor="orderBy">Sort by name: </label>
                        <select value={this.state.value} id="orderBy" onChange={this.handleChange}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div> 
                </div>
                <div className="contact-list">
                    {contactsList}
                </div>
            </div>
        );
    }
}

export default Calendar;