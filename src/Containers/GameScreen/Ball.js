import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import * as CANNON from 'cannon'
import { Canvas } from 'react-three-fiber'
import { useCannon, Provider } from './useCannon'

export default function Ball({ position }) {
  // Register ball as a physics body with mass
  const ref = useCannon({ mass: 40000 }, body => {
    body.addShape(new CANNON.Sphere(2))
    body.position.set(...position)
  })
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry attach="geometry" args={[2, 48, 48]} />
      <meshStandardMaterial attach="material" roughness={0.3} color="#CF7330" />
    </mesh>
  )
}
