import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext({});

const Context = (props) => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [train, setTrain] = useState({});

  useEffect(() => {
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
        setCustomers(data.content);
        setLoading(true);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
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

        setLoading(true);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!loading) {
    return <h1> Loading...</h1>;
  } else
    return (
      <MyContext.Provider
        value={{
          valueOne: [customers, setCustomers],
          valueTwo: [train, setTrain],
        }}
      >
        {props.children}
      </MyContext.Provider>
    );
};

export default Context;
