(function () {
    var XLSX = require('xlsx');
    const fs = require('fs');
    const { v4: uuidv4 } = require('uuid');
    var workbook = XLSX.readFile('./Salpaco.xlsx');
    const writeYamlFile = require('write-yaml-file')
    var sheet_name_list = workbook.SheetNames;
    for (let i = 0; i < sheet_name_list.length; i++) {
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]])
        const componyName = sheet[0].componySite?.replace(/.+\/\/|www.|\..+/g, '');
        const dir = `./result/${componyName}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        for (let j = 1; j < sheet.length; j++) {
            uuidv4();
            const data = sheet[j];
            console.log(data)
            writeYamlFile(`./result/${componyName}/entry${Math.random() * 999999999}.yml`, {
                _id: uuidv4(),
                rate: '',
                email: '',
                description: data.Description,
                state: data.Statics,
                job_name: data.JobTitle,
                company_slug: componyName,
                pros: '',
                cons: '',
                date: '',
                email: ''
            }).then(() => {
                console.log('done')
            })
        }
    }
})();