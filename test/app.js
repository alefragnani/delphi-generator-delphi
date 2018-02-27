'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');
var xml2js = require('xml2js')

function removeLineBreaks(text) {
  return text.replace(/(\n|\r)/g, '');
}

describe('Test Delphi Generator - Application', function () {
  // before(function () {
  //   return helpers.run(path.join(__dirname, '../generators/app'))
  //     .withPrompts({someAnswer: true})
  //     .toPromise();
  // });

  // it('Application - Console', function () {
  //   assert.file([
  //     'dummyfile.txt'
  //   ]);
  // });
  it('Generates a Console Application', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Application',
        projectApplicationType: 'Console',
        projectName: 'testAppConsole'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testAppConsole.dpr",
          "sanitizedProjectName": "testAppConsole"
        }
        try {
          assert.file(['testAppConsole.dpr', 'testAppConsole.dproj']);

          // check dpr file contents
          var file = fs.readFileSync('testAppConsole.dpr', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'program ' + expected.sanitizedProjectName + ';');

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testAppConsole.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[0].MainSource[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[7].SanitizedProjectName[0], expected.sanitizedProjectName);
              assert.equal(result.Project.ProjectExtensions[0].BorlandProject[0]["Delphi.Personality"][0].Source[0].Source[0]["_"], expected.projectName);
              done();
            });
          });
        } catch (e) {
          done(e);
        }
      });
  });

  it('Generates a VCL Application with no VCL Styles', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Application',
        projectApplicationType: 'VCL Forms',
        projectApplicationVCLStylesActive: false,
        projectName: 'testAppVCLFormsNoStyles'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testAppVCLFormsNoStyles.dpr",
          "sanitizedProjectName": "testAppVCLFormsNoStyles",
          "selectedStyle": undefined,
          "usesSetStyle": "  ",
          "trySetStyle": "  "
        }
        try {
          assert.file(['testAppVCLFormsNoStyles.dpr', 'testAppVCLFormsNoStyles.dproj', 'uFmMain.pas', 'uFmMain.dfm']);

          // check dpr file contents
          var file = fs.readFileSync('testAppVCLFormsNoStyles.dpr', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'program ' + expected.sanitizedProjectName + ';');
          assert.equal(removeLineBreaks(lines[5]), expected.usesSetStyle);
          assert.equal(removeLineBreaks(lines[13]), expected.trySetStyle);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testAppVCLFormsNoStyles.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[0].MainSource[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[7].SanitizedProjectName[0], expected.sanitizedProjectName);
              assert.equal(result.Project.PropertyGroup[7].Custom_Styles, expected.selectedStyle);
              assert.equal(result.Project.ProjectExtensions[0].BorlandProject[0]["Delphi.Personality"][0].Source[0].Source[0]["_"], expected.projectName);
              done();
            });
          });
        } catch (e) {
          done(e);
        }
      });
  });

  it('Generates a VCL Application with VCL Styles', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Application',
        projectApplicationType: 'VCL Forms',
        projectApplicationVCLStylesActive: true,
        projectApplicationVCLSylesSelected: "Amakrits",
        projectName: 'testAppVCLFormsStyles'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testAppVCLFormsStyles.dpr",
          "sanitizedProjectName": "testAppVCLFormsStyles",
          "selectedStyle": "\"Amakrits|VCLSTYLE|$(BDSCOMMONDIR)\\Styles\\Amakrits.vsf\"",
          "usesSetStyle": "  , Vcl.Themes, Vcl.Styles",
          "trySetStyle": "  TStyleManager.TrySetStyle(\'Amakrits\');"
        }
        try {
          assert.file(['testAppVCLFormsStyles.dpr', 'testAppVCLFormsStyles.dproj', 'uFmMain.pas', 'uFmMain.dfm']);

          // check dpr file contents
          var file = fs.readFileSync('testAppVCLFormsStyles.dpr', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'program ' + expected.sanitizedProjectName + ';');
          assert.equal(removeLineBreaks(lines[5]), expected.usesSetStyle);
          assert.equal(removeLineBreaks(lines[13]), expected.trySetStyle);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testAppVCLFormsStyles.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[0].MainSource[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[7].SanitizedProjectName[0], expected.sanitizedProjectName);
              assert.equal(result.Project.PropertyGroup[7].Custom_Styles[0], expected.selectedStyle);
              assert.equal(result.Project.ProjectExtensions[0].BorlandProject[0]["Delphi.Personality"][0].Source[0].Source[0]["_"], expected.projectName);
              done();
            });
          });
        } catch (e) {
          done(e);
        }
      });
  });

  it('Generates a FireMonkey Application', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Application',
        projectApplicationType: 'FireMonkey',
        projectName: 'testAppFireMonkey'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testAppFireMonkey.dpr",
          "sanitizedProjectName": "testAppFireMonkey"
        }
        try {
          assert.file(['testAppFireMonkey.dpr', 'testAppFireMonkey.dproj', 'uFmMain.pas', 'uFmMain.fmx']);

          // check dpr file contents
          var file = fs.readFileSync('testAppFireMonkey.dpr', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'program ' + expected.sanitizedProjectName + ';');
          
          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testAppFireMonkey.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[0].MainSource[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[7].SanitizedProjectName[0], expected.sanitizedProjectName);
              assert.equal(result.Project.ProjectExtensions[0].BorlandProject[0]["Delphi.Personality"][0].Source[0].Source[0]["_"], expected.projectName);
              done();
            });
          });
        } catch (e) {
          done(e);
        }
      });
  });

});

