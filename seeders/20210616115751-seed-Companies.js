'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
       //add filed validate for each item in data object
       data.map(item=> {
        item.created_at = new Date()
        item.updated_at = new Date()
      })
      //insert data into sqlite
      await queryInterface.bulkInsert('Companies', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Companies', null, {});
  }
};

const data = [
  {
    "formal_name" : "Openlane",
    "total_employees" : 2000,
    "address" : "3905 Farland Street Cambridge, MA 02142",
    "email" : "info@openlane.com",
    "image" : "",
    "phone" : "774-206-4935"
  },
  {
    "formal_name" : "Yearin",
    "total_employees" : 1982,
    "address" : "2985 Irving Place New York, NY 10011",
    "email" : "info@yearin.com",
    "image" : "",
    "phone" : "631-995-8301"
  },
  {
    "formal_name" : "Goodsilron",
    "total_employees" : 1958,
    "address" : "4690 Metz Lane Woburn, MA 01801",
    "email" : "info@goodsilron.com",
    "image" : "",
    "phone" : "857-257-3562"
  },
  {
    "formal_name" : "Condax",
    "total_employees" : 1991,
    "address" : "1042 Libby Street Los Angeles, CA 90017",
    "email" : "info@condax.com",
    "image" : "",
    "phone" : "310-294-4735"
  },
  {
    "formal_name" : "Opentech",
    "total_employees" : 1987,
    "address" : "2156 Davis Avenue Hopland, CA 95449",
    "email" : "info@opentech.com",
    "image" : "",
    "phone" : "707-744-3507"
  },
  {
    "formal_name" : "Golddex",
    "total_employees" :  1983,
    "address" : "425 Railroad Street Marquette, MI 49855",
    "email" : "info@golddex.com",
    "image" : "",
    "phone" : "906-282-3891"
  },
  {
    "formal_name" : "YearJob",
    "total_employees" : 1980,
    "address" : "4768 Mill Street Greenville, SC 29601",
    "email" : "info@yearjob.com",
    "image" : "",
    "phone" : "864-217-8777"
  },
  {
    "formal_name" : "Isdom",
    "total_employees" : 1964,
    "address" : "2898 Armory Road Fayetteville, NC 28301",
    "email" : "info@isdom.com",
    "image" : "",
    "phone" : "910-672-9921"
  },
  {
    "formal_name" : "Gogozoom",
    "total_employees" : 1984,
    "address" : "1291 Monroe Street Houston, TX 77055",
    "email" : "info@gogozoom.com",
    "image" : "",
    "phone" : "713-461-6090"
  },
  {
    "formal_name" : "Y-corporation",
    "total_employees" : 1986,
    "address" : "1946 Goff Avenue Martin, MI 49070",
    "email" : "info@ycorporation.com",
    "image" : "",
    "phone" : "269-672-2202"
  }
]