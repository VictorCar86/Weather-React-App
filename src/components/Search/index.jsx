import React, { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { GEO_URL, OPT_GEO_API } from "../../infoApi";
import "./Search.css"
const axios = require("axios");

const Search = ({ onSearchChange }) => {
    const [state, setState] = useState(null)

    const loadOptions = (inputValue) => {

        const options = {
            namePrefix: inputValue,
            minPopulation: 1000000
        }

        return axios.request(OPT_GEO_API(GEO_URL, options))
            .then(function (response) {
                console.log(response.data)
                return {
                    options: response.data.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name} ${city.countryCode}`,
                        }
                    })
                };
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const handleOnChange = (searchData) => {
        setState(searchData)
        onSearchChange(searchData)
    }

  return (
    <AsyncPaginate
        placeholder="Search for your location"
        debounceTimeout={600}
        value={state}
        onChange={handleOnChange}
        loadOptions={loadOptions}
    />
  )
}

export default Search