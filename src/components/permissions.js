import React from "react";
import { PermissionsAndroid } from "react-native";


export const requestCameraPermission = async () => {
  try {
    if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA) === false) {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      )
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('GRANTED');
        return true
      } 
      else {
        console.log('DENIED');
        return false
      }
    } 
    else {
      return true
    }
  } catch (error) {
    console.warn(error)
  }
}

export const requestWriteExternalStoragePermission = async () => {
  try {
    if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE) === false) {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      )
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('GRANTED');
        return true
      } 
      else {
        console.log('DENIED');
        return false
      }
    } 
    else {
      return true
    }
  } catch (error) {
    console.warn(error)
  }
}

export const requestReadExternalStoragePermission = async () => {
  try {
    if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE) === false) {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      )
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('GRANTED');
        return true
      } 
      else {
        console.log('DENIED');
        return false
      }
    } 
    else {
      return true
    }
  } catch (error) {
    console.warn(error)
  }
}