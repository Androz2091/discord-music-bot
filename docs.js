const mdtable = require('mdtable');
const { readFileSync, writeFileSync } = require('fs');

module.exports.generateDocs = (commands) => {

    const readme = readFileSync('./README.md', 'utf-8');
    const aboveTable = readme.split('| ').shift();
    const belowTable = readme.split(' |').pop();

    const tableData = {
        header: [ 'Name', 'Description', 'Options' ],
        alignment: ['L', 'C', 'R'],
        rows: []
    }

    const tableSettings = {
        borders: true,
        padding: 1
    }

    commands.forEach((cmd) => {
        tableData.rows.push([ `**/${cmd.commandName}**`, cmd.description, cmd.options?.map((o) => `\\<${o.name}>`).join(' ') || '' ]);
    });

    const finalReadme = `${aboveTable}${mdtable(tableData, tableSettings)}${belowTable}`;

    writeFileSync('./README.md', finalReadme, 'utf-8');

}
