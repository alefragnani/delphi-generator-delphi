program <%= name %>Tests;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils,
  TestFrameWork,
  <%= projectUnitTestRunnerType %>TestRunner;  

begin
  <%= projectUnitTestRunnerType %>TestRunner.RunRegisteredTests;
end.
