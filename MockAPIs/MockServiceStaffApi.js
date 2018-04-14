const serviceStaff = [
  {
    firstName: 'Grant',
    lastName: 'Awesomesauce',
    id: 1
  },
  {
    firstName: 'Alyson',
    lastName: 'Awesomesauce',
    id: 2

  },
  {
    firstName: 'Jesse',
    lastName: 'Mania',
    id: 3
  },
  {
    firstName: 'Lee',
    lastName: 'Puppy',
    id: 4
  },
  {
    firstName: 'James',
    lastName: 'Mustachio',
    id: 5
  },
  {
    firstName: 'Josh',
    lastName: 'Robinhoodson',
    id: 6
  }
];

const delay = 1000;

const generateId = (staffMember) => {
  return staffMember.firstName.toLowercase() + '-' + staffMember.lastName.toLowercase();
};

class ServiceStaffApi {

  static getAllStaff() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], serviceStaff));
      }, delay);
    });
  }




}

export default ServiceStaffApi;

