import fetch from 'isomorphic-fetch';

const CS_SERVICE_URL = 'http://192.168.0.2:8080/api/';

class CiklumSpaceService {
  static getFloor(floorPlanId) {
    const url = CS_SERVICE_URL.concat(`floorplan/${floorPlanId}`);
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
    const url = CS_SERVICE_URL.concat(`employee/detail/${employeeId}`);
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
      ? CS_SERVICE_URL.concat(`employee/find/${query}`)
      : CS_SERVICE_URL.concat(`employee/findbyname/${query}`);
    return fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(`Unexpected error: '${response.statusText}'`);
      })
      .then(employees => ({ options: employees }));
  }
  static addSeat(floorPlanId, seat) {
    const url = CS_SERVICE_URL.concat(`seat/floorplan/${floorPlanId}`);
    return fetch(url, {
      method: 'POST',
      headers: {
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
  static updateSeat(floorPlanId, seat) {
    const url = CS_SERVICE_URL.concat(`seat/floorplan/${floorPlanId}`);
    return fetch(url, {
      method: 'PUT',
      headers: {
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
  static deleteSeat(floorPlanId, seat) {
    const url = CS_SERVICE_URL.concat(`seat/floorplan/${floorPlanId}`);
    return fetch(url, {
      method: 'DELETE',
      headers: {
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
