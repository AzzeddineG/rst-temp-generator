const fs = require('fs');
const path = require('path');


const templatePath = path.join(process.cwd(), 'template.rst');
const dataPath = path.join(process.cwd(), 'data.json');
const generatedTemplatesPath = path.join(process.cwd(), 'generated_templates');

// Read template file and extract variable names
const templateContent = fs.readFileSync(templatePath, 'utf8');
const variableNames = templateContent.match(/\{\{(\w+)\}\}/g).map(match => match.slice(2, -2));

// Read data file and generate templates
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let success = true;
for (let i = 0; i < data.length; i++) {
  const object = data[i];
  const title = object.title;
  if (!title) {
    console.error(`Error: Data object at index ${i} does not have a "title" property`);
    success = false;
    continue;
  }
  const generatedTemplateContent = templateContent.replace(/\{\{(\w+)\}\}/g, (match, variableName) => {
    if (object.hasOwnProperty(variableName)) {
      return object[variableName];
    } else {
      console.error(`Error: Data object at index ${i} does not have a property for variable "${variableName}"`);
      success = false;
      return '';
    }
  });
  const generatedTemplatePath = path.join(generatedTemplatesPath, `${title}.rst`);
  
  // Create generated templates folder if it does not exist
  if (!fs.existsSync(generatedTemplatesPath)) {
    fs.mkdirSync(generatedTemplatesPath);
  }

  fs.writeFileSync(generatedTemplatePath, generatedTemplateContent, 'utf8');
}
const message = success? "Success !  your .rst files have been successfuly generated, check the generated_templates folder ": "we could not generate the rst files :( , please check that you did not use any variable in the template.rst that you did not mention in the data.json "

console.log(message);
