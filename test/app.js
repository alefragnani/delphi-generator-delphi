'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');
describe('test delphi generator', function () {
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
  it('Application - Console', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Application',
        projectApplicationType: 'Console',
        projectName: 'testAppConsole'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        try {
          assert.file(['testAppConsole.dpr', 'testAppConsole.dproj']);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Application - VCL Forms - No VCL Styles', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Application',
        projectApplicationType: 'VCL Forms',
        projectApplicationVCLStylesActive: false,
        projectName: 'testAppVCLFormsNoStyles'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        try {
          assert.file(['testAppVCLFormsNoStyles.dpr', 'testAppVCLFormsNoStyles.dproj', 'uFmMain.pas', 'uFmMain.dfm']);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Application - VCL Forms - VCL Styles', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Application',
        projectApplicationType: 'VCL Forms',
        projectApplicationVCLStylesActive: true,
        projectName: 'testAppVCLFormsStyles'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        try {
          assert.file(['testAppVCLFormsStyles.dpr', 'testAppVCLFormsStyles.dproj', 'uFmMain.pas', 'uFmMain.dfm']);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Application - FireMonkey', function (done) {
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

  it('Package', function (done) {
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectType: 'Package',
        projectName: 'testPackage',
        projectPackageDescription: 'Test Package',
        projectPackageUsageOptions: 'Runtime',
        projectPackageBuildControl: 'Rebuils as Needed',
        projectPackageRequires: '(vcl,designide)'
      }) // Mock the prompt answers
      .toPromise().then(function () {
        try {
          assert.file(['testPackage.dpk', 'testPackage.dproj']);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Unit Test - DUnit - Text', function (done) {
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

  it('Unit Test - DUnit - XML', function (done) {
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

  it('Unit Test - DUnitX - No Fixture', function (done) {
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


  it('Unit Test - DUnitX - Fixture', function (done) {
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
