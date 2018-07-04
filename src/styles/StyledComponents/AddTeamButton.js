import styled from 'styled-components';
import { colors } from '../../components/DragNDrop/Constants';

const AddTeamButton = styled.button`
display: block
position: relative
border-radius: 50%
background-color: ${colors.blue.columnBodyBlue};
color: ${colors.white};
padding: 0
z-index: 0;
margin-top: auto;
margin-right: 1em;
margin-left: 1em;
margin-bottom: auto;
-webkit-box-shadow: 0 6px 10px 0 rgba(0,0,0,0.3)
box-shadow: 0 6px 10px 0 rgba(0,0,0,0.3)
border-radius: 50%
height: 60px
width: 60px
background-color: $circle
transition: 0.2s
text-align: center
&:focus {
  outline-style: none
}
&:hover {
  cursor: pointer
  background-color: ${colors.blue.deep};
  box-shadow: 0 8px 15px 0 rgba(0,0,0,0.3)
}
`;

export default AddTeamButton;
