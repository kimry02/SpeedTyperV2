import axios from 'axios';

const url = 'http://localhost:5000/users';

export const getUser = (username) => axios.post(url + "/", { username });

export const signInUser = (username, password) => axios.post(url + "/signin", { username, password, wpm: 0, raceCount: 0 });

export const signUpUser = (username, password) => axios.post(url + "/signup", { username, password, wpm: 0, raceCount: 0 });

export const updateUser = (username, wpm, raceCount) => axios.post(url + "/update", { username, wpm, raceCount });