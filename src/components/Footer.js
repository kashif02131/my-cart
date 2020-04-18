import React, { useState } from "react";
import { connect } from "react-redux";

//This is footer componenet which will be rendered at the bottom showing
// total item price and ability to add a coupon code.
////

function Footer(props) {
  const [couponCode, setCoupon] = useState("");
  const [couponValue, setCouponValue] = useState(0);

  const a = Object.values(props);
  let p = 0;
  let coupon = 0;

  if (typeof a !== "undefined") {
    p = a[0]["price"];
  }

  const handleChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleClick = () => {
    if (couponCode.toUpperCase() === "AJ10") {
      coupon = 5.9;
      setCouponValue(coupon);
    }
    console.log(coupon);
  };

  return (
    <div className="container">
      <div className="row">
        <hr></hr>
        <div className="col-4">Need Help!??</div>
        <div className="col-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-secondary">
                  ENTER PROMOTIONAL CODE OR GIFT CARD
                </th>
                <th scope="col">
                  <input
                    type="text"
                    id="coupon"
                    name="coupon"
                    onChange={handleChange}
                  />
                  <button
                    onClick={handleClick}
                    type="button"
                    className="btn btn-light"
                  >
                    APPLY
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SUB TOTAL</td>
                <td>
                  <b>${p}</b>
                </td>
              </tr>
              <tr>
                <td>PROMOTIONAL CODE APPLIED</td>
                <td>
                  <b>${p > 1 ? couponValue : 0}</b>
                </td>
              </tr>
              <tr>
                <td>ESTIMATED SHIPPING</td>
                <td>FREE</td>
              </tr>
              {/* <tr>
                <td>ESTIMATED TOTAL</td>
                <td>
                  <b>$53.10</b>
                </td>
              </tr> */}
            </tbody>
            <thead>
              <tr>
                <th scope="col">ESTIMATED TOTAL</th>
                <th scope="col">
                  <b>${p > 1 ? p - couponValue : 0}</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <b>
                    <button type="button" className="btn btn-light">
                      CONTINUE SHOPPING
                    </button>
                    <button type="button" className="btn btn-primary">
                      CHECKOUT
                    </button>
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

//This will get the total price from Store
const mapStateToProps = (state) => {
  return {
    price: state,
  };
};

export default connect(mapStateToProps)(Footer);
