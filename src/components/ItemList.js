import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../App.css";
import data from "./data/data.json";
import Modal from "react-modal";
import EditModal from "./modals/EditModal";

//This is the main componenet which display all the items in cart.
// It will let user change color, size & quantity of the item selected.

//This is to style modal
const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
function ItemList(props) {
  const newArray = [...data];
  let sum = 0;

  const totPrice = newArray.map((a) => a.p_price * a.p_quantity);

  const totPriceSum = totPrice.reduce(function (a, b) {
    return a + b;
  }, 0);

  const [ppp, setPPP] = useState(totPriceSum);
  const [Items, setValue] = useState(data);
  const [Qty, setQty] = useState(newArray.p_quantity);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const calcPrice = (arr) => {
    const brr = arr.map((a) => a.p_price * a.p_quantity);

    sum = brr.reduce(function (a, b) {
      return a + b;
    }, 0);

    setPPP(sum);
    props.changePrice(sum);
  };

  const removeItem = (e) => {
    data.splice(e, 1);
    setValue([...data]);

    calcPrice(data);
  };

  const editItem = (i) => {
    setModalIsOpen(true);
    setSelectedItem(data[i]);
  };

  const saveItem = () => {
    console.log("Saved!");
  };

  useEffect(() => {
    calcPrice(Items);
  }, [Qty]);

  const updateQty = (e, i) => {
    setQty(e.target.value);
    data[i].p_quantity = e.target.value;
  };

  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{data.length} ITEMS</th>
              <th scope="col">Size</th>
              <th scope="col">QTY</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {Items.map((data, index) => (
              <tr key={data.p_id}>
                <td>
                  <div className="row">
                    <div className="col-3">
                      <img
                        src={data.p_image}
                        alt={data.p_name}
                        className="ImageStyle"
                      ></img>
                    </div>
                    <div className="col-9">
                      <div className="grid-container">
                        <div className="grid-item">
                          {data.p_name.toUpperCase()}
                        </div>
                        <div className="grid-item">
                          Style: {data.p_style.toUpperCase()}
                        </div>
                        <div className="grid-item">
                          Color:{" "}
                          {props.editedItem.length <= 0
                            ? data.p_selected_color.name.toUpperCase()
                            : props.editedItem[0]}
                        </div>
                        <div className="grid-item"></div>
                        <div className="grid-item"></div>
                        <div className="grid-item">
                          <p
                            className="Inline-p"
                            onClick={() => {
                              editItem(index);
                            }}
                          >
                            EDIT{" "}
                          </p>
                          |
                          <p
                            className="Inline-p"
                            onClick={() => {
                              removeItem(index);
                            }}
                          >
                            {" "}
                            X REMOVE{" "}
                          </p>
                          |
                          <p className="Inline-p" onClick={saveItem}>
                            {" "}
                            SAVE FOR LATER
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{data.p_selected_size.code.toUpperCase()}</td>
                <td>
                  <input
                    type="number"
                    name="Qty"
                    onChange={(e) => {
                      updateQty(e, index);
                    }}
                    value={data.p_quantity}
                  />
                </td>
                <td>${data.p_quantity * data.p_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <EditModal props={[selectedItem]} />
      </Modal>
    </>
  );
}

//to fetch data from store
const mapStateToProps = (state) => {
  return {
    price: state.price,
    editedItem: state.editedItem,
  };
};

//to update Store
const mapDispatchToProps = (dispatch) => {
  return {
    changePrice: (sum) => {
      dispatch({ type: "UPD_PRICE", payload: sum });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
