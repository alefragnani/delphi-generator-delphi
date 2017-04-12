'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require("path");

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

        // askForType: function() {
        //         var generator = this;
        //         if (generator.projectType) {
        //             var projectTypes = ['console', 'vcl-forms', 'package'];
        //             if (projectTypes.indexOf(generator.projectType) !== -1) {
        //                 generator.projectConfig.type = generator.projectType;
        //             } else {
        //                 generator.env.error("Invalid project type: " + generator.projectType + '. Possible types are :' + projectTypes.join(', '));
        //             }
        //             return Promise.resolve();
        //         }

        //         return generator.prompt({
        //             type: 'list',
        //             name: 'type',
        //             message: 'What type of project do you want to create?',
        //             choices: [
        //                 {
        //                     name: 'Console',
        //                     value: 'console'
        //                 },
        //                 {
        //                     name: 'VCL Forms',
        //                     value: 'vcl-forms'
        //                 },
        //                 {
        //                     name: 'Package',
        //                     value: 'package'
        //                 },
        //                 {
        //                     name: 'Package (Run-Time)',
        //                     value: 'package-run-time'
        //                 },
        //                 {
        //                     name: 'Package (Design-Time)',
        //                     value: 'package-design-time'
        //                 },
        //                 {
        //                     name: 'DUnit (Console)',
        //                     value: 'dunit-console'
        //                 },
        //                 {
        //                     name: 'DUnit (GUI)',
        //                     value: 'dunit-gui'
        //                 },
        //                 {
        //                     name: 'OTA',
        //                     value: 'ota'
        //                 },
        //                 {
        //                     name: 'FMX Forms',
        //                     value: 'fmx-forms'
        //                 }
        //             ]
        //         }).then(function (typeAnswer) {
        //             generator.projectConfig.type = typeAnswer.type;
        //         });
        // },

        // // Ask for project name ("ProjectName.dproj")
        // askForProjectName: function () {
        //     var generator = this;
        //     if (generator.projectName) {
        //         generator.projectConfig.projectName = generator.projectName;
        //         return;
        //     }

        //     return generator.prompt({
        //         type: 'input',
        //         name: 'projectName',
        //         message: 'What\'s the name of your project?',
        //         default: generator.projectConfig.projectName
        //     }).then(function (projectNameAnswer) {
        //         generator.projectConfig.projectName = projectNameAnswer.projectName;
        //     });
        // },

        // askForPackageType: function() {
        //     var done = this.async();
        //     if (this.projectConfig.type !== 'package') {
        //         done();
        //         return;
        //     }

        //     var generator = this;
        //     return generator.prompt({
        //         type: 'list',
        //         name: 'packageUsage',
        //         message: 'What type of usage do you want for your package?',
        //         choices: [
        //             {
        //                 name: 'Designtime only',
        //                 value: 'dt'
        //             },
        //             {
        //                 name: 'Runtime only',
        //                 value: 'rt'
        //             },
        //             {
        //                 name: 'Designtime and Runtime',
        //                 value: 'dr'
        //             }
        //         ]
        //     }).then(function (typeAnswer) {
        //         generator.projectConfig.packageUsage = typeAnswer.packageUsage;
        //     });
        // },

        // askForGit: function () {
        //     var generator = this;

        //     return generator.prompt({
        //         type: 'confirm',
        //         name: 'gitInit',
        //         message: 'Initialize a git repository?',
        //         default: true
        //     }).then(function (gitAnswer) {
        //         generator.extensionConfig.gitInit = gitAnswer.gitInit;
        //     });
        // },

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

        // askForPackageType: function () {
        //     return this.prompt([{
        //         type: 'input',
        //         name: 'XpromptTypeInput',
        //         message: 'askForPackageType: Your project name',
        //         default: this.appname // Default to current folder name
        //     }, {
        //         type: 'list',
        //         name: 'XpromptTypeList',
        //         message: 'askForPackageType: Choose only one item from the list',
        //         choices: ['First', 'Second', 'Third'],
        //         default: 'First' // Default to the first one
        //     }, {
        //         type: 'checkbox',
        //         name: 'XpromptTypeCheckbox',
        //         message: 'askForPackageType: Select all items that apply',
        //         choices: ['First Item', 'Second Item', 'Third Item', 'Fourth Item'],
        //         default: '' // Default to no one
        //     }, {
        //         type: 'confirm',
        //         name: 'askForPackageType: XpromptTypeConfirm',
        //         message: 'Would you like to enable the Cool feature?'
        //     }]).then((answers) => {
        //         this.log('Your project name.. (XpromptTypeInput)...: ', answers.XpromptTypeInput);
        //         this.log('Choose only one.... (XpromptTypeList)....: ', answers.XpromptTypeList);
        //         this.log('Select all items... (XpromptTypeCheckbox): ', answers.XpromptTypeCheckbox);
        //         this.log('Would you like..... (XpromptTypeConfirm).: ', answers.XpromptTypeConfirm);

        //         this.configOnConstructor.name2 = answers.XpromptTypeInput;
        //     });
        // }

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
                // this.log('left projectType');
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
                //this.log('left projectType');
                return;
            }
            if (this.configOnConstructor.projectApplicationType !== 'VCL Forms') {
                //this.log('left projectApplicationType');
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
                this.log('left projectType !== Application');
                return;
            }
            if (this.configOnConstructor.projectApplicationType !== 'VCL Forms') {
                this.log('left projectApplicationType !== VCL Forms');
                return;
            }
            if (!this.configOnConstructor.projectApplicationVCLStylesActive) {
                this.log('left projectApplicationVCLStylesActive NOT');
                return;
            }

            return this.prompt([{
                type: 'list',
                name: 'projectApplicationVCLSylesSelected',
                message: 'Choose the Application Type',
                choices: ['Amakrits', 'AmethystKamri', 'AquaGraphite', 'AquaLightSlate', 'Auric', 'Carbon', 'CharcoalDarkSlate', 'CobaltXEMedia', 'CyanDusk', 'CyanNight', 'EmeraldLightSlate', 'Glossy', 'Glow', 'GoldenGraphite', 'IcebergClassico', 'LavenderClassico', 'Light', 'Luna', 'maisum', 'MetropolisUIBlack', 'MetropolisUIBlue', 'MetropolisUIDark', 'MetropolisUIGreen', 'MPSC', 'Obsidian', 'OnyxBlue', 'RubyGraphite', 'SapphireKamri', 'Silver', 'Sky', 'SlateClassico', 'SmokeyQuartzKamri', 'TabletDark', 'TabletLight', 'TurquoiseGray', 'Windows10', 'Windows10Blue', 'Windows10Dark'],
                default: 'Windows10'
            }]).then((answers) => {
                //this.log('Choose only one.... (projectApplicationVCLSylesSelected)....: ', answers.projectApplicationVCLSylesSelected);
                this.configOnConstructor.projectApplicationVCLSylesSelected = answers.projectApplicationVCLSylesSelected;
            });
        },

        askForProjectName: function () {

            if (this.configOnConstructor.projectType !== 'Application') {
                this.log('left projectType !== Application');
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
                this.log('left projectType !== Package');
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

                this.log(this.configOnConstructor.projectName);
                this.log(this.configOnConstructor.projectPackageDescription);
                this.log(this.configOnConstructor.projectPackageUsageOptions);
                this.log(this.configOnConstructor.projectPackageBuildControl);
                this.log(this.configOnConstructor.projectPackageRequires);
            });
        },




        // UNIT TEST
        askForProjectUnitTestType: function () {

            if (this.configOnConstructor.projectType !== 'Unit Test') {
                // this.log('left projectType');
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
                // this.log('left projectType');
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
                this.log('left projectType !== Unit Test');
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

    },

    writing: function () {



        // this.log('configOnConstructor.name: ' + this.configOnConstructor.name);
        // this.log('configOnConstructor.name2: ' + this.configOnConstructor.name2);

        // this.log('configOnConstructor.projectType: ' + this.configOnConstructor.projectType);
        // this.log('configOnConstructor.projectApplicationType: ' + this.configOnConstructor.projectApplicationType);

        /////
        this.log('configOnConstructor.projectType: ' + this.configOnConstructor.projectType);
        this.log('configOnConstructor.projectName: ' + this.configOnConstructor.projectName);
        this.log('configOnConstructor.projectApplicationType: ' + this.configOnConstructor.projectApplicationType);
        this.log('configOnConstructor.projectApplicationVCLStylesActive: ' + this.configOnConstructor.projectApplicationVCLStylesActive);
        this.log('configOnConstructor.projectApplicationVCLSylesSelected: ' + this.configOnConstructor.projectApplicationVCLSylesSelected);
        this.log('configOnConstructor.projectPackageName: ' + this.configOnConstructor.projectPackageName);
        this.log('configOnConstructor.projectPackageDescription: ' + this.configOnConstructor.projectPackageDescription);
        this.log('configOnConstructor.projectPackageUsageOptions: ' + this.configOnConstructor.projectPackageUsageOptions);
        this.log('configOnConstructor.projectPackageBuildControl: ' + this.configOnConstructor.projectPackageBuildControl);
        this.log('configOnConstructor.projectPackageRequires: ' + this.configOnConstructor.projectPackageRequires);
        this.log('configOnConstructor.projectUnitTestType: ' + this.configOnConstructor.projectUnitTestType);
        this.log('configOnConstructor.projectUnitTestRunnerType: ' + this.configOnConstructor.projectUnitTestRunnerType);

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

        this.log('_writingConsole ' + context.configOnConstructor.projectName);
        this.log('_writingConsole ' + this.configOnConstructor.projectName);

        this.log('from: ' + path.join(context.configOnConstructor.projectType, 'ConsoleApp.dpr'));
        this.log('to: ' + path.join(context.configOnConstructor.projectName, 'ConsoleApp.dpr'));

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

        this.log('_writingVCLForms ' + context.configOnConstructor.projectName);
        this.log('_writingVCLForms ' + this.configOnConstructor.projectName);

        this.log('from: ' + path.join(context.configOnConstructor.projectType, 'VCLFormsApp.dpr'));
        this.log('to: ' + path.join(context.configOnConstructor.projectName, 'VCLFormsApp.dpr'));

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
                    return "<Custom_Styles>" + selected + "|VCLSTYLE|$(BDSCOMMONDIR)\\Styles\\" + selected + ".vsf</Custom_Styles>";
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

        this.log('_writingPackage ' + context.configOnConstructor.projectName);
        this.log('_writingPackage ' + this.configOnConstructor.projectName);

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

        // this.log('_writingUnitTestConsole ' + context.configOnConstructor.projectName);
        // this.log('_writingUnitTestConsole ' + this.configOnConstructor.projectName);

        // this.log('from: ' + path.join(context.configOnConstructor.projectUnitTestType, 'ConsoleApp.dpr'));
        // this.log('from: ' + path.join('unit_test\\console', 'ConsoleApp.dpr'));
        // this.log('to: ' + path.join(context.configOnConstructor.projectName, 'ConsoleApp.dpr'));

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
    //   this.log("projectType: " + generator.projectConfig.type);
    //   this.log("projectName: " + generator.projectConfig.projectName);
    // },

    install: function () {
        //this.installDependencies();
        var generator = this;
        this.log('installlll');
        // this.log('Your project ' + generator.projectConfig.projectName + ' has been created!');
        // this.log('Your project ' + this.projectConfig.projectName + ' has been created!');
    },

    // End
    end: function () {

        // // Git init
        // if (this.projectConfig.gitInit) {
        //     this.spawnCommand('git', ['init', '--quiet']);
        // }
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
