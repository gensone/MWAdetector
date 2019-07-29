#MWAdetector

![](https://raw.githubusercontent.com/gensone/MWAdetector/master/icons/logo96.png)

The extension monitors the mobile-specifc APIs used by the website that is currently visited. The user can open the extension and see the data gathered by the website.

Plus, the extension allows the user to block the access and avoid data leakage. A general rule that applies by default to all websites is set and the user can add custom rules for specific websites.



###Install

The extensions is not available on the offical add-ons store, but can be easily installed on any Android smartphone having **Firefox** browser installed. The extension has been tested in **Firefox 59.0** and more recent versions, and it requires a computer running a Linux based OS with **adb** tool installed.

In the folder containing all needed files for the extension there is a *bash* script called *install.sh*. This script creates the package of the extension and sends it the device that must have **adb** debugging enabled in developer settings (a guide is available at https://developer.android.com/studio/command-line/adb#Enabling).

The script must be executed by command-line passing as only argument the device identifier running 

`$ ./install.sh  <serial_id>` 


The script zips all the content in a *.xpi* archive, pushes it in the device memory and then deletes it.


