#!/bin/sh

zip -r detector@genso.com.xpi *
adb -s $1 push detector@genso.com.xpi /sdcard
rm detector@genso.com.xpi
