const { defineConfig } = require("cypress");
const fs = require('fs'); // ใช้สำหรับจัดการไฟล์ใน Node.js


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      on('task', {
        // Task สำหรับบันทึก Keywords
        writeKeywords(keywords) {
          const txtFilePath = 'test-results/keywords.txt';
          // เขียนแต่ละ keyword ลงในไฟล์
          const data = keywords.join('\n')
          fs.writeFileSync(txtFilePath, data, 'utf8')
          return null;
        },

        // Task สำหรับบันทึก Log
        writeLog(message) {
          // ไฟล์ที่ใช้เก็บ Log
          const logFilePath = 'test-results/log.txt';
          // เขียนข้อความลงไฟล์ (Append Mode)
          fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);

          // ต้องส่งค่า null กลับเพื่อจบ Task
          return null
        }
      })
    },
  },
});