describe('Test Delphi Generator - Package', function () {

  it('Generates a Runtime package Package with explicit rebuild', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Package',
        projectName: 'testPackage',
        projectPackageDescription: 'Test Package',
        projectPackageUsageOptions: 'Runtime',
        projectPackageBuildControl: 'Explicit Rebuild'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testPackage",
          "projectPackageDescription": "Test Package",
          "projectPackageUsageOptions": "true",
          "projectPackageBuildControl": "true",
          "usageOptions": '{$RUNONLY}',
          "buildControl": '{$IMPLICITBUILD OFF}'
        }
        try {
          assert.file(['testPackage.dpk', 'testPackage.dproj']);

          // check dpr file contents
          var file = fs.readFileSync('testPackage.dpk', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'package ' + expected.projectName + ';');
          assert.equal(removeLineBreaks(lines[27]), '{$DESCRIPTION \'' + expected.projectPackageDescription + '\'}');
          assert.equal(removeLineBreaks(lines[28]), expected.usageOptions);
          assert.equal(removeLineBreaks(lines[29]), expected.buildControl);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testPackage.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[7].SanitizedProjectName[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[7].RuntimeOnlyPackage[0], expected.projectPackageUsageOptions);
              assert.equal(result.Project.PropertyGroup[7].DCC_OutputNeverBuildDcps[0], expected.projectPackageBuildControl);
              assert.equal(result.Project.PropertyGroup[11].DCC_Description[0], expected.projectPackageDescription);
              done();
            });
          });

        } catch (e) {
          done(e);
        }
      });
  });
  it('Generates a Designtime package Package with implicit rebuild', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Package',
        projectName: 'testPackage',
        projectPackageDescription: 'Test Package',
        projectPackageUsageOptions: 'Designtime',
        projectPackageBuildControl: 'Rebuild as Needed'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testPackage",
          "projectPackageDescription": "Test Package",
          "projectPackageUsageOptions": "true",
          "projectPackageBuildControl": undefined,
          "usageOptions": '{$DESIGNONLY}',
          "buildControl": '{$IMPLICITBUILD ON}'
        }
        try {
          assert.file(['testPackage.dpk', 'testPackage.dproj']);

          // check dpr file contents
          var file = fs.readFileSync('testPackage.dpk', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'package ' + expected.projectName + ';');
          assert.equal(removeLineBreaks(lines[27]), '{$DESCRIPTION \'' + expected.projectPackageDescription + '\'}');
          assert.equal(removeLineBreaks(lines[28]), expected.usageOptions);
          assert.equal(removeLineBreaks(lines[29]), expected.buildControl);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testPackage.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[7].SanitizedProjectName[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[7].DesignOnlyPackage[0], expected.projectPackageUsageOptions);
              assert.equal(result.Project.PropertyGroup[7].DCC_OutputNeverBuildDcps, expected.projectPackageBuildControl);
              assert.equal(result.Project.PropertyGroup[11].DCC_Description[0], expected.projectPackageDescription);
              done();
            });
          });

        } catch (e) {
          done(e);
        }
      });
  });

});

