Starts with a LIST

* ? Application [LIST]
  * Console
    * Name [INPUT]
  * VCL
    * Name [INPUT]
    * Enable VCLStyles [Y/n]
      * Default VCLStyle Name [LIST]
  * FMX
    * Name [INPUT]
* ? Package
  * Name [INPUT]
  * Description [INPUT]
  * ? UsageOptions [LIST]
    * Runtime
    * Designtime
    * Runtime and Designtime
  * ? Build control [LIST]
    * Rebuild as needed
    * Explicit rebuild
  * Requires [INPUT - CSV]
* ? Unit Test [LIST]
  * Console
    * Name [INPUT]
    * Runner [LIST]
      * Text
      * XML  
  <!-- * GUI
    * Name [INPUT] -->
  
  * DUnitX
   * Name [INPUT]
   * Logger [Y/n]
   * CreateUnitTest [Y/n]
     * TestFixtureClassName [INPUT]
     * Create Setup and TearDown [Y/n]
     * Create Sample Test Methods [Y/n]