'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //add filed validate for each item in data object
    data.map(item=> {
      item.created_at = new Date()
      item.updated_at = new Date()
    })
    //insert data into sqlite
    await queryInterface.bulkInsert('Products', data, {});
    
  },

  //remove data in sqlite
  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Products', null, {});
  }
};

//down for rollback


const data = [
  {
    "name" : "Arduino Sensor Kit V5.0",
    "image": "product_01.jpg",
    "stock": 13,
    "price": 150
  },
  {
    "name" : "4-Channel 5VDC Relay Module Relay Active High / Low",
    "image": "product_02.jpg",
    "stock": 1,
    "price": 185
  },
  {
    "name" : "4-Channel 5VDC Relay Module Relay Active High / Low",
    "image": "product_03.jpg",
    "stock": 1,
    "price": 185
  },
  {
    "name" : "4-Channel 5VDC Relay Module Relay Active High / Low",
    "image": "product_04.jpg",
    "stock": 1,
    "price": 185
  },
  {
    "name" : "Arduino MEGA 2560 R3 ใช้ชิฟ USB CH340 รุ่นใหม่ แถมสาย USB",
    "image": "product_05.jpg",
    "stock": 100,
    "price": 200
  },
  {
    "name" : "Arduino UNO R3 พร้อมสาย USB และบอร์ด 5V DC 4-Channel Relay",
    "image": "product_06.jpg",
    "stock": 2,
    "price": 130
  },
  {
    "name" : "Arduino ProtoShield Mini UNO Prototype Shield พร้อม Mini Breadboard",
    "image": "product_07.jpg",
    "stock": 100,
    "price": 60
  },
  {
    "name" : "WeMos D1 R2 Wifi ESP8266 Develpment Board Compatible Arduino UNO",
    "image": "product_08.jpg",
    "stock": 100,
    "price": 370
  },
  {
    "name" : "Arduino UNO R3 เเถมสาย USB Type A Male/B Male Cable",
    "image": "product_09.jpg",
    "stock": 1000,
    "price": 300
  },
  {
    "name" : "Raining Sensor",
    "image": "product_10.jpg",
    "stock": 1000,
    "price": 300
  },
  {
    "name" : "NodeMCU32",
    "image": "product_11.jpg",
    "stock": 1000,
    "price": 300
  },
  {
    "name" : "IR Flame Detector Module (ตรวจจับเปลวไฟด้วย Infrared)",
    "image": "product_12.jpg",
    "stock": 60,
    "price": 100
  },
  {
    "name" : "IR Flame Detector Module (ตรวจจับเปลวไฟด้วย Infrared)",
    "image": "product_13.jpg",
    "stock": 100,
    "price": 290
  },
  {
    "name" : "IR Flame Detector Module (ตรวจจับเปลวไฟด้วย Infrared)",
    "image": "product_14.jpg",
    "stock": 100,
    "price": 290
  },
  {
    "name" : "IR Flame Detector Module (ตรวจจับเปลวไฟด้วย Infrared)",
    "image": "product_15.jpg",
    "stock": 100,
    "price": 290
  },
  {
    "name" : "IR Flame Detector Module (ตรวจจับเปลวไฟด้วย Infrared)",
    "image": "product_16.jpg",
    "stock": 100,
    "price": 290
  },
  {
    "name" : "IR Flame Detector Module (ตรวจจับเปลวไฟด้วย Infrared)",
    "image": "product_17.jpg",
    "stock": 100,
    "price": 290
  },
  {
    "name" : "IR Flame Detector Module (ตรวจจับเปลวไฟด้วย Infrared)",
    "image": "product_18.jpg",
    "stock": 100,
    "price": 290
  },
  {
    "name" : "IR Flame Detector Module (ตรวจจับเปลวไฟด้วย Infrared)",
    "image": "product_19.jpg",
    "stock": 100,
    "price": 290
  },
  {
    "name" : "IR Flame Detector Module (ตรวจจับเปลวไฟด้วย Infrared)",
    "image": "product_20.jpg",
    "stock": 100,
    "price": 290
  }
  ]