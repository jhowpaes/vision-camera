import React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { BarcodeFormat, useScanBarcodes } from "vision-camera-code-scanner";

export function QrCode() {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  })

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  },[])

  // console.log('Camera permission', device);

  return (
    <>
      {
        device != null &&
        hasPermission && (
          <View style={{
            
            width: 200,
            height: 200,
          }}>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
              preset="medium"
            />
            {barcodes.map((barcode, index) => (
              <Text key={index} style={{
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
              }}>
                {barcode.displayValue}
              </Text>
            ))}
          </View>
        )
      }
    </>
  );
}