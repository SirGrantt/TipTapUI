import styled from 'styled-components';

export const RunCheckoutButton = styled.button`
background: #3463d9;
background-image: -webkit-linear-gradient(top, #3463d9, #2b5ab8);
background-image: -moz-linear-gradient(top, #3463d9, #2b5ab8);
background-image: -ms-linear-gradient(top, #3463d9, #2b5ab8);
background-image: -o-linear-gradient(top, #3463d9, #2b5ab8);
background-image: linear-gradient(to bottom, #3463d9, #2b5ab8);
-webkit-border-radius: 0;
-moz-border-radius: 0;
border-radius: 0px;
font-family: Arial;
color: #ffffff;
font-size: 20px;
padding: 11px 20px 10px 20px;
text-decoration: none;
border-bottom-right-radius: 20px;
border-bottom-left-radius: 20px;

&:hover {
  background: #3cb0fd;
  background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  text-decoration: none;
}
`;