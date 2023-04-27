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
* In this folder , a new repository `generated_files` will be created, it contains the generated RST files
* Enjoy :relaxed: 


# How to create Your `template.rst` and `data.json`

## `template.rst`

### Create many files from the file `data.json`

Create your template As you want but put all the fields that you want to be dynamic inside `{{ }}`

**Important : Do not use the word `docTitle` in your template as it is a reserved word.**


### Duplicate the data in `data.json` in the same RST file
If you don't want to create many copies of your data, and you want it duplicated inside one file just put all the content of your `template.rst` inside `[]` 


## `data.json`

* Your JSON file **MUST** be an array of objects. Each object will be used to create and populate a new `.rst` file.

* The number of objects in the array reprensent the number of duplications of the content of the `template.rst` file (inside one file or in sperate files as mentioned in the section above)

* If you want to create put the copies of the content of `template.rst`in many files, then `docTitle` must be in every object as it will be used to name the populated copy of the template.



## Exemple 1 

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
    "docTitle": "The resume of John Doe"
  },
  {
    "name": "Jane Smith",
    "age": 35,
    "photo": "https://picsum.photos/id/1025/200/200",
    "profession": "Data Analyst",
    "skills": ["Python", "SQL", "Excel"],
    "docTitle": "The resume of Jane Smith"
  },
  {
    "name": "David Lee",
    "age": 42,
    "photo": "https://picsum.photos/id/1035/200/200",
    "profession": "Sales Manager",
    "skills": ["Marketing", "Negotiation", "Leadership"],
    "docTitle": "The resume of David Lee"
  }
]

```


* 5/ Finally, I open the command line in my folder that contains the app, the rst template and Json file and I run this command : 

if on windows : 
`./rstgen-win`

if on macOs : 
`./rstgen-macos`

if on Linux : 
`./rstgen-linux`

* A new folder has been created in my inital folder and it is named `generated_files`. It contains three files named : `The resume of John Doe`, `The resume of Jane Smith`, `The resume of David Lee` as it is specified in `data.json`.


## Exemple 2

If I want the previous resumes to be inside one RST file, I will follow the same steps as teh previous example, but i will organize my `template.rst` file like the following : 


```
[
.. image:: {{photo}}
    :width: 200
    :align: right

**Name**: {{name}}

**Age**: {{age}}

**Profession**: {{profession}}

**Skills**: {{skills}}

]
```

=> Note that the only change is that I have put all the content of the `template.rst` file  inside `[ ]`
=> Note that the format of `data.json` file will not change and in this case adding the word `doctType` to each object is not necessary.

* Now when you execute the app, it will create only one file named `generated_file.rst`

