import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/*
const Column = styled.div`
float: left;
width: 50%
`;

const Row = styled.div`
overflow: hidden;
padding: 10px;
`; */

const Line = styled.h3`
margin-left: 2em;
`;

const JobLine = styled.p`
margin-left: 1em; 
color: grey;
`;


const EarningsDisplay = ({earning, formattedCcAndAuto}) => {
  return (
    <div>
      <JobLine>Job Worked: {earning.jobWorked.toUpperCase()}</JobLine>
      <br/>
      <Line>Credit Card Tips: ${earning.ccTips.toFixed(2)}</Line>
      <Line>+ Auto Gratuity: ${earning.autoGratuity.toFixed(2)}</Line>
      <Line style={{borderBottom: 'solid grey'}}>Total: ${formattedCcAndAuto.toFixed(2)}</Line>
      <Line>+ Cash Tips: ${earning.cashTips.toFixed(2)}</Line>
      <Line>Total Tips for Payroll: ${earning.totalTipsForPayroll.toFixed(2)}</Line>
    </div>
  )
}

EarningsDisplay.propTypes = {
  earning: PropTypes.shape({
    autoGratuity: PropTypes.number.isRequired,
    cashTips: PropTypes.number.isRequired,
    ccTips: PropTypes.number.isRequired,
    jobWorked: PropTypes.string.isRequired,
    totalTipsForPayroll: PropTypes.number.isRequired,
    formattedCcAndAuto: PropTypes.number.isRequired,
  }),
};

/*
<Column>
      <Row>
        <p>Job Worked:</p>
      </Row>
      <Row>
        <p>Credit Card Tips: </p>
      </Row>
      <Row>
      <p>+</p>
      </Row>
      <Row>
      <p>Auto Gratuity: </p>
      </Row>
      <Row>
      <p>=</p>
      </Row>
      <Row>
      <p>+</p>
      </Row>
      <Row>
      <p>Cash Tips: </p>
      </Row>
      <Row>
      <p>=</p>
      </Row>
      <Row>
      <p>Total for Payroll: </p>
      </Row>
      </Column>
      <Column>
      <Row>
        <p>{earning.jobWorked}</p>
      </Row>
      <Row>
        <p>${earning.ccTips}</p>
      </Row>
      <Row>
      <p>+</p>
      </Row>
      <Row>
      <p>{earning.autoGratuity}</p>
      </Row>
      <Row>
      <p>=</p>
      </Row>
      <Row>
      <p>{earning.ccTips + earning.autoGratuity}</p>
      </Row>
      <Row>
      <p>+</p>
      </Row>
      <Row>
      <p>{earning.cashTips}</p>
      </Row>
      <Row>
      <p>=</p>
      </Row>
      <Row>
      <p>{earning.totalTipsForPayroll}</p>
      </Row>
      </Column> */

export default EarningsDisplay;