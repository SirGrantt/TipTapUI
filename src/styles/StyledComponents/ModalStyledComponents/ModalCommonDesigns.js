import styled from 'styled-components';
import { colors } from '../../../components/DragNDrop/Constants';

export const Footer = styled.div`
    padding: 1em;
    display: flex;
    border-radius: 0 0 2px 2px;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
    justify-content: flex-end;
  
    > :not(:last-child) {
      margin-right: .25rem;
    }
`;

export const Header = styled.h1`
border-bottom: solid black;
border-width: thin;

`;

export const CheckoutButtonWrapper = styled.div`
float: right;
margin-left: auto;
margin-right: auto;
margin-top: 1em;
`;

export const CheckoutButton = styled.button`
color: white;
width: 7em;
display:inline-block;
padding:0.35em 1.2em;
border:0.1em solid #FFFFFF;
margin:0 0.3em 0.3em 0;
box-sizing: border-box;
text-decoration:none;
font-family:'Roboto',sans-serif;
font-weight:300;
background-color: ${colors.blue.columnBodyBlue};
text-align:center;
transition: all 0.2s;

:hover{
    color: white;
    background-color: ${colors.blue.headerBlue};
    }

@media all and (max-width:1.5em){
    a.button1{
    display:block;
    margin:0.4em auto;
    }
`;