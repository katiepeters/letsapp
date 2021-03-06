# Let's
![Badge of Honor](https://img.shields.io/badge/Built%20at-Fullstack-green.svg?style=flat-square)
> [Let's][1] is a web app designed to find the perfect time for you and your friends.

## Table of Contents
- [Examples](#examples)
- [Usage](#usage)
- [Installation](#installation)
- [Roadmap](#roadmap)
- [Features](#features)
- [Known Bugs](#bugs)
- [Roadmap](#roadmap)
- [Contributors](#contributors)
- [License](#license)

##<a name="examples"></a>Examples
- Event Creation![Example 0](https://cloud.githubusercontent.com/assets/8934559/6252290/2f4e6da6-b767-11e4-976b-573f37c68068.gif)
<hr></hr> 
<p></p>
- Event Response![Example 1](https://cloud.githubusercontent.com/assets/8934559/6252280/15ef0cb2-b767-11e4-82cf-2a8716c2f664.gif)
<hr></hr> 
<p></p>
- Event Management![Example 2](https://cloud.githubusercontent.com/assets/8836416/6469557/7ee3ebe0-c1ab-11e4-9b0c-98b2188f1a8e.gif)

##<a name="usage"></a>Usage

1. Make sure you have PostGreSQL installed and a database named 'doodleplus' running.
2. Feel free to edit the PostGreSQL user information with server/config/enivornment/development.js.

	```
	uri: 'postgres://USER:PASS@localhost/doodleplus'
	```
3. Run the app with `grunt`.

	```
	grunt serve
	```
	

<!-- <a name="testing"></a>Testing -->

##<a name="installation"></a>Installation
__Note:__ If you encounter errors in the installation process for npm, it is recommended that you try running the install command with `sudo`

1. First, clone the repository to your local machine.

	```
	git clone https://github.com/j1ands/doodleplus.git
	```
2. Next, `bower` and `npm` install.

	```
	npm install
	bower install
	```
3. Let's is installed!

####<a name="roadmap"></a> Roadmap
- E-mail templating with let's' logo
- Final time selection with e-mail/text confirmation
- Response chart will visually separate blocks of time
- Integration with iCal & Google Calendar & iCloud contacts



####<a name="features"></a> Features

-	No need for user authentication
-	Will send e-mail and text invitations for you with G+ integration
-	Visual response chart to help you find the best time with individual specificity
-	Mobile-First with Material Design
-	Simple, Easy, click & drag interface on desktop 


####<a name="bugs"></a> Known bugs

- Dates in event management view are unordered.

##<a name="contributors"></a> Contributors
* __Justin Sung__ -  [LinkedIn](http://linkedin.com/in/justinfsung) | [GitHub](https://github.com/Ataraxic)
*  __Katie Peters__ -  [LinkedIn](http://www.linkedin.com/in/katiejpeters/en) | [GitHub](https://github.com/katiepeters)
*  __Jordan Landau__ -  [LinkedIn](http://www.linkedin.com/in/jordanlandau) | [GitHub](https://github.com/j1ands)
*  __Andy Watt__ -  [LinkedIn](http://linkedin.com/in/justinfsung) | [GitHub](https://github.com/awatt)

##<a name="license"></a> License

This projected is licensed under the terms of the [MIT license](http://opensource.org/licenses/MIT)

[1]: http://findatime.io

