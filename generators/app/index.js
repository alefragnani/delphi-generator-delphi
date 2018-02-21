'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require("path");
const uuidv4 = require('uuid/v4');

var DEBUG_MODE = true;
function debugLog(athis, message) {
    if (DEBUG_MODE) {
        athis.log(message)
    }
}

function isValidProjectName(value) {

    var myRe = /[^a-zA-Z0-9_]/g;
    if (myRe.test(value)) {
    //if (value !== 'hi') {
        return "Invalid Project Name (use only letters, numbers and _)";
    } else {
        return true;
    }
};

module.exports = Generator.extend({

    constructor: function () {
        Generator.apply(this, arguments);
        this.option('projectType', { type: String, required: false });
        this.option('projectName', { type: String, required: false });

        this.configOnConstructor = Object.create(null);
    },


    initializing: {
        welcome: function () {
            this.log(yosay('Welcome to the ' + chalk.red('Delphi') + ' generator!'));
        }
    },

    prompting: {

        askForProjectType: function () {
            
            return this.prompt([{
                type: 'list',
                name: 'projectType',
                message: 'Choose the Project Type',
                choices: ['Application', 'Package', 'Unit Test', 'Simple Unit'],
                default: 'Application'
            }]).then((answers) => {
                this.configOnConstructor.projectType = answers.projectType;
            });
        },

        askForProjectApplicationType: function () {

            if (this.configOnConstructor.projectType !== 'Application') {
                // debugLog(this, 'left projectType');
                return;
            }

            return this.prompt([{
                type: 'list',
                name: 'projectApplicationType',
                message: 'Choose the Application Type',
                choices: ['Console', 'VCL Forms', 'FireMonkey'],
                default: 'Console'
            }]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationType)....: ', answers.projectApplicationType);
                this.configOnConstructor.projectApplicationType = answers.projectApplicationType;
            });
        },

        askForProjectApplicationVCLStylesActive: function () {

            if (this.configOnConstructor.projectType !== 'Application') {
                //debugLog(this, 'left projectType');
                return;
            }
            if (this.configOnConstructor.projectApplicationType !== 'VCL Forms') {
                //debugLog(this, 'left projectApplicationType');
                return;
            }

            return this.prompt([{
                type: 'confirm',
                name: 'projectApplicationVCLStylesActive',
                message: 'Would you like to enable VCLStyles?'
            },]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationVCLStylesActive)....: ', answers.projectApplicationVCLStylesActive);
                this.configOnConstructor.projectApplicationVCLStylesActive = answers.projectApplicationVCLStylesActive;
            });
        },

        askForProjectApplicationVCLSylesSelected: function () {

            if (this.configOnConstructor.projectType !== 'Application') {
                debugLog(this, 'left projectType !== Application');
                return;
            }
            if (this.configOnConstructor.projectApplicationType !== 'VCL Forms') {
                debugLog(this, 'left projectApplicationType !== VCL Forms');
                return;
            }
            if (!this.configOnConstructor.projectApplicationVCLStylesActive) {
                debugLog(this, 'left projectApplicationVCLStylesActive NOT');
                return;
            }

            return this.prompt([{
                type: 'list',
                name: 'projectApplicationVCLSylesSelected',
                message: 'Choose the Application Type',
                choices: ['Amakrits', 'Amethyst Kamri', 'Aqua Graphite', 'Aqua Light Slate', 'Auric', 'Carbon', 
                    'Charcoal Dark Slate', 'Cobalt XEMedia', 'Cyan Dusk', 'Cyan Night', 'Emerald Light Slate', 
                    'Glossy', 'Glow', 'Golden Graphite', 'Iceberg Classico', 'Lavender Classico', 'Light', 'Luna', 
                    'Metropolis UI Black', 'Metropolis UI Blue', 'Metropolis UI Dark', 'Metropolis UI Green', 
                    'Obsidian', 'Onyx Blue', 'Ruby Graphite', 'Sapphire Kamri', 'Silver', 'Sky', 'Slate Classico', 
                    'Smokey Quartz Kamri', 'Tablet Dark', 'Tablet Light', 'Turquoise Gray', 'Windows10', 
                    'Windows10 Blue', 'Windows10 Dark'],
                default: 'Windows10'
            }]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationVCLSylesSelected)....: ', answers.projectApplicationVCLSylesSelected);
                this.configOnConstructor.projectApplicationVCLSylesSelected = answers.projectApplicationVCLSylesSelected;
            });
        },

        askForProjectName: function () {

            if (this.configOnConstructor.projectType !== 'Application') {
                debugLog(this, 'left projectType !== Application');
                return;
            }

            return this.prompt([{
                type: 'input',
                name: 'projectName',
                message: 'What\'s the name of your project',
                default: 'NewProject',
                validate: function(value) {
                    return isValidProjectName(value)
                }
            }]).then((answers) => {
                //this.log('Choose only one.... (projectName)....: ', answers.projectName);

                this.configOnConstructor.projectName = answers.projectName;
            });
        },

        // PACKAGE
        askForProjectPackageDetails: function () {

            if (this.configOnConstructor.projectType !== 'Package') {
                debugLog(this, 'left projectType !== Package');
                return;
            }

            return this.prompt([{
                type: 'input',
                name: 'projectName',
                message: 'What\'s the name of your project',
                default: 'NewProject',
                validate: function(value) {
                    return isValidProjectName(value)
                }
            },{
                type: 'input',
                name: 'projectPackageDescription',
                message: 'What\'s the description of your project',
                default: ''
            },{
                type: 'list',
                name: 'projectPackageUsageOptions',
                message: 'Choose the Usage Options',
                choices: ['Runtime', 'Designtime', 'Runtime and Designtime'],
                default: 'Runtime'
            },{
                type: 'list',
                name: 'projectPackageBuildControl',
                message: 'Choose the Build Control',
                choices: ['Rebuild as Needed', 'Explicit Rebuild'],
                default: 'Rebuild as Needed'
            },{
                type: 'input',
                name: 'projectPackageRequires',
                message: 'What are the Required packages',
                default: 'vcl,designide'
            }]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationType)....: ', answers.projectApplicationType);
                this.configOnConstructor.projectName = answers.projectName;
                this.configOnConstructor.projectPackageDescription = answers.projectPackageDescription;
                this.configOnConstructor.projectPackageUsageOptions = answers.projectPackageUsageOptions;
                this.configOnConstructor.projectPackageBuildControl = answers.projectPackageBuildControl;
                this.configOnConstructor.projectPackageRequires = answers.projectPackageRequires;

                debugLog(this, this.configOnConstructor.projectName);
                debugLog(this, this.configOnConstructor.projectPackageDescription);
                debugLog(this, this.configOnConstructor.projectPackageUsageOptions);
                debugLog(this, this.configOnConstructor.projectPackageBuildControl);
                debugLog(this, this.configOnConstructor.projectPackageRequires);
            });
        },

        // UNIT TEST
        askForProjectUnitTestType: function () {

            if (this.configOnConstructor.projectType !== 'Unit Test') {
                // debugLog(this, 'left projectType');
                return;
            }

            return this.prompt([{
                type: 'list',
                name: 'projectUnitTestType',
                message: 'Choose the Unit Test Framework',
                choices: ['DUnit', 'DUnitX'/*, 'GUI'*/],
                default: 'DUnit'
            }]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationType)....: ', answers.projectApplicationType);
                this.configOnConstructor.projectUnitTestType = answers.projectUnitTestType;
            });
        },

        // UNIT TEST
        askForProjectUnitTestName: function () {

            if (this.configOnConstructor.projectType !== 'Unit Test') {
                debugLog(this, 'left projectType !== Unit Test');
                return;
            }

            return this.prompt([{
                type: 'input',
                name: 'projectName',
                message: 'What\'s the name of your project',
                default: 'NewProjectTests',
                validate: function(value) {
                    return isValidProjectName(value)
                }
            }]).then((answers) => {
                //this.log('Choose only one.... (projectName)....: ', answers.projectName);
                this.configOnConstructor.projectName = answers.projectName;
            });
        },

        // DUNIT-ENDS HERE
        askForProjectUnitTestRunnerType: function () {

            if (this.configOnConstructor.projectUnitTestType !== 'DUnit') {
                // debugLog(this, 'left projectType');
                return;
            }

            return this.prompt([{
                type: 'list',
                name: 'projectUnitTestRunnerType',
                message: 'Choose the Runner Type',
                choices: ['Text', 'XML'],
                default: 'Text'
            }]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationType)....: ', answers.projectApplicationType);
                this.configOnConstructor.projectUnitTestRunnerType = answers.projectUnitTestRunnerType;
            });
        },
                
        // DUNITX
        askForProjectUnitTestDUnitXLoggerNUnit: function () {

            if (this.configOnConstructor.projectUnitTestType !== 'DUnitX') {
                // debugLog(this, 'left projectType');
                return;
            }

            return this.prompt([{
                type: 'confirm',
                name: 'projectUnitTestDUnitXLoggerNUnit',
                message: 'Would you like to log the tests in file?'
            }]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationType)....: ', answers.projectApplicationType);
                this.configOnConstructor.projectUnitTestDUnitXLoggerNUnit = answers.projectUnitTestDUnitXLoggerNUnit;
            });
        },

        // DUNIT X
        askForProjectUnitTestDUnitXCreateTestUnit: function () {

            if (this.configOnConstructor.projectUnitTestType !== 'DUnitX') {
                debugLog(this, 'left projectUnitTestType !== DUnitX');
                return;
            }

            return this.prompt([{
                type: 'confirm',
                name: 'projectUnitTestDUnitXCreateTestUnit',
                message: 'Would you like to create Test Unit?'
            },]).then((answers) => {
                this.configOnConstructor.projectUnitTestDUnitXCreateTestUnit = answers.projectUnitTestDUnitXCreateTestUnit;
            });
        },

        askForProjectUnitTestDUnitXFixtureClassName: function () {

            if (this.configOnConstructor.projectUnitTestType !== 'DUnitX') {
                debugLog(this, 'left projectUnitTestType !== DUnitX');
                return;
            }

            if (!this.configOnConstructor.projectUnitTestDUnitXCreateTestUnit) {
                debugLog(this, 'left !projectUnitTestDUnitXCreateTestUnit');
                return;
            }

            return this.prompt([{
                type: 'input',
                name: 'projectUnitTestDUnitXFixtureName',
                message: 'What\'s the name of your TestFixture Class',
                default: 'MyTestObject',
                validate: function(value) {
                    return isValidProjectName(value)
                }
            }]).then((answers) => {
                this.configOnConstructor.projectUnitTestDUnitXFixtureName = answers.projectUnitTestDUnitXFixtureName;
            });
        },

        askForProjectUnitTestDUnitXCreateSetupTearDown: function () {

            if (this.configOnConstructor.projectUnitTestType !== 'DUnitX') {
                debugLog(this, 'left projectUnitTestType !== DUnitX');
                return;
            }

            if (!this.configOnConstructor.projectUnitTestDUnitXCreateTestUnit) {
                debugLog(this, 'left !projectUnitTestDUnitXCreateTestUnit');
                return;
            }

            return this.prompt([{
                type: 'confirm',
                name: 'projectUnitTestDUnitXCreateSetupTearDown',
                message: 'Would you like to create Setup and TearDown methods?'
            },]).then((answers) => {
                this.configOnConstructor.projectUnitTestDUnitXCreateSetupTearDown = answers.projectUnitTestDUnitXCreateSetupTearDown;
            });
        },

        askForProjectUnitTestDUnitXCreateSampleTestMethods: function () {

            if (this.configOnConstructor.projectUnitTestType !== 'DUnitX') {
                debugLog(this, 'left projectUnitTestType !== DUnitX');
                return;
            }

            if (!this.configOnConstructor.projectUnitTestDUnitXCreateTestUnit) {
                debugLog(this, 'left !projectUnitTestDUnitXCreateTestUnit');
                return;
            }

            return this.prompt([{
                type: 'confirm',
                name: 'projectUnitTestDUnitXCreateSampleTestMethods',
                message: 'Would you like to create Sample Test methods?'
            },]).then((answers) => {
                this.configOnConstructor.projectUnitTestDUnitXCreateSampleTestMethods = answers.projectUnitTestDUnitXCreateSampleTestMethods;
            });
        },

        askForProjectSimpleUnit: function () {

            if (this.configOnConstructor.projectType !== 'Simple Unit') {
                debugLog(this, 'left projectType !== Simple Unit');
                return;
            }

            return this.prompt([{
                type: 'list',
                name: 'projectSimpleUnitType',
                message: 'Choose the Unit Type',
                choices: ['Interface', 'Class', 'Frame', 'Form'],
                default: 'Interface'
            }]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationType)....: ', answers.projectApplicationType);
                this.configOnConstructor.projectSimpleUnitType = answers.projectSimpleUnitType;
                debugLog(this, this.configOnConstructor.projectSimpleUnitType);
            });
        },

        askForProjectSimpleUnitInterface: function () {

            if (this.configOnConstructor.projectType !== 'Simple Unit') {
                debugLog(this, 'left projectType !== Simple Unit');
                return;
            }

            if (this.configOnConstructor.projectSimpleUnitType !== 'Interface') {
                debugLog(this, 'left projectSimpleUnitType !== Interface');
                return;
            }

            return this.prompt([{
                type: 'input',
                name: 'projectName',
                message: 'What\'s the name of your interface',
                default: 'NewInterface',
                validate: function(value) {
                    return isValidProjectName(value)
                }
            },{
                type: 'input',
                name: 'projectSimpleUnitInterfaceInherits',
                message: 'What\'s the name of the base interface (left empty if does not inherits from any)',
                default: '',
                validate: function(value) {
                    return isValidProjectName(value)
                }
            }]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationType)....: ', answers.projectApplicationType);
                this.configOnConstructor.projectName = answers.projectName;
                this.configOnConstructor.projectSimpleUnitInterfaceInherits = answers.projectSimpleUnitInterfaceInherits;

                debugLog(this, this.configOnConstructor.projectSimpleUnitInterfaceName);
                debugLog(this, this.configOnConstructor.projectSimpleUnitInterfaceInherits);
            });
        },


        // GIT
        askForGit: function () {

            if (this.configOnConstructor.projectType == 'Simple Unit') {
                debugLog(this, 'left projectType == Simple Unit');
                return;
            }

            return this.prompt({
                type: 'confirm',
                name: 'gitInit',
                message: 'Initialize a git repository?',
                default: true
            }).then((answers) => {
                this.configOnConstructor.gitInit = answers.gitInit;
            });
        },
    
    },

    writing: function () {

        // debugLog(this, 'configOnConstructor.name: ' + this.configOnConstructor.name);
        // debugLog(this, 'configOnConstructor.name2: ' + this.configOnConstructor.name2);

        // debugLog(this, 'configOnConstructor.projectType: ' + this.configOnConstructor.projectType);
        // debugLog(this, 'configOnConstructor.projectApplicationType: ' + this.configOnConstructor.projectApplicationType);

        /////
        debugLog(this, 'configOnConstructor.projectType: ' + this.configOnConstructor.projectType);
        debugLog(this, 'configOnConstructor.projectName: ' + this.configOnConstructor.projectName);
        debugLog(this, 'configOnConstructor.projectApplicationType: ' + this.configOnConstructor.projectApplicationType);
        debugLog(this, 'configOnConstructor.projectApplicationVCLStylesActive: ' + this.configOnConstructor.projectApplicationVCLStylesActive);
        debugLog(this, 'configOnConstructor.projectApplicationVCLSylesSelected: ' + this.configOnConstructor.projectApplicationVCLSylesSelected);
        debugLog(this, 'configOnConstructor.projectPackageName: ' + this.configOnConstructor.projectPackageName);
        debugLog(this, 'configOnConstructor.projectPackageDescription: ' + this.configOnConstructor.projectPackageDescription);
        debugLog(this, 'configOnConstructor.projectPackageUsageOptions: ' + this.configOnConstructor.projectPackageUsageOptions);
        debugLog(this, 'configOnConstructor.projectPackageBuildControl: ' + this.configOnConstructor.projectPackageBuildControl);
        debugLog(this, 'configOnConstructor.projectPackageRequires: ' + this.configOnConstructor.projectPackageRequires);
        debugLog(this, 'configOnConstructor.projectUnitTestType: ' + this.configOnConstructor.projectUnitTestType);
        debugLog(this, 'configOnConstructor.projectUnitTestRunnerType: ' + this.configOnConstructor.projectUnitTestRunnerType);

        debugLog(this, 'DUnitX');
        debugLog(this, 'configOnConstructor.projectUnitTestDUnitXCreateTestUnit: ' + this.configOnConstructor.projectUnitTestDUnitXCreateTestUnit);

        this.configOnConstructor.projectNameWithExtension = this.configOnConstructor.projectName +
          (this.configOnConstructor.projectType === 'Unit Test' ? 'Tests' : '') +
          (this.configOnConstructor.projectType === 'Package' ? '.dpk' : '.dpr');


        // this.log('writing:....')
        // this.sourceRoot(path.join(__dirname, './templates/' + this.projectConfig.type));

        switch (this.configOnConstructor.projectType) {
            case 'Application':
                switch (this.configOnConstructor.projectApplicationType) {
                    case 'Console':
                        this._writingApplicationConsole();
                        break;
                    case 'VCL Forms':
                        this._writingApplicationVCLForms();
                        break;
                    case 'FireMonkey':
                        this._writingApplicationFireMonkey();
                        break;
                    default:
                        //unknown project type
                        break;                          
                }
                break;
            case 'Package':
                this._writingPackage();
                break;
            case 'Unit Test':
                switch (this.configOnConstructor.projectUnitTestType) {
                    case 'DUnit':
                        this._writingUnitTestConsole();
                        break;
                    case 'DUnitX':
                        this._writingUnitTestDUnitX();
                        break;
                    // case 'GUI':
                    //     this._writingUnitTestGUI();
                    //     break;
                    default:
                        break;
                }
                break;
            case 'Simple Unit':
                switch (this.configOnConstructor.projectSimpleUnitType) {
                    case 'Interface':
                        this._writingSimpleUnitInterface();
                        break;
                    case 'Class':
                        // this._writingUnitTestDUnitX();
                        break;
                    // case 'GUI':
                    //     this._writingUnitTestGUI();
                    //     break;
                    default:
                        break;
                }
                break;
            default:
                //unknown project type
                break;
        }
    },

    // Write Console App
    _writingApplicationConsole: function () {

        var context = this;

        debugLog(this, '_writingConsole ' + context.configOnConstructor.projectName);
        debugLog(this, '_writingConsole ' + this.configOnConstructor.projectName);

        debugLog(this, 'from: ' + path.join(context.configOnConstructor.projectType, 'ConsoleApp.dpr'));
        debugLog(this, 'to: ' + path.join(context.configOnConstructor.projectName, 'ConsoleApp.dpr'));

        this.fs.copyTpl(
            this.templatePath('application/console/ConsoleApp.dpr'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dpr')),
            { name: context.configOnConstructor.projectName }
        );
        this.fs.copyTpl(
            this.templatePath('application/console/ConsoleApp.dproj'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dproj')),
            { name: context.configOnConstructor.projectName }
        );
    },

    // Write VLCForms App
    _writingApplicationVCLForms: function () {

        var context = this;

        debugLog(this, '_writingVCLForms ' + context.configOnConstructor.projectName);
        debugLog(this, '_writingVCLForms ' + this.configOnConstructor.projectName);

        debugLog(this, 'from: ' + path.join(context.configOnConstructor.projectType, 'VCLFormsApp.dpr'));
        debugLog(this, 'to: ' + path.join(context.configOnConstructor.projectName, 'VCLFormsApp.dpr'));

        function trimWhitespaces(text) {
            return text.replace(/\s/g, "");
        }

        function translateVCLStyleActive(active) {
            if (active) {
                return ", Vcl.Themes, Vcl.Styles"
            } else {
                return "";
            }
        }
        
        function translateVCLStyleSelected(selected, dpr) {
            if (!selected) {
                return "";
            } else {
                if (dpr) {
                    return "TStyleManager.TrySetStyle(\'" + selected + "\');";
                } else {
                    return "<Custom_Styles>&quot;" + selected + "|VCLSTYLE|$(BDSCOMMONDIR)\\Styles\\" + trimWhitespaces(selected) + ".vsf&quot;</Custom_Styles>";
                }
            }
        }

        this.fs.copyTpl(
            this.templatePath('application/vcl/VCLFormsApp.dpr'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dpr')),
            { name: context.configOnConstructor.projectName,
            vclstyleactive: translateVCLStyleActive(context.configOnConstructor.projectApplicationVCLStylesActive),
            vclstyleselected: translateVCLStyleSelected(context.configOnConstructor.projectApplicationVCLSylesSelected, true)}
        );
        this.fs.copyTpl(
            this.templatePath('application/vcl/VCLFormsApp.dproj'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dproj')),
            { name: context.configOnConstructor.projectName,
            vclstyleselected: translateVCLStyleSelected(context.configOnConstructor.projectApplicationVCLSylesSelected, false)}
        );
        this.fs.copyTpl(
            this.templatePath('application/vcl/uFmMain.pas'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, 'uFmMain.pas')),
            { name: context.configOnConstructor.projectName }
        );
        this.fs.copyTpl(
            this.templatePath('application/vcl/uFmMain.dfm'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, 'uFmMain.dfm')),
            { name: context.configOnConstructor.projectName }
        );
    },

    // Write FireMonkey App
    _writingApplicationFireMonkey: function () {

        var context = this;

        debugLog(this, '_writingFireMonkey ' + context.configOnConstructor.projectName);
        debugLog(this, '_writingFireMonkey ' + this.configOnConstructor.projectName);

        debugLog(this, 'from: ' + path.join(context.configOnConstructor.projectType, 'FireMonkeyApp.dpr'));
        debugLog(this, 'to: ' + path.join(context.configOnConstructor.projectName, 'FireMonkeyApp.dpr'));

        function trimWhitespaces(text) {
            return text.replace(/\s/g, "");
        }

        this.fs.copyTpl(
            this.templatePath('application/firemonkey/FireMonkeyApp.dpr'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dpr')),
            { name: context.configOnConstructor.projectName }
        );
        this.fs.copyTpl(
            this.templatePath('application/firemonkey/FireMonkeyApp.dproj'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dproj')),
            { name: context.configOnConstructor.projectName }
        );
        this.fs.copyTpl(
            this.templatePath('application/firemonkey/uFmMain.pas'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, 'uFmMain.pas')),
            { name: context.configOnConstructor.projectName }
        );
        this.fs.copyTpl(
            this.templatePath('application/firemonkey/uFmMain.fmx'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, 'uFmMain.fmx')),
            { name: context.configOnConstructor.projectName }
        );
    },

    // Write Package App
    _writingPackage: function () {

        var context = this;

        debugLog(this, '_writingPackage ' + context.configOnConstructor.projectName);
        debugLog(this, '_writingPackage ' + this.configOnConstructor.projectName);

        function translateUsageOptions(usageOptions, dpk) {
            if (dpk) {
                switch (usageOptions) {
                    case 'Runtime':
                        return '{$RUNONLY}'; 
                        break;
                    case 'Designtime':
                        return '{$DESIGNONLY}';
                        break;                
                    default:
                        return '';
                        break;
                }
            } else {
                switch (usageOptions) {
                    case 'Runtime':
                        return '<RuntimeOnlyPackage>true</RuntimeOnlyPackage>'; 
                        break;
                    case 'Designtime':
                        return '<DesignOnlyPackage>true</DesignOnlyPackage>';
                        break;                
                    default:
                        return '';
                        break;
                }                
            }
        }
        
        function translateBuildControl(buildControl, dpk) {
            if (dpk) {
                if (buildControl === 'Rebuild as Needed') {
                    return '{$IMPLICITBUILD ON}'
                } else {
                    return '{$IMPLICITBUILD OFF}'
                }
            } else {
                if (buildControl === 'Rebuild as Needed') {
                    return ''
                } else {
                    return '\<DCC_OutputNeverBuildDcps\>true\</DCC_OutputNeverBuildDcps\>'
                }
            }
        }
        
        this.fs.copyTpl(
            this.templatePath('package/Package.dpk'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dpk')),
            { name: context.configOnConstructor.projectName,
            description: context.configOnConstructor.projectPackageDescription,
            usageoptions: translateUsageOptions(context.configOnConstructor.projectPackageUsageOptions, true),
            buildcontrol: translateBuildControl(context.configOnConstructor.projectPackageBuildControl, true) }
        );
        this.fs.copyTpl(
            this.templatePath('package/Package.dproj'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dproj')),
            { name: context.configOnConstructor.projectName,
            description: context.configOnConstructor.projectPackageDescription,
            usageoptions: translateUsageOptions(context.configOnConstructor.projectPackageUsageOptions, false),
            buildcontrol: translateBuildControl(context.configOnConstructor.projectPackageBuildControl, false) }
        );
    },

    _writingUnitTestConsole: function () {

        var context = this;

        // debugLog(this, '_writingUnitTestConsole ' + context.configOnConstructor.projectName);
        // debugLog(this, '_writingUnitTestConsole ' + this.configOnConstructor.projectName);

        // debugLog(this, 'from: ' + path.join(context.configOnConstructor.projectUnitTestType, 'ConsoleApp.dpr'));
        // debugLog(this, 'from: ' + path.join('unit_test\\console', 'ConsoleApp.dpr'));
        // debugLog(this, 'to: ' + path.join(context.configOnConstructor.projectName, 'ConsoleApp.dpr'));

        this.fs.copyTpl(
            this.templatePath('unit_test/console/ConsoleApp.dpr'),
            this.destinationPath(path.join(context.configOnConstructor.projectName + 'Tests', context.configOnConstructor.projectName + 'Tests.dpr')),
            { name: context.configOnConstructor.projectName, 
            projectUnitTestRunnerType: context.configOnConstructor.projectUnitTestRunnerType }
        );
        this.fs.copyTpl(
            this.templatePath('unit_test/console/ConsoleApp.dproj'),
            this.destinationPath(path.join(context.configOnConstructor.projectName + 'Tests', context.configOnConstructor.projectName + 'Tests.dproj')),
            { name: context.configOnConstructor.projectName, 
            projectUnitTestRunnerType: context.configOnConstructor.projectUnitTestRunnerType }
        );

        this.configOnConstructor.projectName = context.configOnConstructor.projectName + 'Tests';
    },

    _writingUnitTestDUnitX: function () {

        var context = this;

        function translateUsesRunner(runner) {
            if (!runner) {
                return "";
            } else {
                return ", DUnitX.Loggers.Xml.NUnit"
            }
        }

        function translateVarRunner(runner) {
            if (!runner) {
                return "";  
            } else {
                return "nunitLogger : ITestLogger;";
            }
        }

        function translateInstantiateRunner(runner) {
            if (!runner) {
                return "";  
            } else {
                return "nunitLogger := TDUnitXXMLNUnitFileLogger.Create(TDUnitX.Options.XMLOutputFile);\n" + 
                    "    runner.AddLogger(nunitLogger);";
            }
        }

        function translateUsesFixture(fixture) {
            if (!fixture) {
                return "";
            } else {
                return ", " + fixture + " in \'" + fixture + ".pas\'";
            }
        }

        function translateReferenceFixture(fixture) {
            if (!fixture) {
                return "";
            } else {
                return "<DCCReference Include=\"" + fixture + ".pas\"/>";
            }
        }

        function translateInterfaceSetupTearDown(setupTearDown) {
            if (!setupTearDown) {
                return "";
            } else {
                return "[Setup]\n" + 
                    "    procedure Setup;\n" +
                    "    [TearDown]\n" +
                    "    procedure TearDown;";
            }
        }

        function translateInterfaceSampleMethods(sampleMethods) {
            if (!sampleMethods) {
                return "";
            } else {
                return "// Sample Methods\n" +
                    "    // Simple single Test\n" +
                    "    [Test]\n" +
                    "    procedure Test1;\n" +
                    "    // Test with TestCase Attribute to supply parameters.\n" +
                    "    [Test]\n" +
                    "    [TestCase(\'TestA\',\'1,2\')]\n" +
                    "    [TestCase(\'TestB\',\'3,4\')]\n" +
                    "    procedure Test2(const AValue1 : Integer;const AValue2 : Integer);";
            }
        }

        function translateImplementationSetupTearDown(setupTearDown, fixture) {
            if (!setupTearDown) {
                return "";
            } else {
                return "procedure T" + fixture + ".Setup;\n" +
                    "begin\n" +
                    "end;\n" +
                    "\n" +
                    "procedure T" + fixture + ".TearDown;\n" +
                    "begin\n" +
                    "end;\n";
            }
        }

        function translateImplementationSampleMethods(sampleMethods, fixture) {
            if (!sampleMethods) {
                return "";
            } else {
                return "procedure T" + fixture + ".Test1;\n" +
                    "begin\n" +
                    "end;\n" +
                    "\n" +
                    "procedure T" + fixture + ".Test2(const AValue1 : Integer;const AValue2 : Integer);\n" +
                    "begin\n" +
                    "end;\n";
            }
        }        

        this.fs.copyTpl(
            this.templatePath('unit_test/dunitx/DUnitXAppTests.dpr'),
            this.destinationPath(path.join(context.configOnConstructor.projectName + 'Tests', context.configOnConstructor.projectName + 'Tests.dpr')),
            { name: context.configOnConstructor.projectName, 
            usesRunner: translateUsesRunner(context.configOnConstructor.projectUnitTestDUnitXLoggerNUnit),
            usesFixture: translateUsesFixture(context.configOnConstructor.projectUnitTestDUnitXFixtureName),
            varRunner: translateVarRunner(context.configOnConstructor.projectUnitTestDUnitXLoggerNUnit),
            instantiateRunner: translateInstantiateRunner(context.configOnConstructor.projectUnitTestDUnitXLoggerNUnit) }
        );
        this.fs.copyTpl(
            this.templatePath('unit_test/dunitx/DUnitXAppTests.dproj'),
            this.destinationPath(path.join(context.configOnConstructor.projectName + 'Tests', context.configOnConstructor.projectName + 'Tests.dproj')),
            { name: context.configOnConstructor.projectName, 
            dccReferenceFixture: translateReferenceFixture(context.configOnConstructor.projectUnitTestDUnitXFixtureName) }
        );
        if (context.configOnConstructor.projectUnitTestDUnitXCreateTestUnit) {
            this.fs.copyTpl(
                this.templatePath('unit_test/dunitx/NewTestFixture.pas'),
                this.destinationPath(path.join(context.configOnConstructor.projectName + 'Tests', context.configOnConstructor.projectUnitTestDUnitXFixtureName + '.pas')),
                {
                    name: context.configOnConstructor.projectUnitTestDUnitXFixtureName,
                    interfaceSetupTearDown: translateInterfaceSetupTearDown(context.configOnConstructor.projectUnitTestDUnitXCreateSetupTearDown),
                    interfaceSampleMethods: translateInterfaceSampleMethods(context.configOnConstructor.projectUnitTestDUnitXCreateSampleTestMethods),
                    implementationSetupTearDown: translateImplementationSetupTearDown(context.configOnConstructor.projectUnitTestDUnitXCreateSetupTearDown, context.configOnConstructor.projectUnitTestDUnitXFixtureName),
                    implementationSampleMethods: translateImplementationSampleMethods(context.configOnConstructor.projectUnitTestDUnitXCreateSampleTestMethods, context.configOnConstructor.projectUnitTestDUnitXFixtureName)
                }
            );
        }

        this.configOnConstructor.projectName = context.configOnConstructor.projectName + 'Tests';
    },

    _writingSimpleUnitInterface: function () {

        var context = this;

        // debugLog(this, '_writingSimpleUnitInterface ' + context.configOnConstructor.projectName);
        // debugLog(this, '_writingSimpleUnitInterface ' + this.configOnConstructor.projectName);

        // debugLog(this, 'from: ' + path.join(context.configOnConstructor.projectType, 'ConsoleApp.dpr'));
        // debugLog(this, 'to: ' + path.join(context.configOnConstructor.projectName, 'ConsoleApp.dpr'));

        function translateInterfaceInherits(inherits) {
            if (!inherits) {
                return "";
            } else {
                return "(" + inherits + ")";
            }
        }

        function newGUID() {
            return "[\'{" + uuidv4().toUpperCase() + "}\']";
        }

        this.fs.copyTpl(
            this.templatePath('simple_unit/uInterface.pas'),
            this.destinationPath(context.configOnConstructor.projectName + '.pas'),
            { name: context.configOnConstructor.projectName, 
                inherits: translateInterfaceInherits(context.configOnConstructor.projectSimpleUnitInterfaceInherits),
                guid: newGUID() }
        );
    },
    
    // _writingUnitTestGUI: function () {

    //     var context = this;

    //     this.fs.copyTpl(
    //         this.templatePath('unit_test\\gui\\GUIApp.dpr'),
    //         this.destinationPath(path.join(context.configOnConstructor.projectName + 'Tests', context.configOnConstructor.projectName + 'Tests.dpr')),
    //         { name: context.configOnConstructor.projectName, 
    //         projectUnitTestRunnerType: context.configOnConstructor.projectUnitTestRunnerType }
    //     );
    //     this.fs.copyTpl(
    //         this.templatePath('unit_test\\gui\\GUIApp.dproj'),
    //         this.destinationPath(path.join(context.configOnConstructor.projectName + 'Tests', context.configOnConstructor.projectName + 'Tests.dproj')),
    //         { name: context.configOnConstructor.projectName, 
    //         projectUnitTestRunnerType: context.configOnConstructor.projectUnitTestRunnerType }
    //     );
    // },   

    install: function () {
        //this.installDependencies();
        var generator = this;
        debugLog(this, 'install');
        // debugLog(this, 'Your project ' + generator.projectConfig.projectName + ' has been created!');
        // debugLog(this, 'Your project ' + this.projectConfig.projectName + ' has been created!');
    },

    // End
    end: function () {

        // Git init
        if (this.configOnConstructor.gitInit) {
            debugLog(this, 'git init: ' + this.configOnConstructor.projectName);
            process.chdir(this.configOnConstructor.projectName);
            this.spawnCommand('git', ['init', '--quiet']);
        }

        this.log('');
        this.log('Your project ' + chalk.bold(this.configOnConstructor.projectName) + ' has been created!');
        this.log('');
        if (this.configOnConstructor.projectType !== 'Simple Unit') {
            this.log('To start editing with ' + chalk.bold('Delphi') + ', use the following commands:');
            this.log('');
            this.log(chalk.cyan('     cd ' + this.configOnConstructor.projectName));
            this.log(chalk.cyan('     bds ' + this.configOnConstructor.projectNameWithExtension));
            this.log('');
        }
        this.log('For more information, also visit ' + chalk.underline.blue('http://www.github.com/alefragnani/vscode-generator-delphi') + 
          ' and follow us ' + chalk.underline.blue('@alefragnani') + '.');
        this.log('\r\n');
    }

});
