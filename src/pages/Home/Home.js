import React, { useState, useEffect } from "react";

import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
// import Input from "../../components/UI/Input/Input";
import classes from "./Home.module.css";
import Product from "../../components/Product/product";
import debounce from "lodash.debounce";

const Home = (props) => {
  const defaultItem = {
    id: null,
    name: "",
    brand: "",
    description: "",
    color: "",
    file: [],
  };

  let productsItems = [
    {
      id: "p1",
      name: "Red Scarf",
      brand: "Channel",
      description: "A pretty red scarf.",
      file: [],
      color: "white",
    },
    {
      id: "p2",
      name: "Blue T-Shirt",
      brand: "Channel",
      description: "A pretty blue t-shirt.",
      color: "black",
      file: [],
    },
    {
      id: "p3",
      name: "Green Trousers",
      brand: "Channel",
      description: "A pair of lightly green trousers.",
      color: "white",
      file: [],
    },
    {
      id: "p4",
      name: "Orange Hat",
      brand: "Channel",
      description: "Street style! An orange hat.",
      color: "black",
      file: [],
    },
  ];

  const filterItems = [
    {
      name: "Name",
      val: "name",
    },
    {
      name: "Brand",
      val: "brand",
    },
    {
      name: "Description",
      val: "description",
    },
    {
      name: "Color",
      val: "color",
    },
  ];

  const [productsList, setProductsList] = useState(productsItems);
  const [updatedState, setUpdatedState] = useState(productsItems);
  const [viewDetails, setViewDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultItem);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("name");

  useEffect(() => {
    const results = updatedState.filter((item) =>
      item[filter].toLowerCase().includes(searchTerm)
    );

    setLoading(false);

    setProductsList(results);
  }, [searchTerm, filter, updatedState]);

  const searchParams = (event) => {
    setLoading(true);

    const handleChangeDebounce = debounce((e) => {
      let value = e.target.value;
      // do something
      setSearchTerm(value);
    }, 1000);
    handleChangeDebounce(event);
  };

  const updateProduct = (item) => {
    const data = {
      ...item,
      edit: true,
    };
    setSelectedItem(data);
    setViewDetails(true);
  };
  const createProduct = () => {
    setSelectedItem(defaultItem);
    setViewDetails(true);
  };
  const viewDetailsClosed = () => {
    setViewDetails(false);
  };

  let detailsPage = null;

  const submitted = (data) => {
    const isUpdate = productsList.some((p) => p.id === data.id);

    const updatedItems = productsList.map((item) =>
      item.id === data.id ? data : item
    );
    if (isUpdate) {
      setProductsList([...updatedItems]);
      setUpdatedState([...updatedItems]);
    } else {
      setProductsList([...productsList, data]);
      setUpdatedState([...productsList, data]);
    }

    setViewDetails(false);
  };
  const logout = () => {
    props.history.push("/");
  };

  detailsPage = <Product item={selectedItem} clicked={submitted} />;

  return (
    <>
      <div className={classes.logout}>
        <Button onClick={logout}>Logout</Button>
      </div>

      <Card className={classes.home}>
        <div className={classes.params}>
          <div>
            <label>Search: </label>
            <input
              name="Search"
              id="Search"
              label="Search"
              className={classes.searchInput}
              onChange={(e) => searchParams(e)}
            />
          </div>
          <div>
            <label>Filter: </label>
            <select
              name="filter"
              id="filter"
              label="filter"
              className={classes.selectFilter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {filterItems.map((item) => (
                <option key={item.val} value={item.val}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Button onClick={createProduct} className={classes.create_Buton}>
              Add
            </Button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className={classes.no_Found}>
                  <Spinner />
                </td>
              </tr>
            ) : (
              <>
                {productsList.length === 0 ? (
                  <tr>
                    <td className={classes.no_Found}>
                      <span>No Data Found</span>
                    </td>
                  </tr>
                ) : null}

                {productsList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      {(item.file || [])
                        .filter((item, index) => index < 1)
                        .map((url, i) => (
                          <img key={i} src={url} width="100" alt="..." />
                        ))}
                    </td>
                    <td>{item.brand}</td>
                    <td>{item.description}</td>
                    <td>{item.color}</td>
                    <td className={classes.actions}>
                      <Button
                        className={classes.primary}
                        onClick={() => updateProduct(item)}
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </Card>
      <Modal
        show={viewDetails}
        title={selectedItem.edit}
        modalClosed={viewDetailsClosed}
      >
        {" "}
        {detailsPage}
      </Modal>
    </>
  );
};

export default Home;
