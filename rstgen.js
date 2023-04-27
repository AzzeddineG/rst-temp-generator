const fs = require('fs');
const path = require('path');

const templatePath = path.join(process.cwd(), 'template.rst');
const dataPath = path.join(process.cwd(), 'data.json');
const generatedTemplatesPath = path.join(process.cwd(), 'generated_files');
let generatedTemplates = [];
let finalContentIfBrackets = "";
let finalPathIfBrackets = "";

// Read template file and extract variable names
const templateContent = fs.readFileSync(templatePath, 'utf8');
const lines = templateContent.trim().split('\n');
//const betweenBrackets = lines.every(line => /^\s*\[.*\]\s*$/.test(line));
const betweenBrackets = /^\[\s*[\s\S]*\s*\]$/.test(templateContent.trim());


// Read data file and generate templates
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let success = true;

for (let i = 0; i < data.length; i++) {
  const object = data[i];
  const docTitle = object.docTitle;
  if (!betweenBrackets && !docTitle) {
    console.error(`Error: Data object at index ${i} does not have a "docTitle" property`);
    success = false;
    continue;
  }
  let generatedTemplateContent = templateContent.replace(/\{\{(\w+)\}\}/g, (match, variableName) => {
    if (object.hasOwnProperty(variableName)) {
      return object[variableName];
    } else {
      console.error(`Error: Data object at index ${i} does not have a property for variable "${variableName}"`);
      success = false;
      return '';
    }
  });

  const generatedTemplateContentCleaned = generatedTemplateContent.replace(/\[|\]/g, '').trim();

  // generate the paths
  const generatedTemplatePath = docTitle? path.join(generatedTemplatesPath, `${docTitle}.rst`) : path.join(generatedTemplatesPath, 'generated_file.rst') ;
  finalPathIfBrackets = path.join(generatedTemplatesPath, 'generated_file.rst');


  generatedTemplates.push({
    content: generatedTemplateContentCleaned,
    path: generatedTemplatePath
  });
}

// Create generated templates folder if it does not exist
if (!fs.existsSync(generatedTemplatesPath)) {
  fs.mkdirSync(generatedTemplatesPath);
}

if(betweenBrackets){
    //if content is between [ ]
    for (let template of generatedTemplates) {     
        finalContentIfBrackets += template.content + '\n\n\n\n' ;
      }
      fs.writeFileSync(finalPathIfBrackets, finalContentIfBrackets, 'utf8');
    }
    
    else{
    // if not 
    for (let template of generatedTemplates) {
      fs.writeFileSync(template.path, template.content, 'utf8');
      } 
    }

const message = success ? "Success! Your .rst files have been successfully generated. Check the generated_files folder." : "We could not generate the rst files :( Please check that you did not use any variable in the template.rst that you did not mention in the data.json.";

console.log(message);