describe('Test Delphi Generator - Unit Test', function () {

  it('Generates a DUnit Unit Test using a Text runner', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit Test',
        projectUnitTestType: 'DUnit',
        projectName: 'testDUnit',
        projectUnitTestRunnerType: 'Text'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testDUnitTests.dpr",
          "sanitizedProjectName": "testDUnitTests",
          "usesTestRunner": "  TextTestRunner;",
          "runTestRunner": "  TextTestRunner.RunRegisteredTests;"
        }
        try {
          assert.file(['testDUnitTests.dpr', 'testDUnitTests.dproj']);

          // check dpr file contents
          var file = fs.readFileSync('testDUnitTests.dpr', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'program ' + expected.sanitizedProjectName + ';');
          assert.equal(removeLineBreaks(lines[9]), expected.usesTestRunner);
          assert.equal(removeLineBreaks(lines[12]), expected.runTestRunner);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testDUnitTests.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[0].MainSource[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[7].SanitizedProjectName[0], expected.sanitizedProjectName);
              assert.equal(result.Project.ProjectExtensions[0].BorlandProject[0]["Delphi.Personality"][0].Source[0].Source[0]["_"], expected.projectName);
              done();
            });
          });
        } catch (e) {
          done(e);
        }
      });
  });

  it('Generates a DUnit Unit Test using a XML runner', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit Test',
        projectUnitTestType: 'DUnit',
        projectName: 'testDUnit',
        projectUnitTestRunnerType: 'XML'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testDUnitTests.dpr",
          "sanitizedProjectName": "testDUnitTests",
          "usesTestRunner": "  XMLTestRunner;",
          "runTestRunner": "  XMLTestRunner.RunRegisteredTests;"
        }
        try {
          assert.file(['testDUnitTests.dpr', 'testDUnitTests.dproj']);

          // check dpr file contents
          var file = fs.readFileSync('testDUnitTests.dpr', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'program ' + expected.sanitizedProjectName + ';');
          assert.equal(removeLineBreaks(lines[9]), expected.usesTestRunner);
          assert.equal(removeLineBreaks(lines[12]), expected.runTestRunner);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testDUnitTests.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[0].MainSource[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[7].SanitizedProjectName[0], expected.sanitizedProjectName);
              assert.equal(result.Project.ProjectExtensions[0].BorlandProject[0]["Delphi.Personality"][0].Source[0].Source[0]["_"], expected.projectName);
              done();
            });
          });
        } catch (e) {
          done(e);
        }
      });
  });

  it('Generates a DUnitX Unit Test project with no Runner and no Fixture class', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit Test',
        projectUnitTestType: 'DUnitX',
        projectName: 'testDUnitX',
        projectUnitTestDUnitXLoggerNUnit: false,
        projectUnitTestDUnitXCreateTestUnit: false
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testDUnitXTests.dpr",
          "sanitizedProjectName": "testDUnitXTests",
          "fixtureName": undefined,
          "usesTestRunner": "  ",
          "usesFixture": "  ",
          "varRunner": "  ",
          "instantiateRunner": "    "
        }
        try {
          assert.file(['testDUnitXTests.dpr', 'testDUnitXTests.dproj']);

          // check dpr file contents
          var file = fs.readFileSync('testDUnitXTests.dpr', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'program ' + expected.sanitizedProjectName + ';');
          assert.equal(removeLineBreaks(lines[11]), expected.usesTestRunner);
          assert.equal(removeLineBreaks(lines[13]), expected.usesFixture);
          assert.equal(removeLineBreaks(lines[19]), expected.varRunner);
          assert.equal(removeLineBreaks(lines[37]), expected.instantiateRunner);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testDUnitXTests.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[0].MainSource[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[6].SanitizedProjectName[0], expected.sanitizedProjectName);
              assert.equal(result.Project.ItemGroup[0].DCCReference, expected.fixtureName);
              assert.equal(result.Project.ProjectExtensions[0].BorlandProject[0]["Delphi.Personality"][0].Source[0].Source[0]["_"], expected.projectName);
              done();
            });
          });
        } catch (e) {
          done(e);
        }
      });
  });


  it('Generates a DUnitX Unit Test project with no Runner but with a Fixture class', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit Test',
        projectUnitTestType: 'DUnitX',
        projectName: 'testDUnitX',
        projectUnitTestDUnitXLoggerNUnit: false,
        projectUnitTestDUnitXCreateTestUnit: true,
        projectUnitTestDUnitXFixtureName: 'testDUnitXFixture',
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testDUnitXTests.dpr",
          "sanitizedProjectName": "testDUnitXTests",
          "fixtureName": "testDUnitXFixture.pas",
          "usesTestRunner": "  ",
          "usesFixture": "  , testDUnitXFixture in \'testDUnitXFixture.pas\'",
          "varRunner": "  ",
          "instantiateRunner": "    ",
          "fixtureNameUnit": "testDUnitXFixture",
          "fixtureNameClassDeclaration": "  TtestDUnitXFixture = class(TObject)"
        }
        try {
          assert.file(['testDUnitXTests.dpr', 'testDUnitXTests.dproj', 'testDUnitXFixture.pas']);

          // check dpr file contents
          var file = fs.readFileSync('testDUnitXTests.dpr', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'program ' + expected.sanitizedProjectName + ';');
          assert.equal(removeLineBreaks(lines[11]), expected.usesTestRunner);
          assert.equal(removeLineBreaks(lines[13]), expected.usesFixture);
          assert.equal(removeLineBreaks(lines[19]), expected.varRunner);
          assert.equal(removeLineBreaks(lines[37]), expected.instantiateRunner);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testDUnitXTests.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[0].MainSource[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[6].SanitizedProjectName[0], expected.sanitizedProjectName);
              assert.equal(result.Project.ItemGroup[0].DCCReference[0]["$"].Include, expected.fixtureName);
              assert.equal(result.Project.ProjectExtensions[0].BorlandProject[0]["Delphi.Personality"][0].Source[0].Source[0]["_"], expected.projectName);
              done();
            });
          });
        } catch (e) {
          done(e);
        }
      });
  });

  it('Generates a DUnitX Unit Test project with a Runner, Fixture and Setup/TearDown', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit Test',
        projectUnitTestType: 'DUnitX',
        projectName: 'testDUnitX',
        projectUnitTestDUnitXLoggerNUnit: true,
        projectUnitTestDUnitXCreateTestUnit: true,
        projectUnitTestDUnitXFixtureName: 'testDUnitXFixture',
        projectUnitTestDUnitXCreateSampleTestMethods: true
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testDUnitXTests.dpr",
          "sanitizedProjectName": "testDUnitXTests",
          "fixtureName": "testDUnitXFixture.pas",
          "usesTestRunner": "  , DUnitX.Loggers.Xml.NUnit",
          "usesFixture": "  , testDUnitXFixture in \'testDUnitXFixture.pas\'",
          "varRunner": "  nunitLogger : ITestLogger;",
          "instantiateRunner": "    nunitLogger := TDUnitXXMLNUnitFileLogger.Create(TDUnitX.Options.XMLOutputFile);",
          "fixtureNameUnit": "testDUnitXFixture",
          "fixtureNameClassDeclaration": "  TtestDUnitXFixture = class(TObject)",
          "fixtureInterfaceSetup1": "    [Setup]",
          "fixtureInterfaceSetup2": "    procedure Setup;",
          "fixtureInterfaceSetup3": "    [TearDown]",
          "fixtureInterfaceSetup4": "    procedure TearDown;",
          "fixtureInterfaceSample1": "    // Sample Methods",
          "fixtureInterfaceSample2": "    // Simple single Test",
          "fixtureInterfaceSample3": "    [Test]",
          "fixtureInterfaceSample4": "    procedure Test1;",
          "fixtureInterfaceSample5": "    // Test with TestCase Attribute to supply parameters.",
          "fixtureInterfaceSample6": "    [Test]",
          "fixtureInterfaceSample7": "    [TestCase(\'TestA\',\'1,2\')]",
          "fixtureInterfaceSample8": "    [TestCase(\'TestB\',\'3,4\')]",
          "fixtureInterfaceSample9": "    procedure Test2(const AValue1 : Integer;const AValue2 : Integer);",
          
          "fixtureImplementationSetup1": "procedure TtestDUnitXFixture.Setup;",
          "fixtureImplementationSetup2": "begin",
          "fixtureImplementationSetup3": "end;",
          "fixtureImplementationSetup4": "",
          "fixtureImplementationSetup5": "procedure TtestDUnitXFixture.TearDown;",
          "fixtureImplementationSetup6": "begin",
          "fixtureImplementationSetup7": "end;",

          "fixtureImplementationSample1": "procedure TtestDUnitXFixture.Test1;",
          "fixtureImplementationSample2": "begin",
          "fixtureImplementationSample3": "end;",
          "fixtureImplementationSample4": "",
          "fixtureImplementationSample5": "procedure TtestDUnitXFixture.Test2(const AValue1 : Integer;const AValue2 : Integer);",
          "fixtureImplementationSample6": "begin",
          "fixtureImplementationSample7": "end;"
        }
        try {
          assert.file(['testDUnitXTests.dpr', 'testDUnitXTests.dproj', 'testDUnitXFixture.pas']);

          // check pas file contents
          var file = fs.readFileSync('testDUnitXFixture.pas', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'unit ' + expected.fixtureNameUnit + ';');
          assert.equal(removeLineBreaks(lines[9]), expected.fixtureNameClassDeclaration);
          assert.equal(removeLineBreaks(lines[11]), expected.fixtureInterfaceSetup1);
          assert.equal(removeLineBreaks(lines[12]), expected.fixtureInterfaceSetup2);
          assert.equal(removeLineBreaks(lines[13]), expected.fixtureInterfaceSetup3);
          assert.equal(removeLineBreaks(lines[14]), expected.fixtureInterfaceSetup4);
          assert.equal(removeLineBreaks(lines[14]), expected.fixtureInterfaceSetup4);
          assert.equal(removeLineBreaks(lines[16]), expected.fixtureInterfaceSample1);
          assert.equal(removeLineBreaks(lines[17]), expected.fixtureInterfaceSample2);
          assert.equal(removeLineBreaks(lines[18]), expected.fixtureInterfaceSample3);
          assert.equal(removeLineBreaks(lines[19]), expected.fixtureInterfaceSample4);
          assert.equal(removeLineBreaks(lines[20]), expected.fixtureInterfaceSample5);
          assert.equal(removeLineBreaks(lines[21]), expected.fixtureInterfaceSample6);
          assert.equal(removeLineBreaks(lines[22]), expected.fixtureInterfaceSample7);
          assert.equal(removeLineBreaks(lines[23]), expected.fixtureInterfaceSample8);
          assert.equal(removeLineBreaks(lines[24]), expected.fixtureInterfaceSample9);
          
          assert.equal(removeLineBreaks(lines[29]), expected.fixtureImplementationSetup1);
          assert.equal(removeLineBreaks(lines[30]), expected.fixtureImplementationSetup2);
          assert.equal(removeLineBreaks(lines[31]), expected.fixtureImplementationSetup3);
          assert.equal(removeLineBreaks(lines[32]), expected.fixtureImplementationSetup4);
          assert.equal(removeLineBreaks(lines[33]), expected.fixtureImplementationSetup5);
          assert.equal(removeLineBreaks(lines[34]), expected.fixtureImplementationSetup6);
          assert.equal(removeLineBreaks(lines[35]), expected.fixtureImplementationSetup7);
          
          assert.equal(removeLineBreaks(lines[38]), expected.fixtureImplementationSample1);
          assert.equal(removeLineBreaks(lines[39]), expected.fixtureImplementationSample2);
          assert.equal(removeLineBreaks(lines[40]), expected.fixtureImplementationSample3);
          assert.equal(removeLineBreaks(lines[41]), expected.fixtureImplementationSample4);
          assert.equal(removeLineBreaks(lines[42]), expected.fixtureImplementationSample5);
          assert.equal(removeLineBreaks(lines[43]), expected.fixtureImplementationSample6);
          assert.equal(removeLineBreaks(lines[44]), expected.fixtureImplementationSample7);

          // check dpr file contents
          var file = fs.readFileSync('testDUnitXTests.dpr', 'utf8');
          var lines = file.split('\n');
          assert.equal(removeLineBreaks(lines[0]), 'program ' + expected.sanitizedProjectName + ';');
          assert.equal(removeLineBreaks(lines[11]), expected.usesTestRunner);
          assert.equal(removeLineBreaks(lines[13]), expected.usesFixture);
          assert.equal(removeLineBreaks(lines[19]), expected.varRunner);
          assert.equal(removeLineBreaks(lines[37]), expected.instantiateRunner);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testDUnitXTests.dproj', function (err, data) {
            parser.parseString(data, function (err, result) {
              assert.equal(result.Project.PropertyGroup[0].MainSource[0], expected.projectName);
              assert.equal(result.Project.PropertyGroup[6].SanitizedProjectName[0], expected.sanitizedProjectName);
              assert.equal(result.Project.ItemGroup[0].DCCReference[0]["$"].Include, expected.fixtureName);
              assert.equal(result.Project.ProjectExtensions[0].BorlandProject[0]["Delphi.Personality"][0].Source[0].Source[0]["_"], expected.projectName);
              done();
            });
          });
        } catch (e) {
          done(e);
        }
      });
  });
});

