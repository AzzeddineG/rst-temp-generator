# rst-template-generator

This is a node js app that creates multiple populated RST files from an RST template and JSON file.

It is  portable for windows, Linux and MacOs.

If you have trust issues you can use the `rstgen.js` file and package it yourself using [pkg](https://www.npmjs.com/package/pkg)  :smile:  



# How it works

in order for this app to work, you need to follow these steps : 

* Create a empty folder/repository 
* In this folder put the  app ( choose what works on you OS  : `rstgen-win` or  `rstgen-macos` or `rstgen-linux`) 
* In this folder create/put your RST template that **MUST** be named `template.rst` (Mandatory)
* In this folder create/put you JSON file that **MUST** be named   `data.json` (Mandatory)
* In this folder, open the command line and run `./rstgen` (or whatever you decided to name the packaged app) 
* In this folder , a new repository `generated_templates` will be created, it contains the generated RST files
* Enjoy :relaxed: 


# How to create Your `template.rst` and `data.json`

## `template.rst`

Create your template As you want but put all the fields that you want to be dynamic inside `{{ }}`

**Important : Do not use the word `title` in your template as it is a reserved word.**



## `data.json`

* Your JSON file **MUST** be an array of objects. Each object will be used to create and populate a new `.rst` file as a copy of the template in the `generated_templates` folder.

* the word `title` must be in every object as it will be used to name the populated copy of the template.

## Exemple

Let's say that I want to create a resume for 3 people using the same `.rst` template.

* 1/ First, I create an empty folder/repository
* 2/ I download and copy past the app that corresponds to my OS in this folder.
* 3/ In the same folder I create a file that I will name `template.rst` and I put the following content in it : 

```
.. image:: {{photo}}
    :width: 200
    :align: right

**Name**: {{name}}

**Age**: {{age}}

**Profession**: {{profession}}

**Skills**: {{skills}}

```
In this case I want `photo`, `name`, `age` and `skills` to be pouplated by `data.json`

* 4/ Now that `tempalte.rst` is created, I will create the `data.json` file. as It is an array of object it has to start with `[` and finish with `]`. every object is put inside `{}`. So if I want to create data for three people, I will add this content in it : 

```
[ 
  
  {"name": "John Doe",  
    "age": 28,   
    "photo": "https://picsum.photos/id/1019/200/200",  
   "profession": "Web Developer",  
   "skills": ["HTML", "CSS", "JavaScript"],
    "title": "Senior Developer"
  },
  {
    "name": "Jane Smith",
    "age": 35,
    "photo": "https://picsum.photos/id/1025/200/200",
    "profession": "Data Analyst",
    "skills": ["Python", "SQL", "Excel"],
    "title": "Data Science Manager"
  },
  {
    "name": "David Lee",
    "age": 42,
    "photo": "https://picsum.photos/id/1035/200/200",
    "profession": "Sales Manager",
    "skills": ["Marketing", "Negotiation", "Leadership"],
    "title": "Director of Sales"
  }
]

```
**PLease not that the word `title` MUST be inside evey object but it MUST NOT be used inside the file `template.rst`**

**The word `title` will be used to name the three files that will be generated**
**Also, please not that the number of objects will be the number of copies**



* 5/ Finally, I open the command line in my folder that contains the app, the rst template and Json file and I run this command : 

if on windows : 
`./rstgen-win`

if on macOs : 
`./rstgen-macos`

if on Linux : 
`./rstgen-linux`

* A new folder has been created in my inital folder and it is named `generated_templates`. It contains three files named : `Senior Developer`, `Data Science Manager`, `Director of Sales` as it is specified in `data.json`.