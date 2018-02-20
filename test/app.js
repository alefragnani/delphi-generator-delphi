'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');
var xml2js = require('xml2js')

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
  it('generates a Console Application', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Application',
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
          // done();
          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testAppConsole.dproj', function(err, data) {
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

  it('generates a VCL Application with no VCL Styles', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Application',
        projectApplicationType: 'VCL Forms',
        projectApplicationVCLStylesActive: false,
        projectName: 'testAppVCLFormsNoStyles'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testAppVCLFormsNoStyles.dpr",
          "sanitizedProjectName": "testAppVCLFormsNoStyles",
          "selectedStyle": undefined
        }
        try {
          assert.file(['testAppVCLFormsNoStyles.dpr', 'testAppVCLFormsNoStyles.dproj', 'uFmMain.pas', 'uFmMain.dfm']);
          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testAppVCLFormsNoStyles.dproj', function(err, data) {
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

  it('generates a VCL Application with VCL Styles', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Application',
        projectApplicationType: 'VCL Forms',
        projectApplicationVCLStylesActive: true,
        projectApplicationVCLSylesSelected: "Amakrits",
        projectName: 'testAppVCLFormsStyles'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        var expected = {
          "projectName": "testAppVCLFormsStyles.dpr",
          "sanitizedProjectName": "testAppVCLFormsStyles",
          "selectedStyle": "\"Amakrits|VCLSTYLE|$(BDSCOMMONDIR)\\Styles\\Amakrits.vsf\""
        }
        try {
          assert.file(['testAppVCLFormsStyles.dpr', 'testAppVCLFormsStyles.dproj', 'uFmMain.pas', 'uFmMain.dfm']);
          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testAppVCLFormsStyles.dproj', function(err, data) {
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

  it('generates a FireMonkey Application', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Application',
        projectApplicationType: 'FireMonkey',
        projectName: 'testAppFireMonkey'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        try {
          assert.file(['testAppFireMonkey.dpr', 'testAppFireMonkey.dproj', 'uFmMain.pas', 'uFmMain.fmx']);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

});

describe('Test Delphi Generator - Package', function () {

  it('generates a Runtime package Package with explicit rebuild', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Package',
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
          "projectPackageBuildControl": "true"
        }
        try {
          assert.file(['testPackage.dpk', 'testPackage.dproj']);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testPackage.dproj', function(err, data) {
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
  it('generates a Designtime package Package with implicit rebuild', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Package',
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
          "projectPackageBuildControl": undefined
        }
        try {
          assert.file(['testPackage.dpk', 'testPackage.dproj']);

          // check dproj (xml) file contents
          var parser = new xml2js.Parser();
          fs.readFile('testPackage.dproj', function(err, data) {
              parser.parseString(data, function (err, result) {
                assert.equal(result.Project.PropertyGroup[7].SanitizedProjectName[0], expected.projectName);
                assert.equal(result.Project.PropertyGroup[7].DesignOnlyPackage[0], expected.projectPackageUsageOptions);
                assert.equal(result.Project.PropertyGroup[7].DCC_OutputNeverBuildDcps, expected.projectPackageBuildControl);
                assert.equal(result.Project.PropertyGroup[11].DCC_Description[0], expected.projectPackageDescription);
              });
          });

          done();
        } catch (e) {
          done(e);
        }
      });
  });

});
describe('Test Delphi Generator - Unit Test', function () {

  it('generates a DUnit Unit Test using a Text runner', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Unit Test',
        projectUnitTestType: 'DUnit',
        projectName: 'testDUnit',
        projectUnitTestRunnerType: 'Text'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        try {
          assert.file(['testDUnitTests.dpr', 'testDUnitTests.dproj']);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('generates a DUnit Unit Test using a XML runner', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Unit Test',
        projectUnitTestType: 'DUnit',
        projectName: 'testDUnit',
        projectUnitTestRunnerType: 'XML'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        try {
          assert.file(['testDUnitTests.dpr', 'testDUnitTests.dproj']);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('generates a DUnitX Unit Test with no Fixture class', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Unit Test',
        projectUnitTestType: 'DUnitX',
        projectName: 'testDUnitX',
        projectUnitTestDUnitXCreateTestUnit: false,
      }) // Mock the prompt answers
      .toPromise().then(function () {
        try {
          assert.file(['testDUnitXTests.dpr', 'testDUnitXTests.dproj']);
          done();
        } catch (e) {
          done(e);
        }
      });
  });


  it('generates a DUnitX Unit Test with a Fixture class', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Unit Test',
        projectUnitTestType: 'DUnitX',
        projectName: 'testDUnitX',
        projectUnitTestDUnitXCreateTestUnit: true,
        projectUnitTestDUnitXFixtureName: 'testDUnitXFixture',
      }) // Mock the prompt answers
      .toPromise().then(function () {
        try {
          assert.file(['testDUnitXTests.dpr', 'testDUnitXTests.dproj', 'testDUnitXFixture.pas']);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

});
