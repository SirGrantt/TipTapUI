import React from 'react';
import {HomePageBanner, HomePageBannerWrapper, HomePageTitle } from '../styles/StyledComponents/HomePageBanner';
//import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <HomePageBannerWrapper>
      <HomePageBanner src="http://i1243.photobucket.com/albums/gg542/sirgrantt/TipCoffeeCup_zpsktpwrdhf.jpg" />
      <HomePageBanner src="http://i1243.photobucket.com/albums/gg542/sirgrantt/fingerrtap_zpsl0etcrv3.jpg" />
      <HomePageBanner src="http://i1243.photobucket.com/albums/gg542/sirgrantt/checkandphone_zpsqq371daz.jpg?t=1530064194" />
      </HomePageBannerWrapper>
        <HomePageTitle>TipTap for Virago</HomePageTitle>
        <br />
        <h2 style={{textAlign: 'center'}}>Service tips management with the tap of a finger.</h2>
    </div>
  );
};

export default HomePage;
