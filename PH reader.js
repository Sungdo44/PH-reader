var b = Buffer.from(msg.payload.buffer);

msg.payload = [
    {
        measurement: "Weather station 1",
        fields: {
            PH: Buffer.from([b[0], b[1]]).readInt16BE() * 0.01,
            Temp: Buffer.from([b[4], b[5]]).readInt16BE() * 0.1     },
        tags: {
            nid: 1
        }
    }
];

return msg;
