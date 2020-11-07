import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext({});

const Context = (props) => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [train, setTrain] = useState({});
  const [trainloading, settrainLoading] = useState(false);

  useEffect(() => {
    reFetch();
  }, []);

  const reFetch = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      credentials: "same-origin",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok)
          return Promise.reject(new Error(`HTTP Error ${res.status}`));

        return res.json();
      })
      .then((data) => {
        setTrain(data.content);
        settrainLoading(true);
      })
      .catch((err) => console.error(err));
    fetch("https://customerrest.herokuapp.com/api/customers", {
      credentials: "same-origin",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok)
          return Promise.reject(new Error(`HTTP Error ${res.status}`));

        return res.json();
      })
      .then((data) => {
        setLoading(true);
        setCustomers(data.content);
      })
      .catch((err) => console.error(err));
  };

  if (!loading || !trainloading) {
    return <h1> Loading...</h1>;
  } else
    return (
      <MyContext.Provider
        value={{
          valueOne: [customers, setCustomers],
          valueTwo: [train, setTrain],
          valueThree: function fetch() {
            reFetch();
          },
        }}
      >
        {props.children}
      </MyContext.Provider>
    );
};

export default Context;
