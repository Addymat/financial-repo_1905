





// Dashb.js
import React, { useEffect, useRef, useState } from 'react';
import { useUser } from './UserContext';  // Import useUser
import { KEY, arr } from './Constants';
import useWindowSize from './useWindowSize';

const Dashb = () => {
  const { nameRef } = useUser();  // Access nameRef from context
  const [error, setError] = useState(null);
  const [sentimentLabel, setSentimentLabel] = useState('');
  const [summary, setSummary] = useState('');
  const [sectors, setSectors] = useState([]);
  const [prices, setPrices] = useState([]);
  const container = useRef();
  const array = [];


  const {width,height}=useWindowSize();

  const fetchSummary = async () => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=technology,ipo,Blockchain&tickers=AAPL&apikey=${KEY}`);
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.status}`);
      }
      const data = await response.json();
      if (data.feed && data.feed.length > 0) {
        setSentimentLabel(data.feed[0].overall_sentiment_label);
        setSummary(data.feed[0].summary);
      } else {
        setSentimentLabel('No sentiment label available');
        setSummary('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchSectors = async () => {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/sectors-performance?apikey=HZ32bjrRmKclcdAuoJFsbZ44jzO9Nztu`);
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.status}`);
      }
      const data = await response.json();
      setSectors(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPrices = async () => {
    
    for (let i = 0; i < arr.length; i++) {
      try {
        const response = await fetch(arr[i]);
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.status}`);
        }
        const data = await response.json();
        array[i] = data;
      } catch (error) {
        setError(error.message);
      }
    }
    setPrices(array);
  };

  useEffect(() => {
    fetchSummary();
    fetchSectors();
    fetchPrices();
  }, []);

  useEffect(
    () => {
      if (container.current && !container.current.querySelector('script'))  {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
          {
            "symbols": [
              [
                "NASDAQ:NDX|1D"
              ]
            ],
            "chartOnly": false,
            "width": "100%",
            "height": "100%",
            "locale": "en",
            "colorTheme": "dark",
            "autosize": true,
            "showVolume": false,
            "showMA": false,
            "hideDateRanges": false,
            "hideMarketStatus": true,
            "hideSymbolLogo": true,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "10",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "no-values",
            "chartType": "line",
            "maLineColor": "#2962FF",
            "maLineWidth": 1,
            "maLength": 9,
            "gridLineColor": "rgba(0, 0, 0, 1)",
            "backgroundColor": "rgba(0, 0, 0, 1)",
            "lineWidth": 3,
            "lineType": 0,
            "dateRanges": [
              "1d|1",
              "1m|30",
              "3m|60",
              "12m|1D",
              "60m|1W",
              "all|1M"
            ]
          }`;
        container.current.appendChild(script);
      }},
      []
    );
if(width>768){
  return (
    
      <>
      
      <div className='dashb p-3'>
      <h3 className='text-white '>Welcome, {nameRef.current ? nameRef.current.value : 'Guest'}</h3>
        
      
  <div className='row'>
    <div className='col-sm-12 col-md-6 bg-black summary rounded'>
      <p className='text-white sentiment m-2 mt-3 p-1'>Market is {sentimentLabel}</p>
      <div className='text-white mt-5 mb-4 fs-5 summary fw-semibold'>{summary}</div>
    </div>
    <div className='col-sm-12 col-md-5  bg-black sector rounded' style={{ maxHeight: '250px', overflowY: 'auto' , scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
    <ul class="list-group list-group-flush text-white bg-black">
      {sectors.map((sect,i) =>(
 <li class="list-group-item bg-black text-white list-items d-flex justify-content-between">
 <span>{sect.sector}</span>
 <span class="ml-auto">{sect.changesPercentage}</span>
</li>    )
      )}
  
  
</ul>
    </div>
  </div>
  <div className='row'>
  <div className='col-sm-5 col-md-6 bg-black mt-2 price rounded ' style={{ maxHeight: '260px', overflowY: 'auto' , scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
    <ul class="list-group list-group-flush text-white bg-black">
      {array.map((price,i) =>(
 <li key={i} class="list-group-item bg-black text-white list-items d-flex justify-content-between">
 <span>{price.name}</span>
 <span class="ml-auto">{price.data[0].value}</span>
</li>    )
      )}
  
  
</ul>
    </div>
    <div className=" col-sm-12 col-md-5  mt-2 linechart border border-0" ref={container}>
      
      
      
    </div>
    
  </div>


</div>
</>

  );
}

else{
  return (
    
    <>
    
    <div className='dashb p-3'>
    <h3 className='text-white '>Welcome, {nameRef.current ? nameRef.current.value : 'Guest'}</h3>
      
    
<div className='row'>
  <div className='col-sm-12 col-md-6 bg-black summary rounded'>
    <p className='text-white sentiment m-2 mt-3 p-1'>Market is {sentimentLabel}</p>
    <div className='text-white mt-5 mb-4 fs-5 summary fw-semibold'>{summary}</div>
  </div>
  <div className='col-sm-12 col-md-6  bg-black sector rounded' style={{ maxHeight: '250px', overflowY: 'auto' , scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
  <ul class="list-group list-group-flush text-white bg-black">
    {sectors.map((sect,i) =>(
<li class="list-group-item bg-black text-white list-items d-flex justify-content-between">
<span>{sect.sector}</span>
<span class="ml-auto">{sect.changesPercentage}</span>
</li>    )
    )}


</ul>
  </div>
</div>
<div className='row'>
<div className='col-sm-5 col-md-6 bg-black mt-2 price rounded ' style={{ maxHeight: '260px', overflowY: 'auto' , scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
  <ul class="list-group list-group-flush text-white bg-black">
    {array.map((price,i) =>(
<li key={i} class="list-group-item bg-black text-white list-items d-flex justify-content-between">
<span>{price.name}</span>
<span class="ml-auto">{price.data[0].value}</span>
</li>    )
    )}


</ul>
  </div>
  <div className=" col-sm-12 col-md-5  mt-2 linechart border border-0" ref={container}>
    
    
    
  </div>
  
</div>


</div>
</>

);

}


}


export default Dashb;
