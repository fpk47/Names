import axios, { AxiosResponse } from 'axios';

interface User {
    gender: string,
    name: {
      title: string,
      first: string,
      last: string,
    },
    location: {
      street: {
        number: number
        name: string,
      },
      city: string,
      state: string,
      country: string,
      postcode: number
      coordinates: {
        latitude: number
        longitude: number
      },
      timezone: {
        offset: number
        description: string,
      }
    },
    email: string,
    login: {
      uuid: string,
      username: string,
      password: string,
      salt: string,
      md5: string,
      sha1: string,
      sha256: string,
    },
    dob: {
      date: string,
      age: number
    },
    registered: {
      date: string,
      age: 8
    },
    phone: string,
    cell: string,
    id: {
      name: string,
      value: string,
    },
    picture: {
      large: string,
      medium: string,
      thumbnail: string,
    },
    nat: string,
}

interface Response {
    seed: string;
    results: User[];
}

async function getMultipleUsers(amount: number): Promise<Response> {
  try {
    const result = await axios.get<void, AxiosResponse<Response>>(`https://randomuser.me/api/?format=json&results=${amount.toFixed(0).toString()}`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getSeed(seed: string): Promise<Response> {
  try {
    const result = await axios.get<void, AxiosResponse<Response>>(`https://randomuser.me/api/?format=json&seed=${seed}`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export {
  Response, User, getMultipleUsers, getSeed,
};
