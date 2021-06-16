'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   //add filed validate for each item in data object
   data.map(item=> {
    item.Created_At = new Date()
    item.Updated_At = new Date()
  })
  //insert data into sqlite
  await queryInterface.bulkInsert('Employees', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};

const data = [
  {
    "first_name" : "Justinn",
    "last_name" : "Haddy",
    "address" : "1611 Earnhardt Drive Louisville, KY 40202",
    "email": "jhaddy0@liveinternet.ru",
    "phone" : "502-663-9782",
    "image" : "",
    "salary" : 10000
  },
  {
    "first_name" : "Alexander",
    "last_name" : "L. Ginsberg",
    "address" : "2246 Roosevelt Wilson Lane Irvine, CA 92614",
    "email": "AlexanderLGinsberg@armyspy.com",
    "phone" : "909-809-8106",
    "image" : "",
    "salary" : 20000
  },
  {
    "first_name" : "Greg",
    "last_name" : "T. Dixon",
    "address" : "3335 Delaware Avenue San Francisco, CA 94115",
    "email": "GregTDixon@rhyta.com",
    "phone" : "415-353-9114",
    "image" : "",
    "salary" : 30000
  },
  {
    "first_name" : "Samuel",
    "last_name" : "H. Vu",
    "address" : "4228 Church Street Huntington, NY 11743",
    "email": "SamuelHVu@armyspy.com",
    "phone" : "718-483-9084",
    "image" : "",
    "salary" : 40000
  },
  {
    "first_name" : "Shaun",
    "last_name" : "A. Worthen",
    "address" : "1443 Gateway Road Hillsboro, OR 97123",
    "email": "ShaunAWorthen@dayrep.com",
    "phone" : "503-264-9235",
    "image" : "",
    "salary" : 50000
  },
  {
    "first_name" : "James",
    "last_name" : "S. Dudley",
    "address" : "1505 Angus Road New York, NY 10007",
    "email": "JamesSDudley@jourrapide.com",
    "phone" : "212-442-9123",
    "image" : "",
    "salary" : 60000
  },
  {
    "first_name" : "Allan",
    "last_name" : "J. Rivas",
    "address" : "2883 Wetzel Lane Grand Rapids, MI 49503",
    "email": "AllanJRivas@jourrapide.com",
    "phone" : "231-224-6152",
    "image" : "",
    "salary" : 70000
  },
  {
    "first_name" : "Robert",
    "last_name" : "E. Luna",
    "address" : "3188 Rockford Road Reno, NV 89501",
    "email": "RobertELuna@jourrapide.com",
    "phone" : "775-244-7319",
    "image" : "",
    "salary" : 80000
  },
  {
    "first_name" : "John",
    "last_name" : "M. Bookout",
    "address" : "2041 Lowndes Hill Park Road Los Angeles, CA 90017",
    "email": "JohnMBookout@armyspy.com",
    "phone" : "661-456-5341",
    "image" : "",
    "salary" : 90000
  },
  {
    "first_name" : "Michael",
    "last_name" : "C. Lewis",
    "address" : "223 Post Avenue Chicago, IN 60631",
    "email": "MichaelCLewis@jourrapide.com",
    "phone" : "219-308-3134",
    "image" : "",
    "salary" : 100000
  }
]