const Service = require('node-windows').Service
const svc = new Service({
    name: "CABSReport",
    description: "CABS Reporting",
    script: "C:\\Users\\om477804\\Documents\\OMProjects\\universal\\server\\index.js"
})

svc.on('install', function(){
    svc.start();
})

svc.install();