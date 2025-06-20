import { Outlet, useLoaderData, Link,Form, redirect } from "react-router-dom"
import fetcher from "./config/fetcher";
import styled from "styled-components"

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return checkLogIn();
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action() {
  localStorage.removeItem('jwt');
  return redirect('/');
}

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  padding: 1rem 2rem ;
  height: 3rem;

  background-color:#222222;
`
const Logo = styled(Link)`
  text-decoration: none;

  color:#e5f0f9;
  font-size: 1.2rem;
  font-weight: bold;
`
const HeaderNavBar = styled.div`
  position: absolute;
  display: flex;

  right: 20px;

  gap: 1rem;
`

const HeaderNavLink = styled(Link)`
  all: unset;

  display:flex;
  align-items: center;
  position: relative;
  color:#e5f0f9;

  cursor: pointer;

  transition: transform 200ms, border-bottom 500ms;
  /* when its selected it stays scaled */
  transform: ${props => props.selected == true ? "scale(1.1);": ""};

  &::after{
    content: '';
    position: absolute;
    width: 100%;
    /* when its selected the underline stays */
    transform: ${props => props.selected == true ? "scaleX(1);": "scaleX(0)"};
    height: 2px;
    bottom: 2px;
    left: 0;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
    
  &:hover{
    transform: scale(1.1);
    
  }
  &:hover::after{
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`
const LogOut = styled.button`
  all: unset;

  display:flex;
  align-items: center;
  position: relative;
  color:#e5f0f9;

  cursor: pointer;

  transition: transform 200ms, border-bottom 500ms;
  /* when its selected it stays scaled */
  transform: ${props => props.selected == true ? "scale(1.1);": ""};

  &::after{
    content: '';
    position: absolute;
    width: 100%;
    /* when its selected the underline stays */
    transform: ${props => props.selected == true ? "scaleX(1);": "scaleX(0)"};
    height: 2px;
    bottom: 2px;
    left: 0;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
    
  &:hover{
    transform: scale(1.1);
    
  }
  &:hover::after{
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`
export default function App() {
  const admin = useLoaderData();

  return (
    <>
      <Header>
        <Logo to="/">Auth</Logo>
        <HeaderNavBar>
          {admin? <HeaderNavLink to="/home">Protected</HeaderNavLink>:null}
          {admin
            ? <Form method="post"><LogOut>LogOut</LogOut></Form>
            : <HeaderNavLink to="/register">Register</HeaderNavLink>
          }
        </HeaderNavBar>
      </Header>
      <Outlet/>
    </>
    
  )
}

async function checkLogIn() { //check if token is valid, if not logout
  const token = localStorage.getItem('jwt');
  if (!token) return false;

  const url = `${import.meta.env.VITE_SERVER_HOST}/users`
  const res = await fetcher(url);
  if (res.status == 200) {
    const user = await res.json()
    return user;
  }
  else {
    localStorage.removeItem('jwt');
    return false;
  };
}
