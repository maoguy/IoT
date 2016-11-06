#!/usr/bin/env python
#-*-coding:utf-8-*-

import RPi.GPIO as GPIO

channel = 27 ;

GPIO.setmode (GPIO.BCM) ;
GPIO.setup (channel , GPIO.IN) ;

while (1) :
    if (GPIO.input (channel) == 1) :
#       print "No sound!!!" ;
        print " " ;
    elif (GPIO.input (channel) == 0) :
        print "Noise!!!" ;
