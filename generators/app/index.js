'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require("path");

var DEBUG_MODE = false;
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

        //         askForType2: function () {
        //     return this.prompt([{
        //         type: 'input',
        //         name: 'promptTypeInput',
        //         message: 'Your project name',
        //         validate: function (value) {
        //             if (value !== 'hi') {
        //                 return "Invalid Type Input (use 'hi')";
        //             } else {
        //                 return true;
        //             }
        //         },
        //         default: this.appname // Default to current folder name
        //     }, {
        //         type: 'list',
        //         name: 'promptTypeList',
        //         message: 'Choose only one item from the list',
        //         choices: ['First', 'Second', 'Third'],
        //         default: 'First' // Default to the first one
        //     }, {
        //         type: 'checkbox',
        //         name: 'promptTypeCheckbox',
        //         message: 'Select all items that apply',
        //         choices: ['First Item', 'Second Item', 'Third Item', 'Fourth Item'],
        //         default: '' // Default to no one
        //     }, {
        //         type: 'confirm',
        //         name: 'promptTypeConfirm',
        //         message: 'Would you like to enable the Cool feature?'
        //     }]).then((answers) => {
        //         this.log('Your project name.. (promptTypeInput)...: ', answers.promptTypeInput);
        //         this.log('Choose only one.... (promptTypeList)....: ', answers.promptTypeList);
        //         this.log('Select all items... (promptTypeCheckbox): ', answers.promptTypeCheckbox);
        //         this.log('Would you like..... (promptTypeConfirm).: ', answers.promptTypeConfirm);

        //         this.configOnConstructor.name = answers.promptTypeInput;
        //     });
        // },

        askForProjectType: function () {
            
            return this.prompt([{
                type: 'list',
                name: 'projectType',
                message: 'Choose the Project Type',
                choices: ['Application', 'Package', 'Unit Test'/*, 'OTA'*/],
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
                choices: ['Console', 'VCL Forms'/*, 'Firemonkey'*/],
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
                message: 'Choose the Unit Test Type',
                choices: ['Console', 'GUI'],
                default: 'Console'
            }]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationType)....: ', answers.projectApplicationType);
                this.configOnConstructor.projectUnitTestType = answers.projectUnitTestType;
            });
        },

        askForProjectUnitTestRunnerType: function () {

            if (this.configOnConstructor.projectUnitTestType !== 'Console') {
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

        askForGit: function () {

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

        this.configOnConstructor.projectNameWithExtension = this.configOnConstructor.projectName +
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
                    case 'Firemonkey':
                        this._writingApplicationFiremonkey();
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
                    case 'Console':
                        this._writingUnitTestConsole();
                        break;
                    case 'GUI':
                        this._writingUnitTestGUI();
                        break;
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
            this.templatePath('application\\console\\ConsoleApp.dpr'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dpr')),
            { name: context.configOnConstructor.projectName }
        );
        this.fs.copyTpl(
            this.templatePath('application\\console\\ConsoleApp.dproj'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dproj')),
            { name: context.configOnConstructor.projectName }
        );
    },

    // Write Console App
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
            this.templatePath('application\\vcl\\VCLFormsApp.dpr'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dpr')),
            { name: context.configOnConstructor.projectName,
            vclstyleactive: translateVCLStyleActive(context.configOnConstructor.projectApplicationVCLStylesActive),
            vclstyleselected: translateVCLStyleSelected(context.configOnConstructor.projectApplicationVCLSylesSelected, true)}
        );
        this.fs.copyTpl(
            this.templatePath('application\\vcl\\VCLFormsApp.dproj'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dproj')),
            { name: context.configOnConstructor.projectName,
            vclstyleselected: translateVCLStyleSelected(context.configOnConstructor.projectApplicationVCLSylesSelected, false)}
        );
        this.fs.copyTpl(
            this.templatePath('application\\vcl\\uFmMain.pas'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, 'uFmMain.pas')),
            { name: context.configOnConstructor.projectName }
        );
        this.fs.copyTpl(
            this.templatePath('application\\vcl\\uFmMain.dfm'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, 'uFmMain.dfm')),
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
            this.templatePath('package\\Package.dpk'),
            this.destinationPath(path.join(context.configOnConstructor.projectName, context.configOnConstructor.projectName + '.dpk')),
            { name: context.configOnConstructor.projectName,
            description: context.configOnConstructor.projectPackageDescription,
            usageoptions: translateUsageOptions(context.configOnConstructor.projectPackageUsageOptions, true),
            buildcontrol: translateBuildControl(context.configOnConstructor.projectPackageBuildControl, true) }
        );
        this.fs.copyTpl(
            this.templatePath('package\\Package.dproj'),
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
            this.templatePath('unit_test\\console\\ConsoleApp.dpr'),
            this.destinationPath(path.join(context.configOnConstructor.projectName + 'Tests', context.configOnConstructor.projectName + 'Tests.dpr')),
            { name: context.configOnConstructor.projectName, 
            projectUnitTestRunnerType: context.configOnConstructor.projectUnitTestRunnerType }
        );
        this.fs.copyTpl(
            this.templatePath('unit_test\\console\\ConsoleApp.dproj'),
            this.destinationPath(path.join(context.configOnConstructor.projectName + 'Tests', context.configOnConstructor.projectName + 'Tests.dproj')),
            { name: context.configOnConstructor.projectName, 
            projectUnitTestRunnerType: context.configOnConstructor.projectUnitTestRunnerType }
        );
    },



    // writing: function () {
    //   this.fs.copy(
    //     this.templatePath('dummyfile.txt'),
    //     this.destinationPath('dummyfile.txt')
    //   );

    //   var generator = this;
    //   debugLog(this, "projectType: " + generator.projectConfig.type);
    //   debugLog(this, "projectName: " + generator.projectConfig.projectName);
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
            process.chdir(this.configOnConstructor.projectName);
            this.spawnCommand('git', ['init', '--quiet']);
        }

        this.log('');
        this.log('Your project ' + this.configOnConstructor.projectName + ' has been created!');
        this.log('');
        this.log('To start editing with Delphi, use the following commands:');
        this.log('');
        this.log('     cd ' + this.configOnConstructor.projectName);
        this.log('     bds ' + this.configOnConstructor.projectNameWithExtension);
        this.log('');
        this.log('For more information, also visit http://www.github.com/alefragnani/generator-delphi and follow us @alefragnani.');
        this.log('\r\n');
    }

});
