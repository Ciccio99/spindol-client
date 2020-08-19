import React from 'react';
import { Helmet } from 'react-helmet-async';

const HeadwayWidget = () => (
  <>
    <span className="headway-widget" id="headway-widget" />
    <Helmet>
      <script async src="https://cdn.headwayapp.co/widget.js" />
    </Helmet>
  </>
);

export default HeadwayWidget;
