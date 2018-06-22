import styled from 'styled-components';

const AddCheckoutButton = styled.button`
z-index: 2;
width: 6em;
height: 2.5em;
float: right;
transform: translate(-50%,-80%);
font-family: 'Varela Round', sans-serif;
font-size: 1.5em;
letter-spacing: 0.1em;
color: #e8e8e8;
border: none;
border-radius: 10px;
outline: none;
background: linear-gradient(45deg,#d350db,teal,#d350db);
background-size: 400% 400%;
box-shadow: 1vw 1vw 0 #A9A9A9;
cursor: pointer;
transition: all 0.3s ease;

&:hover {
  animation: gradient 10s ease infinite;
  font-size: 2em;
  box-shadow: 0.2vw 0.2vw 0 #A9A9A9;
}
}

&:disabled {
    color: white;
    background: grey;
}

@keyframes gradient {
50% {
  background-position: 100% 0;
}
`;

export default AddCheckoutButton;
