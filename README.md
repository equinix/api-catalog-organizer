# api-catalog-organizer

```

   ('-.      _ (`-.
  ( OO ).-. ( (OO  )
  / . --. /_.`     \ ,-.-')
  | \-.  \(__...--'' |  |OO)
.-'-'  |  ||  /  | | |  |  \
 \| |_.'  ||  |_.' | |  |(_/
  |  .-.  ||  .___.',|  |_.'
  |  | |  ||  |    (_|  |
  `--' `--'`--'      `--'
   ___                        _
  / _ \ _ __ __ _  __ _ _ __ (_)_______ _ __
 | | | | '__/ _` |/ _` | '_ \| |_  / _ \ '__|
 | |_| | | | (_| | (_| | | | | |/ /  __/ |
  \___/|_|  \__, |\__,_|_| |_|_/___\___|_|
            |___/

An interactive command-line tool to manage API Catalogs
Version: 1.0.0
```

### An interactive command-line tool to manage API Catalogs.

**api-catalog-organizer** is tool to manage REST API catalogs.

Currently it is supporting below operations:

1. Extract API endpoints from a Swagger document using a tag.
2. Allows to add a parameter (header or query) to all API endpoints of a Swagger document.
3. Allows to remove a paramter (header or query) from API endpoints of a Swagger document.

The tools has following features:

* Supports both JSON (.json extension) and YAML (both .yaml & .yml extensions) formats.
* Able to control the format of the output file.
* Supports for adding **Authorization** Header automatically to each extracted endpoints.
* The supplied tag will be removed from output file as it is redundant.

## Install

Make sure you have installed latest version of Node.js

`$ npm install -g api-organizer`

## Usage

```
$ api-organizer --help

  Usage: app [options] [command]

  Options:

    -V, --version  output the version number
    -h, --help     output usage information

  Commands:

    extract        extract API endpoints from a Swagger document using a tag
    param          allows to add/remove a parameter (header or query). use "add" and "remove" sub commands
    help [cmd]     display help for [cmd]
```

## Available Commands and Sub Commands

### extract
`api-organizer extract`

Allows to extract API endpoints from an existing Swagger document by specifying a tag name. 
When you invoke this command, it will ask few questions to collect below configurations for extracting endpoints.

configuration | Description | Example Input
--------------|-------------|---------
Path to API document| Specify the relative or absolute path to your Swagger API document (should be in **JSON** or **YAML** format)| home/projects/petstore-swagger.json
Output file name| Specify the name for the output file. If you specify the extension (as .json, .yaml or .yml) the output format will be in that format| public-petstore-api-swagger.yaml
Tag name| The tag name to extract API end points| Public
Authorization header| Specify whether to add Authorization header to all endpoint| n

### param add
`api-organizer param add`

Allows to add a new parameter (header or query) to all the endpoints of a Swagger document.
When you invoke this command, it will ask few questions to collect below configurations for adding the parameter.

configuration | Description | Example Input
--------------|-------------|---------
Path to API document| Specify the relative or absolute path to your Swagger API document (should be in **JSON** or **YAML** format)| home/projects/petstore-swagger.json
Output file name| Specify the name for the output file. If you specify the extension (as .json, .yaml or .yml) the output format will be in that format| public-petstore-api-swagger.yaml
Parameter name| The name for the parameter to be added| X-API-KEY
Description| The description for the paramter| API Key for authentication
Parameter type| Select the type of the paramter as **query** or **header** using arrow keys| header
Data type| Select the dat type for the paramter using arrow keys| string
Is mandatory| Specify whether the paramter is a mandatory or optional| y

### param remove
`api-organizer param remove`

Allows to remove a parameter (header or query) from all the endpoints of a Swagger document.
When you invoke this command, it will ask few questions to collect below configurations for adding the parameter.

configuration | Description | Example Input
--------------|-------------|---------
Path to API document| Specify the relative or absolute path to your Swagger API document (should be in **JSON** or **YAML** format)| home/projects/petstore-swagger.json
Output file name| Specify the name for the output file. If you specify the extension (as .json, .yaml or .yml) the output format will be in that format| public-petstore-api-swagger.yaml
Parameter name| The name for the parameter to be removed| X-API-KEY

### help
`api-organizer help [cmd]`

Displays the help for the available commands and sub commands.
