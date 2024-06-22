const { networkInterfaces } = require("os");

const getIpAddress = () => {
  const nets = networkInterfaces();
  const results = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return Object.values(results)[0];
};

export const generateKeyRedis = (filter, sort, fields, page, limit) => {
  const filterStringKey = JSON.stringify(filter)
    .replace(/\W/g, "")
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
  const sortKey = sort ? sort.replace(/\W/g, "") : "";
  const fieldsKey = fields ? fields.replace(/\W/g, "") : "";
  const pageKey = page ? page.toString().replace(/\W/g, "") : "";
  const limitKey = limit ? limit.toString().replace(/\W/g, "") : "";
  const IpAddress = getIpAddress();
  return filterStringKey + sortKey + fieldsKey + pageKey + limitKey + IpAddress;
};