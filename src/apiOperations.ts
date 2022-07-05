import env from 'react-dotenv';

const apiURL = 'https://api.particlespace.com/api/v1';

export function login(): Promise<string> {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      'publish_key': env.PS_PUBLISH_KEY,
      'secret_key': env.PS_SECRET_KEY,
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
export function searchProperty(address: any): Promise<any> {
  return new Promise((resolve) => login().then((token) => {
    const params =  new URLSearchParams({
      address: address.streetAddress,
      city: address.city,
      state: address.state,
      zipcode: address.zip,
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
