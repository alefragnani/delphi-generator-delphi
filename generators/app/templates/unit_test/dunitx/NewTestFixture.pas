unit <%= name %>;

interface
uses
  DUnitX.TestFramework;

type

  [TestFixture]
  T<%= name %> = class(TObject)
  public
    <%= interfaceSetupTearDown %>
    
    <%- interfaceSampleMethods %>
  end;

implementation

<%= implementationSetupTearDown %>

<%= implementationSampleMethods %>

initialization
  TDUnitX.RegisterTestFixture(T<%= name %>);
end.
