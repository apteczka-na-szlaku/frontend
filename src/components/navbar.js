import React from 'react'
import styled from 'styled-components'
import { strings } from '../lang/strings.js'
import Form from 'react-bootstrap/Form'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 55px;
  z-index: 999;
  width: 100%;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  background: #fff;
  padding: 5px;
  text-align: right;

  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const SearchBox = styled.div`
  max-width: 200px;
  position: absolute;
  top: 8px;
  left: 8px;
`

const NavBar = (props) => {
  const onSearch = (e) => {
    e.preventDefault()
    props.onSearch(e.target.elements.search.value)
    e.target.elements.search.value = ''
  }

  return (
    <Nav>
      <SearchBox>
        <Form onSubmit={onSearch}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control type='text' placeholder='Szukaj' name='search' />
          </Form.Group>
        </Form>
      </SearchBox>
      {props.user
        ? <div style={{ padding: '10px 5px' }}>
          {strings.auth.welcome}, {props.user.name && props.user.name}!
          <button onClick={() => props.logout()} className='link'>{strings.auth.logout}</button>
        </div>

        : <div style={{ padding: '10px 5px' }}>
          <button
            onClick={() => props.loginWithRedirect({})} className='link'
          >Zaloguj</button>
        </div>
      }
    </Nav>
  )
}

export default NavBar
