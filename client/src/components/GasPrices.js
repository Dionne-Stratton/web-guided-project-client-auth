import React from 'react';
import moment from 'moment';
import Loader from 'react-loader-spinner';
// import axios from 'axios'; not needed because it is being used in axiosWithAuth
import {axiosWithAuth} from './../utils/axiosWithAuth';


class GasPrices extends React.Component {
  state = {
    gasPrices: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get("/data")
        // because of baseURL in axiosWithAuth, we only need the last part of the api call here

        //this headers element is no longer needed because it is being done in the axiosWithAuth call
        // {headers: {
          // authorization: localStorage.getItem("token"), // sends the stored token to the server to be checked against it's records to get verified
      //   },
      // })

      .then((req) => {
        console.log(req);
        this.setState({
          gasPrices: req.data.data, // once token is verified, sets the data recieved from server into state replacing the empty placeholder array seen on line 8
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  formatData = () => {
    const formattedData = [];
    this.state.gasPrices.forEach((price, index, arr) => {
      if (price.location === 'US') {
        formattedData.push({
          id: index,
          date: moment(price.date).format('MMM'),
          USPrice: price.price,
          HawaiiPrice: arr[index + 1].price
        });
      }
    });
    return formattedData;
  };

  render() {
    const gasPrices = this.formatData();
    return (
      <div className="gas-prices">
        <div className="title-wrapper">
          <div className="title">
            <div className="inner-wrapper">
              <div className="top-title">Gas Comparison</div>
              <div className="bottom-title">Continental US vs Hawaii</div>
            </div>
          </div>
        </div>
        <div className="key">
          <div className="US-key" />
          <p className="US-key-text">Continental US Prices</p>
          <div className="Hawaii-key" />
          <p className="Hawaii-key-text">Hawaii Prices</p>
        </div>
        {this.props.fetchingData && (
          <div className="key spinner">
            <Loader type="Puff" color="#204963" height="60" width="60" />
            <p>Loading Data</p>
          </div>
        )}
        {gasPrices.length > 0 && (
          <div className="gas-wrapper">
            <div className="columns">
              <div className="months">
                <div className="year">2006</div>
                <div className="year">2007</div>
                <div className="year">2008</div>
                <div className="year">2009</div>
                <div className="year">2010</div>
                <div className="year">2011</div>
                <div className="year">2012</div>
              </div>
              <div>
                {gasPrices.map(price => ( // maps over the array set by the getData function see line 15
                  <div key={price.id} className="price-graph">
                    <div className="date">
                      <p>{price.date}</p>
                    </div>
                    <div className="hawaii-graph">
                      <div
                        className="hawaii-line"
                        style={{
                          width: `${(Number(price.HawaiiPrice) / 5) * 100}%`
                        }}
                      />
                      <p>${price.HawaiiPrice}</p>
                    </div>
                    <div className="us-graph">
                      <div
                        className="us-line"
                        style={{
                          width: `${(Number(price.USPrice) / 5) * 100}%`
                        }}
                      >
                        <p>${price.USPrice}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GasPrices;
