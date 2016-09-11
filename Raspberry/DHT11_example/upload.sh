#!/bin/bash
#upload data

curl --request POST --data-binary @"/home/pi/yeelink_test/DHT11/tmp_data.txt" --header "U-ApiKey:6610a1420911762d480b7083b0559867" http://api.yeelink.net/v1.0/device/349731/sensor/392015/datapoints

curl --request POST --data-binary @"/home/pi/yeelink_test/DHT11/hud_data.txt" --header "U-ApiKey:6610a1420911762d480b7083b0559867" http://api.yeelink.net/v1.0/device/349731/sensor/392056/datapoints
