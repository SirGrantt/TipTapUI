import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  }),
  formattedCcAndAuto: PropTypes.number.isRequired,
};


export default EarningsDisplay;