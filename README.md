# PH-reader
Read the pH value from the sensor, then send the data packet to the specified server via a UDP Out node in Node-RED

##  System Flow 
1. **Trigger:** ทำงานตามช่วงเวลาที่กำหนด (Timestamp node)
2. **Modbus Read:** อ่านค่าจากอุปกรณ์ผ่าน RS485
   - **Unit ID:** 10
   - **Function Code:** FC4 (Read Input Registers)
   - **Address:** 0
   - **Length:** 4 Registers
3. **Data Processing:** แปลงข้อมูล Binary (Buffer) เป็น JSON Format สำหรับ InfluxDB
   - **PH:** มาจาก Byte ที่ 0-1 (Big Endian) x 0.01
   - **Temp:** มาจาก Byte ที่ 4-5 (Big Endian) x 0.1
4. **Data Transmission:** ส่งข้อมูล JSON ผ่าน UDP ไปยัง Server

## Configuration Details

### Modbus Settings
* **Node Name:** modbus
* **Device ID:** 10
* **Register:** Start 0, Quantity 4

### UDP Output Settings
* **Target IP:** [Configured via secrets file]
* **Target Port:** [Configured via secrets file]
* **Protocol:** UDP IPv4

## Data Structure
ข้อมูลที่ส่งออกไปจะมีรูปแบบดังนี้ (InfluxDB Line Protocol structure):
```json
[
    {
        "measurement": "Weather station 1",
        "fields": {
            "PH": <value>,
            "Temp": <value>
        },
        "tags": {
            "nid": 1
        }
    }
]
