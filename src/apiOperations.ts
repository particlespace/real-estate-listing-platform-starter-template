import { IAddress } from './components/Sidebar/Sidebar';

const apiURL = 'https://api.particlespace.com/api/v1';

export function login(): Promise<string> {
  console.log('publishKey:', process.env.REACT_APP_PARTICLESPACE_PUBLISH_KEY)
  console.log('publishKey:', process.env.REACT_APP_PARTICLESPACE_SECRET_KEY)

  return new Promise((resolve, reject) => {
    // @ts-ignore
    const params = new URLSearchParams({
      'publish_key': process.env.REACT_APP_PARTICLESPACE_PUBLISH_KEY,
      'secret_key': process.env.REACT_APP_PARTICLESPACE_SECRET_KEY
    });
    fetch(`${apiURL}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    })
    .then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          resolve(data.data.token);
        });
      }
    });
  });
}

/**
 * Makes a post to
 * https://api.particlespace.com/api/v1/property/search
 * with body:
 * { address, city, state, zip }
 */
export function searchProperty(address: IAddress): Promise<any> {
  return new Promise((resolve) => login().then((token) => {
    const {
      address: streetAddress,
      city,
      state,
      zipcode
    } = address;

    const params =  new URLSearchParams({
      address: streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
    })
    const url = new URL(`${apiURL}/property/search`)
    url.search = params.toString();
    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          resolve(data.data);
        });
      }
    });
  }));
}
