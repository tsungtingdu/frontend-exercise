import { useState, useEffect, useCallback } from 'react';

const fetchCurrentWeather = ({ authorizationKey, locationName }) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&locationName=${locationName}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['WDSD', 'TEMP'].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
          }
          return neededElements;
        }, {});

      return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
      };
    });
};

const fetchWeatherForecast = ({ authorizationKey, cityName }) => {
  return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );
      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      };
    });
};

const useWeatherAPI = ({ locationName, cityName, authorizationKey }) => {
  // STEP 2：useState 中用來定義 weatherElement 的部分
  const [weatherElement, setWeatherElement] = useState({/* ... */ })

  // STEP 3：透過 useCallback 用來定義 fetchData() 的部分
  const fetchData = useCallback(async () => {
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const [currentWeather, weatherForecast] = await Promise.all([
      // 把 authorizationKey, locationName, cityName 傳到拉取 API 的方法中
      fetchCurrentWeather({ authorizationKey, locationName }),
      fetchWeatherForecast({ authorizationKey, cityName }),
    ])

    setWeatherElement({
      ...currentWeather,
      ...weatherForecast,
      isLoading: false,
    })
  }, [authorizationKey, cityName, locationName])

  // STEP 4：透過 useEffect 用來呼叫 fetchData 的部分
  useEffect(() => { fetchData() }, [fetchData])

  // STEP 5：回傳要讓其他元件使用的資料或方法
  return [weatherElement, fetchData]
}

export default useWeatherAPI 