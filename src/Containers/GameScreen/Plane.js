import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import * as CANNON from 'cannon'
import { Canvas } from 'react-three-fiber'
import { useCannon, Provider } from './useCannon'

export default function Plane({ position }) {
  // Register plane as a physics body with zero mass
  const ref = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Plane())
    body.position.set(...position)
  })
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial attach="material" color="#668217" />
    </mesh>
  )
}
