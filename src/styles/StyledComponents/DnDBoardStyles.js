import styled from 'styled-components';
import {colors} from '../../components/DragNDrop/Constants';

export const ParentContainer = styled.div`
    height: ${({height}) => height};
    overflow-x: hidden;
    overflow-y: auto;
`;

export const ScrollWrapper = styled.div`
display: box;
flex-wrap: nowrap;
overflow-x: auto;
`;

export const Container = styled.div`
 min-height: 50vh;
 min-width: 100vw;
 display: inline-flex;
 justify-content: left;
 background-color: ${colors.black};
`;