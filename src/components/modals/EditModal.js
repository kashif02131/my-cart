import React, { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "../../App.css";
import { connect } from "react-redux";

function EditModal(props) {
  let p = props.props[0];

  let editedItem = [];

  const [Qty, setQty] = useState(p.p_quantity);
  const [selectedColorText, setSelectedColorText] = useState(
    p.p_selected_color.name
  );
  const [defaultSize, setDefaultSize] = useState(p.p_selected_size.name);

  const updateQty = (e) => {
    let upd = e.target.value;
    setQty(upd);
  };

  const edit = () => {
    editedItem = [];
    editedItem.push(
      selectedColorText.toUpperCase(),
      defaultSize.toUpperCase(),
      Qty
    );
    props.edit(editedItem);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Table className="AlignTable">
              <tbody>
                <tr>
                  <h5>{p.p_name.toUpperCase()}</h5>
                </tr>
                <tr>
                  <h4>${p.p_price}</h4>
                </tr>
                <tr>{p.p_style.toUpperCase()}</tr>
                <tr>
                  <Button
                    className="SelectionButton"
                    style={{
                      backgroundColor: `${p.p_available_options.colors[0].name}`,
                    }}
                    onClick={() => {
                      setSelectedColorText(
                        p.p_available_options.colors[0].name
                      );
                    }}
                  ></Button>
                  {""}
                  <Button
                    className="SelectionButton"
                    style={{
                      backgroundColor: `${p.p_available_options.colors[1].name}`,
                    }}
                    onClick={() => {
                      setSelectedColorText(
                        p.p_available_options.colors[1].name
                      );
                    }}
                  ></Button>
                  {""}
                  <Button
                    className="SelectionButton"
                    style={{
                      backgroundColor: `${p.p_available_options.colors[2].name}`,
                    }}
                    onClick={() => {
                      setSelectedColorText(
                        p.p_available_options.colors[2].name
                      );
                    }}
                  ></Button>
                  <h5>{selectedColorText.toUpperCase()}</h5>
                </tr>
                <tr>
                  <div>
                    <select
                      className="DropDown"
                      value={defaultSize.toUpperCase()}
                      onChange={(e) => {
                        setDefaultSize(e.target.value);
                      }}
                    >
                      <option value="SMALL">
                        {p.p_available_options.sizes[0].name.toUpperCase()}
                      </option>
                      <option value="MEDIUM">
                        {p.p_available_options.sizes[1].name.toUpperCase()}
                      </option>
                      <option value="LARGE">
                        {p.p_available_options.sizes[2].name.toUpperCase()}
                      </option>
                      <option value="EXTRA LARGE">
                        {p.p_available_options.sizes[3].name.toUpperCase()}
                      </option>
                    </select>

                    <input
                      className="InputWidth"
                      type="number"
                      name="Qty"
                      onChange={(e) => {
                        updateQty(e);
                      }}
                      value={Qty}
                    />
                  </div>
                </tr>
                <tr>
                  <Button
                    className="ButtonWidth"
                    variant="primary"
                    onClick={() => {
                      edit();
                    }}
                  >
                    EDIT
                  </Button>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <img
              src={props.props[0].p_image}
              alt={props.props[0].p_name}
              className="ModalImageStyle"
            ></img>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

//to update Store
const mapDispatchToProps = (dispatch) => {
  return {
    edit: (editedItem) => {
      dispatch({ type: "EDIT", payload: editedItem });
    },
  };
};

export default connect(null, mapDispatchToProps)(EditModal);
