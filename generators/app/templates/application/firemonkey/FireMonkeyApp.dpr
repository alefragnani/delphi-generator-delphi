program <%= name %>;

uses
  System.StartUpCopy,
  FMX.Forms,
  uFmMain in 'uFmMain.pas' {Form1};

{$R *.res}

begin
  Application.Initialize;
  Application.CreateForm(TForm1, Form1);
  Application.Run;
end.
