program <%= name %>;

uses
  Vcl.Forms,
  uFmMain in 'uFmMain.pas' {Form1}
  <%= vclstyleactive %>
  ;

{$R *.res}

begin
  Application.Initialize;
  Application.MainFormOnTaskbar := True;
  <%- vclstyleselected %>
  Application.CreateForm(TForm1, Form1);
  Application.Run;
end.
