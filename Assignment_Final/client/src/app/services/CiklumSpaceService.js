import fetch from 'isomorphic-fetch';

import { CS_SERVICE_URL } from '../appconfig';

class CiklumSpaceService {
  static login(username, password) {
    const url = CS_SERVICE_URL.concat('/authenticate');
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(`Unexpected error: '${response.statusText}'`);
    });
  }
  static getFloor(floorPlanId) {
    const url = CS_SERVICE_URL.concat(`/floorplan/${floorPlanId}`);
    return fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 404) {
          throw new Error(`No floor found. Search parameter floorPlanID=${floorPlanId}.`);
        } else {
          throw new Error(`Unexpected error: '${response.statusText}'`);
        }
      });
  }
  static getEmployee(employeeId) {
    const url = CS_SERVICE_URL.concat(`/employee/detail/${employeeId}`);
    return fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 404) {
          throw new Error(`No employee found by id = ${employeeId}.`);
        } else {
          throw new Error(`Unexpected error: '${response.statusText}'`);
        }
      });
  }
  static findEmployee(query, withEmail = false) {
    const url = withEmail
      ? CS_SERVICE_URL.concat(`/employee/find/${query}`)
      : CS_SERVICE_URL.concat(`/employee/findbyname/${query}`);
    return fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(`Unexpected error: '${response.statusText}'`);
      })
      .then(employees => ({ options: employees }));
  }
  static addSeat(floorPlanId, seat, token) {
    const url = CS_SERVICE_URL.concat(`/seat/floorplan/${floorPlanId}`);
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seat),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(`Unexpected error: '${response.statusText}'`);
    });
  }
  static updateSeat(floorPlanId, seat, token) {
    const url = CS_SERVICE_URL.concat(`/seat/floorplan/${floorPlanId}`);
    return fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seat),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(`Unexpected error: '${response.statusText}'`);
    });
  }
  static deleteSeat(floorPlanId, seat, token) {
    const url = CS_SERVICE_URL.concat(`/seat/floorplan/${floorPlanId}`);
    return fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seat),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(`Unexpected error: '${response.statusText}'`);
    });
  }
}

export default CiklumSpaceService;
