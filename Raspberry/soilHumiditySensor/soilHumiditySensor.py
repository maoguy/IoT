#!/usr/bin/env python
#-*-coding:utf-8-*-

import RPi.GPIO as GPIO

channel = 22 ;

GPIO.setmode (GPIO.BCM) ;
GPIO.setup (channel , GPIO.IN) ;

while (1) :
    print (GPIO.input (channel)) ;