describe('Test Delphi Generator - Simple Unit', function () {

  it('Generates an Interface Unit with no inheritance', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit',
        projectName: 'testInterface',
        projectSimpleUnitType: 'Interface'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testInterface"
        }
        try {
          assert.file(['testInterface.pas']);

          // check pas file contents
          var file = fs.readFileSync('testInterface.pas', 'utf8');
          var lines = file.split('\n');

          assert.equal(removeLineBreaks(lines[0]), 'unit ' + expected.projectName + ';');
          assert.equal(removeLineBreaks(lines[5]), '  I' + expected.projectName + ' = interface');
          assert.notEqual(lines[6], '');
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Generates an Interface Unit with inheritance', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit',
        projectName: 'testInterface',
        projectSimpleUnitType: 'Interface',
        projectSimpleUnitInterfaceInherits: 'ISampleBaseInterface'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testInterface",
          "projectSimpleUnitInterfaceInherits": "ISampleBaseInterface"
        }
        try {
          assert.file(['testInterface.pas']);

          // check pas file contents
          var file = fs.readFileSync('testInterface.pas', 'utf8');
          var lines = file.split('\n');

          assert.equal(removeLineBreaks(lines[0]), 'unit ' + expected.projectName + ';');
          assert.equal(removeLineBreaks(lines[5]), '  I' + expected.projectName + ' = interface(' + expected.projectSimpleUnitInterfaceInherits + ')');
          assert.notEqual(lines[6], '');
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Generates a Class Unit with no inheritance', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit',
        projectName: 'testClass',
        projectSimpleUnitType: 'Class',
        projectSimpleUnitClassInherits: undefined,
        projectSimpleUnitClassImplements: undefined
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testClass"
        }
        try {
          assert.file(['testClass.pas']);

          // check pas file contents
          var file = fs.readFileSync('testClass.pas', 'utf8');
          var lines = file.split('\n');

          assert.equal(removeLineBreaks(lines[0]), 'unit ' + expected.projectName + ';');
          assert.equal(removeLineBreaks(lines[5]), '  T' + expected.projectName + ' = class');
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Generates a Class Unit with inheritance', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit',
        projectName: 'testClass',
        projectSimpleUnitType: 'Class',
        projectSimpleUnitClassInherits: 'TSampleBaseClass',
        projectSimpleUnitClassImplements: undefined
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testClass",
          "projectSimpleUnitClassInherits": "TSampleBaseClass"
        }
        try {
          assert.file(['testClass.pas']);

          // check pas file contents
          var file = fs.readFileSync('testClass.pas', 'utf8');
          var lines = file.split('\n');

          assert.equal(removeLineBreaks(lines[0]), 'unit ' + expected.projectName + ';');
          assert.equal(removeLineBreaks(lines[5]), '  T' + expected.projectName + ' = class(' + expected.projectSimpleUnitClassInherits + ')');
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Generates a Class Unit with inheritance and implementing interface', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit',
        projectName: 'testClass',
        projectSimpleUnitType: 'Class',
        projectSimpleUnitClassInherits: 'TSampleBaseClass',
        projectSimpleUnitClassImplements: 'ISampleInterface'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testClass",
          "projectSimpleUnitClassInherits": "TSampleBaseClass",
          "projectSimpleUnitClassImplements": "ISampleInterface"
        }
        try {
          assert.file(['testClass.pas']);

          // check pas file contents
          var file = fs.readFileSync('testClass.pas', 'utf8');
          var lines = file.split('\n');

          assert.equal(removeLineBreaks(lines[0]), 'unit ' + expected.projectName + ';');
          assert.equal(removeLineBreaks(lines[5]), '  T' + expected.projectName + ' = class(' + 
            expected.projectSimpleUnitClassInherits + ', ' +
            expected.projectSimpleUnitClassImplements + ')');
          done();
        } catch (e) {
          done(e);
        }
      });      
    });
    
  it('Generates a Class Unit with no inheritance but implementing interface', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'New Unit',
        projectName: 'testClass',
        projectSimpleUnitType: 'Class',
        projectSimpleUnitClassInherits: undefined,
        projectSimpleUnitClassImplements: 'ISampleInterface'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testClass",
          "projectSimpleUnitClassInherits": "TInterfacedObject",
          "projectSimpleUnitClassImplements": "ISampleInterface"
        }
        try {
          assert.file(['testClass.pas']);

          // check pas file contents
          var file = fs.readFileSync('testClass.pas', 'utf8');
          var lines = file.split('\n');

          assert.equal(removeLineBreaks(lines[0]), 'unit ' + expected.projectName + ';');
          assert.equal(removeLineBreaks(lines[5]), '  T' + expected.projectName + ' = class(' + 
            expected.projectSimpleUnitClassInherits + ', ' +
            expected.projectSimpleUnitClassImplements + ')');
          done();
        } catch (e) {
          done(e);
        }
      });
  });

});

