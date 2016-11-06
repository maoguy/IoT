#!/usr/bin/env python
#-*-coding:utf-8-*-

import RPi.GPIO as GPIO
import time

channel = 17 ;

GPIO.setmode (GPIO.BCM) ;
GPIO.setup (channel , GPIO.IN) ;

while (1) :
    if (GPIO.input (channel) == 1) :
        print "Dark!!!" ;
    if (GPIO.input (channel) == 0) :
        print "Light!!!"
